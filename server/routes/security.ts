import { Router, Request, Response } from 'express';
import db from '../db';
import { requireAdmin } from '../middleware/auth';

const router = Router();

router.get('/config', requireAdmin, (_req: Request, res: Response) => {
  const config = db.prepare('SELECT * FROM security_config WHERE id = 1').get() as any;
  if (!config) { res.status(500).json({ error: 'Config not found' }); return; }
  res.json({ ...config, is2FAEnabled: !!config.is2FAEnabled, backupCodes: JSON.parse(config.backupCodes || '[]') });
});

router.put('/config', requireAdmin, (req: Request, res: Response) => {
  const { is2FAEnabled, twoFASecret, backupCodes, adminPasswordHash } = req.body;
  db.prepare('UPDATE security_config SET is2FAEnabled = ?, twoFASecret = ?, backupCodes = ?, adminPasswordHash = ? WHERE id = 1').run(
    is2FAEnabled ? 1 : 0, twoFASecret || '', JSON.stringify(backupCodes || []), adminPasswordHash || 'admin123'
  );
  const config = db.prepare('SELECT * FROM security_config WHERE id = 1').get() as any;
  res.json({ ...config, is2FAEnabled: !!config.is2FAEnabled, backupCodes: JSON.parse(config.backupCodes || '[]') });
});

router.get('/logs', requireAdmin, (_req: Request, res: Response) => {
  const rows = db.prepare('SELECT * FROM security_logs ORDER BY date DESC').all() as any[];
  res.json(rows);
});

router.post('/logs', requireAdmin, (req: Request, res: Response) => {
  const { action, details, status } = req.body;
  const id = `log-${Date.now()}`;
  const date = new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit', second: '2-digit' } as any);
  db.prepare('INSERT INTO security_logs (id, action, details, date, status) VALUES (?, ?, ?, ?, ?)').run(id, action, details || '', date, status || 'info');
  const created = db.prepare('SELECT * FROM security_logs WHERE id = ?').get(id);
  res.status(201).json(created);
});

export default router;

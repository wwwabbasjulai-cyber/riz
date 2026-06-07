import { Router, Request, Response } from 'express';
import db from '../db';
import { requireAdmin } from '../middleware/auth';

const router = Router();

router.post('/', (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    res.status(400).json({ error: 'name, email, subject, message required' });
    return;
  }
  const id = `req-${Date.now()}`;
  const ip = req.ip || req.socket.remoteAddress || '';
  const date = new Date().toLocaleDateString('fa-IR', { hour: '2-digit', minute: '2-digit', year: 'numeric', month: 'long', day: 'numeric' } as any);
  db.prepare('INSERT INTO contact_requests (id, name, email, subject, message, date, read, ip) VALUES (?, ?, ?, ?, ?, ?, 0, ?)').run(id, name, email, subject, message, date, ip);
  res.status(201).json({ success: true, id });
});

router.get('/', requireAdmin, (_req: Request, res: Response) => {
  const rows = db.prepare('SELECT * FROM contact_requests ORDER BY date DESC').all() as any[];
  res.json(rows.map(r => ({ ...r, read: !!r.read })));
});

router.patch('/:id', requireAdmin, (req: Request, res: Response) => {
  const { read, responseNote } = req.body;
  if (typeof read !== 'undefined') {
    db.prepare('UPDATE contact_requests SET read = ? WHERE id = ?').run(read ? 1 : 0, req.params.id);
  }
  if (typeof responseNote !== 'undefined') {
    db.prepare('UPDATE contact_requests SET responseNote = ?, read = 1 WHERE id = ?').run(responseNote, req.params.id);
  }
  const updated = db.prepare('SELECT * FROM contact_requests WHERE id = ?').get(req.params.id) as any;
  if (!updated) { res.status(404).json({ error: 'Not found' }); return; }
  res.json({ ...updated, read: !!updated.read });
});

router.delete('/:id', requireAdmin, (req: Request, res: Response) => {
  db.prepare('DELETE FROM contact_requests WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

export default router;

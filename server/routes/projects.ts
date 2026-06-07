import { Router, Request, Response } from 'express';
import db from '../db';
import { requireAdmin } from '../middleware/auth';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  const rows = db.prepare('SELECT * FROM projects ORDER BY date DESC').all() as any[];
  const projects = rows.map(r => ({ ...r, tags: JSON.parse(r.tags || '[]'), featured: !!r.featured }));
  res.json(projects);
});

router.get('/:id', (req: Request, res: Response) => {
  const row = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id) as any;
  if (!row) { res.status(404).json({ error: 'Not found' }); return; }
  res.json({ ...row, tags: JSON.parse(row.tags || '[]'), featured: !!row.featured });
});

router.post('/', requireAdmin, (req: Request, res: Response) => {
  const { id, title, description, longDescription, image, tags, client, date, demoUrl, githubUrl, featured, compressedSize, originalSize } = req.body;
  if (!title || !client || !description) {
    res.status(400).json({ error: 'title, client, description required' });
    return;
  }
  const projId = id || `proj-${Date.now()}`;
  db.prepare(`INSERT INTO projects (id, title, description, longDescription, image, tags, client, date, demoUrl, githubUrl, featured, compressedSize, originalSize) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(
    projId, title, description, longDescription || '', image || '', JSON.stringify(tags || []), client, date || '', demoUrl || null, githubUrl || null, featured ? 1 : 0, compressedSize || '', originalSize || ''
  );
  const created = db.prepare('SELECT * FROM projects WHERE id = ?').get(projId) as any;
  res.status(201).json({ ...created, tags: JSON.parse(created.tags || '[]'), featured: !!created.featured });
});

router.put('/:id', requireAdmin, (req: Request, res: Response) => {
  const { title, description, longDescription, image, tags, client, date, demoUrl, githubUrl, featured, compressedSize, originalSize } = req.body;
  db.prepare(`UPDATE projects SET title=?, description=?, longDescription=?, image=?, tags=?, client=?, date=?, demoUrl=?, githubUrl=?, featured=?, compressedSize=?, originalSize=? WHERE id=?`).run(
    title, description, longDescription || '', image || '', JSON.stringify(tags || []), client, date || '', demoUrl || null, githubUrl || null, featured ? 1 : 0, compressedSize || '', originalSize || '', req.params.id
  );
  const updated = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id) as any;
  if (!updated) { res.status(404).json({ error: 'Not found' }); return; }
  res.json({ ...updated, tags: JSON.parse(updated.tags || '[]'), featured: !!updated.featured });
});

router.delete('/:id', requireAdmin, (req: Request, res: Response) => {
  db.prepare('DELETE FROM projects WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

export default router;

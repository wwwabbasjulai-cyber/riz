import { Router, Request, Response } from 'express';
import db from '../db';
import { requireAdmin } from '../middleware/auth';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  const rows = db.prepare('SELECT id, title, excerpt, coverImage, date, author, tags FROM blog_posts ORDER BY date DESC').all() as any[];
  res.json(rows.map(r => ({ ...r, tags: JSON.parse(r.tags || '[]') })));
});

router.get('/:id', (req: Request, res: Response) => {
  const row = db.prepare('SELECT * FROM blog_posts WHERE id = ?').get(req.params.id) as any;
  if (!row) { res.status(404).json({ error: 'Not found' }); return; }
  res.json({ ...row, tags: JSON.parse(row.tags || '[]') });
});

router.post('/', requireAdmin, (req: Request, res: Response) => {
  const { id, title, excerpt, content, coverImage, date, author, tags } = req.body;
  if (!title || !excerpt || !content) {
    res.status(400).json({ error: 'title, excerpt, content required' });
    return;
  }
  const postId = id || `blog-${Date.now()}`;
  db.prepare(`INSERT INTO blog_posts (id, title, excerpt, content, coverImage, date, author, tags) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`).run(
    postId, title, excerpt, content, coverImage || '', date || '', author || 'تیم تحریریه ریزمون', JSON.stringify(tags || [])
  );
  const created = db.prepare('SELECT * FROM blog_posts WHERE id = ?').get(postId) as any;
  res.status(201).json({ ...created, tags: JSON.parse(created.tags || '[]') });
});

router.delete('/:id', requireAdmin, (req: Request, res: Response) => {
  db.prepare('DELETE FROM blog_posts WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

export default router;

import { Router, Request, Response } from 'express';
import db from '../db';

const router = Router();

function getTOTPToken(secret: string): string {
  const epoch = Math.floor(Date.now() / 30000);
  const baseString = `TINY_SECURE_AUTH_${secret}_EPOCH_${epoch}`;
  let hash = 0;
  for (let i = 0; i < baseString.length; i++) {
    const char = baseString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return (Math.abs(hash) % 1000000).toString().padStart(6, '0');
}

router.post('/login', (req: Request, res: Response) => {
  const { password, totpToken } = req.body;
  const config = db.prepare('SELECT * FROM security_config WHERE id = 1').get() as any;
  if (!config) {
    res.status(500).json({ error: 'Server config not found' });
    return;
  }

  if (password !== config.adminPasswordHash) {
    db.prepare('UPDATE security_config SET lastLoginAttempts = lastLoginAttempts + 1 WHERE id = 1').run();
    res.status(401).json({ error: 'کلمه عبور نادرست است' });
    return;
  }

  if (config.is2FAEnabled) {
    const expectedToken = getTOTPToken(config.twoFASecret);
    const backupCodes: string[] = JSON.parse(config.backupCodes || '[]');
    const isBackupCode = backupCodes.includes(totpToken);

    if (totpToken !== expectedToken && !isBackupCode) {
      res.status(401).json({ error: 'توکن ۲ مرحله‌ای نادرست است' });
      return;
    }

    if (isBackupCode) {
      const remaining = backupCodes.filter((c: string) => c !== totpToken);
      db.prepare('UPDATE security_config SET backupCodes = ? WHERE id = 1').run(JSON.stringify(remaining));
    }
  }

  (req.session as any).isAdmin = true;
  res.json({ success: true });
});

router.post('/logout', (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
});

router.get('/me', (req: Request, res: Response) => {
  if ((req.session as any)?.isAdmin) {
    res.json({ isAdmin: true });
  } else {
    res.json({ isAdmin: false });
  }
});

export default router;

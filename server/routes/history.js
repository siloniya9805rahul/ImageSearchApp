import { Router } from 'express';
import Search from '../models/Search.js';
const router = Router();

function ensureAuth(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) return next();
  return res.status(401).json({ error: 'Unauthorized' });
}

router.get('/history', ensureAuth, async (req, res) => {
  const userId = req.user._id;
  const history = await Search.find({ userId }).sort({ timestamp: -1 }).limit(50);
  res.json(history);
});
export default router;


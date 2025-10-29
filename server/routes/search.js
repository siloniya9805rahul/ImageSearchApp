import { Router } from 'express';
import axios from 'axios';
import Search from '../models/Search.js';
const router = Router();

function ensureAuth(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) return next();
  return res.status(401).json({ error: 'Unauthorized' });
}

router.post('/search', async (req, res) => {
  try {
    const { term, page = 1, per_page = 20 } = req.body;
    if (!term) return res.status(400).json({ error: 'term required' });

    // Save search record
    await Search.create({ userId: req.user._id, term });

    // Call Unsplash (server-side using access key)
    const url = `https://api.unsplash.com/search/photos`;
    const resp = await axios.get(url, {
      params: { query: term, page, per_page },
      headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` }
    });

    const results = resp.data.results.map(img => ({
      id: img.id,
      alt_description: img.alt_description,
      urls: img.urls,
      links: img.links,
      user: { name: img.user.name, username: img.user.username }
    }));

    res.json({ total: resp.data.total, results });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'search failed' });
  }
});

export default router;

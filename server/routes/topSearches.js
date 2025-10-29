import express from "express";
import Search from "../models/Search.js";

const router = express.Router();

// GET /api/top-searches
router.get("/top-searches", async (req, res) => {
  try {
    const pipeline = [
      { $group: { _id: "$term", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ];
    const top = await Search.aggregate(pipeline);
    res.json(top.map((t) => ({ term: t._id, count: t.count })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "could not fetch top searches" });
  }
});

export default router;

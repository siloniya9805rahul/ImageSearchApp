import { Router } from 'express'; 
import passport from 'passport';

const router = Router();

// Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: `${process.env.CLIENT_URL || 'http://localhost:5173'}/login`
}), (req, res) => {
  res.redirect(process.env.CLIENT_URL || 'http://localhost:5173');
});

// GitHub
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', passport.authenticate('github', {
  failureRedirect: `${process.env.CLIENT_URL || 'http://localhost:5173'}/login`
}), (req, res) => {
  res.redirect(process.env.CLIENT_URL || 'http://localhost:5173');
});

// Facebook
router.get('/facebook', passport.authenticate('facebook', { scope: ["public_profile", ] }));
router.get('/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: `${process.env.CLIENT_URL || 'http://localhost:5173'}/login`
}), (req, res) => {
  res.redirect(process.env.CLIENT_URL || 'http://localhost:5173');
});
// server/routes/auth.js
router.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      console.error("❌ Logout error:", err);
      return next(err);
    }

    req.session.destroy((destroyErr) => {
      if (destroyErr) console.error("❌ Session destroy error:", destroyErr);

      res.clearCookie("connect.sid", {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: false, // true in production (HTTPS)
      });

      // 👇 return JSON instead of redirecting
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
});



router.get('/me', (req, res) => {
  if (!req.user) return res.status(401).json({ user: null });
  res.json({ user: req.user });
});

export default router;

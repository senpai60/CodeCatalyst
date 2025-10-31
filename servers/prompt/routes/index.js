import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

import codeReviewRouter from './temp_codeReview.js';
router.use("/prompts",codeReviewRouter)

export default router;

var express = require('express');
var router = express.Router();
const blog = require('../dao/blog_dao')
router.get('/', function (req, res, next) {
  res.send('blog进入路由根目录');

});
router.get('/getEssay', (req, res, next) => {
  blog.getEssay(req, res)

});
module.exports = router
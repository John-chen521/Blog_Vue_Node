/*
 * @Author: 陈永平 956086636@qq.com
 * @Date: 2022-06-02 20:03:56
 * @LastEditors: 陈永平 956086636@qq.com
 * @LastEditTime: 2022-06-11 19:40:19
 * @FilePath: \myblog-frontend-master\BMS_node\routes\users.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
var express = require('express');
var router = express.Router();
const user = require('../dao/users_dao')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');

});
router.post('/login', (req, res) => { // body:请求体
  user.Login(req, res) // 路由相当于转发站，
})
router.get('/getUserDataByToken', (req, res) => { //query中请求参数
  user.getUserDataByToken(req, res)
})

module.exports = router;

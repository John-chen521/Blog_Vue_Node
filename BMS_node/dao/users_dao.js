/*
 * @Author: 陈永平 956086636@qq.com
 * @Date: 2022-06-03 14:28:54
 * @LastEditors: 陈永平 956086636@qq.com
 * @LastEditTime: 2022-06-09 16:21:37
 * @FilePath: \myblog-frontend-master\BMS_node\dao\users_dao.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE{
 * }
 */
const { token } = require('morgan')
const jwtUtil = require('../utils/jwtUtils')
module.exports = class users_dao extends require('../model/users_mod') {
  /**
   * 登录
   * @param {*} req 
   * @param {*} resp 
   */
  static async Login (req, resp) {
    let body = req.body
    let loginData = await this.LoginUser(body.user.username, body.user.password, 0) // 转成同步，加await(等待一个异步方法执行完成) 和 async(声明function是异步的)
    if (loginData.length != 0) {
      let jwt_token = jwtUtil.sign({
        id: loginData[0].id,
        username: loginData[0].username,
        type: loginData[0].type
      }, "secret", 3600)
      resp.send({
        code: 200,
        msg: '登录成功',
        data: loginData,
        token: jwt_token
      })
    }

  }
}
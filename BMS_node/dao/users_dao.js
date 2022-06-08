/*
 * @Author: 陈永平 956086636@qq.com
 * @Date: 2022-06-03 14:28:54
 * @LastEditors: 陈永平 956086636@qq.com
 * @LastEditTime: 2022-06-08 21:39:34
 * @FilePath: \myblog-frontend-master\BMS_node\dao\users_dao.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE{
 * }
 */
module.exports = class users_dao extends require('../model/users_mod') {
  /**
   * 登录
   * @param {*} req 
   * @param {*} resp 
   */
  static async Login (req, resp) {
    let body = req.body
    let loginData = await this.LoginUser(body.user.username, body.user.password, 0) // 转成同步，加await(等待一个异步方法执行完成) 和 async(声明function是异步的)
    resp.send({
      code: 200,
      msg: '登录成功',
      data: loginData
    })
  }
}
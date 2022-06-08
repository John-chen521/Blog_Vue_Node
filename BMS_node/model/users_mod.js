/*
 * @Author: 陈永平 956086636@qq.com
 * @Date: 2022-06-03 12:20:56
 * @LastEditors: 陈永平 956086636@qq.com
 * @LastEditTime: 2022-06-08 21:02:40
 * @FilePath: \myblog-frontend-master\BMS_node\model\users_mod.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = class users_mod extends require('./model') {
  /**
   * 
   * @param {*} username 
   * @param {*} password 
   * @param {*} type 
   * @returns 
   */
  static LoginUser (username, password, type) {
    type = Number(type)
    return new Promise((resolve, reject) => { // 异步操作，因此使用时应该再等一下，await
      let sql = "select * from b_user where binary username='" + username + "' and password='" + password + "'"
      // let sql = "select * from b_user "
      console.log(sql)
      // node 查一个参数
      this.query(sql).then(result => {
        resolve(result)
        // console.log(result)
      }).catch(
        err => {
          reject('登录失败')
        }
      )
    }
    )
  }
}
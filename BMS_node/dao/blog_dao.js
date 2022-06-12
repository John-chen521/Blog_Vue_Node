const jwtUtil = require('../utils/jwtUtils')
module.exports = class blog_dao extends require('../model/blog_mod') {
  /**
   * 
   * @param {*} req 
   * @param {*} resp 
   */
  static async getEssay (req, resp) {
    let result = await jwtUtil.verifysync(req.query.token, "secret")
    let u_id = result.id
    let data = await this.getEssaymod(u_id)
    // console.log(data)
    resp.send({
      code: 200,
      msg: '请求随笔成功',
      data,
    })
  }

}
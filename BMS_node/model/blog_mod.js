module.exports = class blog_mod extends require('./model') {
  static getEssaymod (u_id) {
    return new Promise((resolve, reject) => {
      let sql = "select * from t_essay where binary u_id=" + u_id
      console.log(sql)
      this.query(sql).then(result => {
        resolve(result)
      }).catch(err => {
        reject(err)
      })
    })
  }

}
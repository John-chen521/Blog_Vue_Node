/*
 * @Author: 陈永平 956086636@qq.com
 * @Date: 2022-06-02 22:10:03
 * @LastEditors: 陈永平 956086636@qq.com
 * @LastEditTime: 2022-06-03 14:53:32
 * @FilePath: \myblog-frontend-master\BMS_node\model\model.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const mysql = require('mysql')
const pool = mysql.createPool(
  {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Blog_database',
    port: '3306'
  }
)

// 类似于java return整个类出去
/**
 * 封装一个数据库基类
 * 
 */
module.exports = class Model {
  /**
   * 通用查询方法
   * @param {*} sql 要执行的sql语句
   * @param {*} params 给sql语句的占位符进行赋值的参数
   */
  static query (sql, params) {
    return new Promise((resolve, reject) => {
      pool.getConnection(function (err, connection) {
        if (err) {
          console.error(err)
          connection.release()
        } else {
          // query执行sql语句
          connection.query(sql, params, (err, results) => {
            if (err) {
              console.error(err)
              reject(err)
            } else {
              resolve(results)
            }
            // 结束会话,释放链接

          })
        }
      })
    })
  }
  static formatParams () {
    let array = []
    for (let i = 0, l = arguments.length; i < 1; i++) {
      array.push(arguments[i])
    }
    return array
  }
}
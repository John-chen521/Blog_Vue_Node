<!--
 * @Author: 陈永平 956086636@qq.com
 * @Date: 2022-06-02 16:37:33
 * @LastEditors: 陈永平 956086636@qq.com
 * @LastEditTime: 2022-06-08 21:09:20
 * @FilePath: \myblog-frontend-master\Background-management-system.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
## vscode中搭建express项目
安装express + express-generator
npm install安装Node_moudule包
基础依赖：
>express
可以快速搭建一个Web开发框架
>body-parser
Express模块的中间件，解析获取浏览器传送过来的body数据
>express-session
也是中间件,处理客户端的session
express-session 有四个部分：
1. request, response 与 session 的交互的部分
2. session 数据结构
3. session 中数据存储的接口 store
4. store 默认实现 memory(cookie 实现已被废)
>formidable
解析表单、支持get、post请求参数，文件上传
>jsonwebtoken
前后端分离模式的开发,大多数使用JWT进行身份认证
token：当登录成功后，后端就返回一个凭据,有了这个凭据后,后续再发请求接口,带上它就可以访问那些需要权限的接口
>multer
Multer 是一个 node.js 中间件，用于处理 multipart/form-data 类型的表单数据，它主要用于上传文件。它是写在 busboy 之上非常高效。
>mysql
>nodemailer
>redis
>socket.io
>weapp.socket.io
>svg-captcha
## API接口说明：
| *状态码* | *含义*                | *说明*           |
| -------- | --------------------- | ---------------- |
| 200      | OK                    | 请求成功         |
| 404      | NOT FOUND             | 请求的资源不存在 |
| 500      | INTERNAL SERVER ERROR | 内部服务端错误   |

接口基准地址：http://localhost:3000
登录验证接口
请求路径：/users/login
请求方法：post
- 请求参数 
| 参数名   | 参数说明 | 数据类型 | 备注                   |
| -------- | -------- | -------- | ---------------------- |
| username | 用户名   | varchar  | 不能为空               |
| password | 密码     | varchar  | 不能为空               |
| type     | 用户类型 | int      | (1管理员 2学生 3教师 ) |
- 响应参数(如果无此用户将无数据)
| 参数名   | 参数说明 | 备注 |
| -------- | -------- | ---- |
| id       | 用户 ID  |      |
| username | 用户名   |      |
| password | 密码     |      |
## 数据库设计
>数据库名：Blog-database
>数据库账号 : root
>数据库密码 : root
>数据库 :utf8  排序规则 :utf8_unicode_ci
Workbench创建数据库
1. 创建数据库 名字 utf-8
2. 新建用户和权限
3. 创建表
## 操作数据库进行登录验证
数据库查询方法，SQL语句
## nodejs的express框架使用
遇到问题：
contentType 中常见的选项有： application/x-www-form-urlencoded 、 application/json、text/xml 、 multipart/form-data 这些选项用于表明发送数据流的类型，后端根据类型进行对应的数据解析。
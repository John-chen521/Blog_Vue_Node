<!--
 * @Author: 陈永平 956086636@qq.com
 * @Date: 2022-06-02 16:37:33
 * @LastEditors: 陈永平 956086636@qq.com
 * @LastEditTime: 2022-06-12 22:21:17
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
### 登录验证接口
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
### 获取用户信息
此时token需要解密
- 请求路径：/users/getUserDataById
- 请求方法：get
- 请求参数

| 参数名 | 参数说明 | 数据类型 | 备注 |
| ------ | -------- | -------- | ---- |
| u_id   | 用户id   | int      |      |

- 响应参数(如果无此用户将无数据)

| 参数名     | 参数说明           | 数据类型 | 备注                   |
| ---------- | ------------------ | -------- | ---------------------- |
| id         | 用户 ID            | int      |                        |
| username   | 用户名             | varchar  |                        |
| classes    | 所属班级           | varchar  |                        |
| sex        | 性别               | varchar  |                        |
| address    | 地址籍贯或者生源地 | varchar  |                        |
| createtime | 入网时间           | date     |                        |
| modifytime | 最近一次修改时间   | datetime | CURRENT_TIMESTAMP      |
| type       | 身份类型           | int      | (1管理员 2学生 3教师 ) |
### 获取博客信息
#### 获取登录用户随笔信息
- 请求路径：/blog/getEssay
- 请求方法：get

| 参数名 | 参数说明         | 数据类型 | 备注 |
| ------ | ---------------- | -------- | ---- |
| u_id   | 用来获取的用户id | int      | 必填 |

- 响应参数

| 参数名 | 参数说明       | 数据类型 | 备注 |
| ------ | -------------- | -------- | ---- |
| data   | 当前页用户数据 | json     |      |
## 数据库设计
>数据库名：Blog-database
>数据库账号 : root
>数据库密码 : root
>数据库 :utf8  排序规则 :utf8_unicode_ci
Workbench创建数据库
1. 创建数据库 名字 utf-8
2. 新建用户和权限
3. 创建表
用户信息表：
| *字段名*       | *含义*                 | 数据类型 | *说明*     |
| -------------- | ---------------------- | -------- | ---------- |
| id             | 用户id(学号或者教师号) | int      | 必填       |
| <u>*token*</u> | 加密后的数据           | varchar  | (可不使用) |
| username       | 用户                   | varchar  | 必填       |
| password       | 密码                   | varchar  | 必填       |
| type           | 类型(0管理员 1游客)    | int      | 必填       |
随笔：

## 操作数据库进行登录验证
数据库查询方法，SQL拼接语句查询到前端POST请求发送过来的账户信息
后台发送数据库中数据给前端
**重要** 使用nodejs实现jwt验证
在后端加密解密TOKEN(JWT)(目前最流行的跨域认证解决方案)
将用户信息进行加密处理，加密成TOKEN给前端，前端将TOKEN保存在页面上，(localstoragy session)
之后，客户端每次与服务器通信，都要带上这个JWT字符串，从而进行身份认证。一般将JWT放在HTTP请求头的Authorization字段中
jwt由三部分组成：Header(安全相关)、Payload(真正用户信息)、Signature(安全相关)
以上 登录接口完毕
## 通过Token获取用户信息
```javascript
async getUserInfo () {
      const { data: res } = await this.$blog(
        {
          url: "/users/getUserDataByToken",
          methods: 'get',
          params: {
            token: JSON.parse(window.sessionStorage.getItem('token'))
          }
        })
    },
```
## 获取随笔信息markdown文本格式展示
随笔部分用Timeline风格展示
后端建立新路由：blog.js -> app.js中挂载
获取MySQL数据类型之日期与时间类型之格式转换
ISO-8601格式的时间 转换为正常时间
方法
1. 使用库moment-timezone
```javascript
//demo
var date = '2017-09-28T16:00:00Z';
var timezone = '"Asia/Shanghai';
moment(date).tz(timezone).format('YYYY-MM-DD hh:mm:ss');
//转化为TZ格式
moment().format('YYYY-MM-DDTHH:mm:[00][Z]')
```
```javascript
function myTimeToLocal(inputTime){
 if(!inputTime && typeof inputTime !== 'number'){
  return '';
 }
 var localTime = '';
 inputTime = new Date(inputTime).getTime();
 const offset = (new Date()).getTimezoneOffset();
 localTime = (new Date(inputTime - offset * 60000)).toISOString();
 localTime = localTime.substr(0, localTime.lastIndexOf('.'));
 localTime = localTime.replace('T', ' ');
 return localTime;
}
```
## nodejs的express框架使用
遇到问题：postman的使用  传参数 请求体  选项
contentType 中常见的选项有： application/x-www-form-urlencoded 、 application/json、text/xml 、 multipart/form-data 这些选项用于表明发送数据流的类型，后端根据类型进行对应的数据解析。
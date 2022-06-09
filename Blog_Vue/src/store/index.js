/*
 * @Author: 陈永平 956086636@qq.com
 * @Date: 2022-04-25 10:36:38
 * @LastEditors: 陈永平 956086636@qq.com
 * @LastEditTime: 2022-06-09 20:41:38
 * @FilePath: \Blog_Vue_Node\Blog_Vue\src\store\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: JSON.parse(window.sessionStorage.getItem('user')),
    token: JSON.parse(window.sessionStorage.getItem('token')),
    administrator: JSON.parse(window.sessionStorage.getItem('user')) !== null && JSON.parse(window.sessionStorage.getItem('user')).type === '1',
    loginFormVisiable: false,
    registorFormVisiable: false,
    pageName: 'index',
  },
  mutations: {
    // 改变页面
    changePage (state, name) {
      state.pageName = name
    },
    // 获取用户信息
    getUserInfo (state) {
      state.userInfo = JSON.parse(window.sessionStorage.getItem('user'))
      state.token = JSON.parse(window.sessionStorage.getItem('token'))
      if (state.userInfo !== null && state.userInfo.type == '0') {
        state.administrator = true
      } else {
        state.administrator = false
      }
    },
    showLFV (state) {
      state.loginFormVisiable = true
    },
    showRFV (state) {
      state.registorFormVisiable = true
    },
    cancelLFV (state) {
      state.loginFormVisiable = false
    },
    cancelRFV (state) {
      state.registorFormVisiable = false
    },
    logout (state) {
      state.userInfo = null
      state.administrator = false
    }
  },
  actions: {
  },
  modules: {
  }
})

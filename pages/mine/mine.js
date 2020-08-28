// pages/mine/mine.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '集贤装物流',
    statusBarHeight: app.globalData.statusBarHeight,
    titleBarHeight: app.globalData.titleBarHeight,
    avator: '../img/logo2.svg',
    nickname: '昵称',
    phone: '',
  },
  // 登出
  loginOut() {
    wx.showModal({
      title: '提示',
      content: '请确认是否退出',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.url + '/logout',
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
              'cookie': wx.getStorageSync('cookie')
            },
            method: 'post',
            success: function (res) {
              wx.hideToast()
              if (res.data.codeMsg) {
                wx.showToast({
                  title: res.data.codeMsg,
                  icon: 'none'
                })
              }
              if (res.data.code == 0) {
                wx.redirectTo({
                  url: '../login/login',
                })
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  myorder() {
    wx.navigateTo({
      url: '../orderListAll/orderListAll',
    })
  },
  myoffer() {
    wx.navigateTo({
      url: '../myoffer/myoffer',
    })
  },

  gologin(e) {
    wx.navigateTo({
      url: '../login/login?tabbarIs=1&route=' + getCurrentPages()[0].route,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    if(app.globalData.loginIf==0){
      wx.request({
        url: app.globalData.url + '/login-refresh',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          'cookie': wx.getStorageSync('cookie')
        },
        method: 'post',
        success: function (res) {
          wx.hideToast()
          if (res.data.code == 0) {
            app.globalData.userInfoDetail = res.data.data
            app.globalData.loginIf = 1
            that.setData({
              loginIf: app.globalData.loginIf
            })
          } else if (res.data.code == 20) {
            app.globalData.loginIf = 0
          } else {
            wx.showToast({
              title: res.data.codeMsg,
              icon: 'none'
            })
          }
        }
      })
    }
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this
    that.setData({
      avator: app.globalData.userInfoDetail.logo || '../img/logo2.svg',
      nickname: app.globalData.userInfoDetail.nickname || '',
      loginIf: app.globalData.loginIf,
      phone: app.globalData.userInfoDetail.phone,
    })
    //   wx.request({
    //     url: app.globalData.url + '/login-refresh',
    //     header: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //       'cookie': wx.getStorageSync('cookie')
    //     },
    //     method: 'post',
    //     success: function (res) {
    //       wx.hideToast()
    //       if (res.data.code == 0) {
    //         app.globalData.userInfoDetail = res.data.data
    //         that.setData({
    //           avator: res.data.data.logo,
    //           nickname: res.data.data.nickname,
    //         })
    //       } else if(res.data.code==20){
    //         // wx.showToast({
    //         //   title: '请登录',
    //         //   icon: 'none',
    //         //   duration: 2000,
    //         //   mask: true,
    //         //   complete: function complete(res) {
    //         //     setTimeout(function () {   
    //         //         wx.navigateTo({
    //         //           url: '../login/login',
    //         //         })   
    //         //     }, 100);
    //         //   }
    //         // });
    //       }else{
    //         wx.showToast({
    //           title: res.data.codeMsg,
    //           icon: 'none'
    //         })
    //       }
    //     }
    //   })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
 
})
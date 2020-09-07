//app.js
App({
  version:'1.0.2009070045',
  versionNote:'修复了一些BUG, 优化了用户体验.',
  globalData: {
    userInfo: null,
    userInfoDetail:[],
    statusBarHeight:'',
    titleBarHeight:'',
    loginIf:'0',
    domain:'https://speedcbox.com',
    renzhengcover1:'',
    renzhengcover2:'',
    renzhengcover3:'',
    renzhengcover4:'',
  },
  
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    const vm = this
    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // wx.request({
        //   url: vm.globalData.url + '/refresh-wx-session-key',
        //   header: {
        //     "Content-Type": "application/x-www-form-urlencoded",
        //     'cookie': wx.getStorageSync('cookie')
        //   },
        //   method: 'post',
        //   data: {
        //     jscode: res.code,
        //   },
        //   success: function (res) {
        //     wx.hideToast()
        //     if (res.data.code == 0) {
        //       // wx.setStorageSync('cookie', res.header['Set-Cookie'])
            
        //     } else if (res.data.code == 20) {
        //       wx.showToast({
        //         title: '请先登录',
        //         icon: 'none',
        //         duration: 2000,
        //         mask: true,
        //         complete: function complete(res) {
        //           setTimeout(function () {                          
        //               wx.navigateTo({
        //                 url: '../login/login',
        //               })
        //           }, 500);
        //         }
        //       })
        //     }else{
        //       wx.showToast({
        //         title: res.data.codeMsg,
        //         icon: 'none',
        //         duration: 2000,
               
        //       })
        //     }
        //   }
        // })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })
    wx.setStorageSync('searchKeys', '')
    updateManager.onUpdateReady(function () {
      updateManager.applyUpdate()
      // wx.showLoading({
      //   title: '新版本已准备好,请稍等',//'版本已更新',
      //   mask: true
      // })
      // //等待提示‘版本更新’完以后倒计时执行重启小程序
      // setTimeout(function() {
      //   updateManager.applyUpdate()
      // }, 1500);
      // wx.showModal({
      //   title: '更新提示',
      //   content: '新版本已准备好, 请重新进入.',
      //   success: function (res) {
      //     if (res.confirm) {
      //       // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
      //       updateManager.applyUpdate()
      //     }
      //   }
      // })
    })

    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
    })
    
    wx.getSystemInfo({
      success: function(res) {
        let titleBarHeight = 0
        if (res.model.indexOf('iPhone') !== -1) {
          titleBarHeight = 44
        } else {
          titleBarHeight = 48
        }
        // that.setData({
          vm.globalData.statusBarHeight= res.statusBarHeight,
          vm.globalData.titleBarHeight= titleBarHeight
        // });
       
      },
      failure() {
        vm.globalData.statusBarHeight= res.statusBarHeight,
          vm.globalData.titleBarHeight= titleBarHeight
      }
    
    })
  },
  cover(_cover){
    var that=this
    if(_cover&&_cover.slice(0,1)!='h'){
      _cover=this.globalData.domain+_cover
    }
    return _cover
  }
  
})
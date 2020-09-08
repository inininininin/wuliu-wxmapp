// pages/addressList/addressList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fahuoAddressList: []
  },
  selectThis(e) {
    console.log(e.currentTarget.dataset.address)
    let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
    let prevPage = pages[pages.length - 2];
    //prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。
    prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
      // fahuoAddressList: res.data.data.items,
      // fahuoAddressListEve: res.data.data.items[0],
      fahuoList: e.currentTarget.dataset.address,
    })
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.request({
      url: app.globalData.domain + '/wuliu/order/history-fa-huo-addresses',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': wx.getStorageSync('cookie')
      },
      method: 'post',
      success: function (res) {
        if (res.data.codeMsg && res.data.code != 20) {
          wx.showToast({
            title: res.data.codeMsg,
            icon: 'none'
          })
        }
        if (res.data.code == 0) {
          if (res.data.data.items && res.data.data.items.length > 0) {

            for (var i in res.data.data.items) {
              res.data.data.items[i].picker = false
              res.data.data.items[i].region = [res.data.data.items[i].faHuoArea1Name, res.data.data.items[i].faHuoArea2Name, res.data.data.items[i].faHuoArea3Name]
            }
            that.setData({
              fahuoAddressList: res.data.data.items,
              fahuoAddressListEve: res.data.data.items[0]
            })

          }

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

  }
})
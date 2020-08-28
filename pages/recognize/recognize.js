// pages/recognize/recognize.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true,
    active1: '',
    active2: '',
    active3: '',
    type: 0,
  },
  personal(e) {
    this.setData({
      active1: 'active',
      active2: '',
      active3: '',
      type: 1
    })
  },
  company(e) {
    this.setData({
      active1: '',
      active2: 'active',
      active3: '',
      type: 2
    })
  },
  maoyi(e) {
    this.setData({
      active1: '',
      active2: '',
      active3: 'active',
      type: 3
    })
  },
  gorecNo(e) {
    wx.showToast({
      title: '请先选择认证方',
      icon: 'none'
    })
  },
  gorec(e) {
    wx.navigateTo({
      url: '../recognizeSh/recognizeSh?type=' + this.data.type,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
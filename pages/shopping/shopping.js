// pages/shopping/shopping.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle:'集贤装物流',
    statusBarHeight:app.globalData.statusBarHeight,
    titleBarHeight: app.globalData.titleBarHeight,
    shopList:[{},{},{},{},{},{},{}],
    navbar: ['已报价订单','已完成订单','已完成订单','已完成订单1','已完成订单2','已完成订单2'],
    navbar:[{'name':'全部','value':['全部一','全部二','全部一','全部二','全部一','全部二','全部一','全部二','全部一','全部二']},{'name':'全部','value':['全部一','全部二']},{'name':'全部','value':['全部一','全部二']},{'name':'全部','value':['全部一','全部二']},{'name':'全部','value':['全部一','全部二']},{'name':'全部','value':['全部一','全部二']},{'name':'全部','value':['全部一','全部二']},{'name':'全部','value':['全部一','全部二']},{'name':'全部','value':['全部一','全部二']},{'name':'全部','value':['全部一','全部二']}],
    currentTab: 0,
    navbarEve:[],
    currentTabEve: 0,
  },
// 导航栏切换
navbarTap: function(e) {
  this.setData({
    currentTab: e.currentTarget.dataset.idx,
    navbarEve:this.data.navbar[e.currentTarget.dataset.idx].value
  })
},
navbarTapEve: function(e) {
  console.log(e.currentTarget.dataset.idx)
  this.setData({
    currentTabEve: e.currentTarget.dataset.idx,
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navbarEve:this.data.navbar[0].value
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
  
    if(this.data.navbarEve&&this.data.navbarEve.length==0){
      console.log(this.data.navbarEve.length)
      this.setData({
        navbarEve:this.data.navbar[0].value
      })
    }
    
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

  }
})
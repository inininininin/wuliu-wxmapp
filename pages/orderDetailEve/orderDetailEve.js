// pages/orderDetail/orderDetail.js
const app = getApp()
const util=require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    orderDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      orderId:options.id
    })
    wx.request({
      url: app.globalData.domain + '/wuliu/order/order-info',
      data: {
        orderId: options.id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': wx.getStorageSync('cookie')
      },
      method: 'post',
      success: function (res) {
        if (res.data.codeMsg) {
          wx.showToast({
            title: res.data.codeMsg,
            icon: 'none'
          })
        }
        if (res.data.code == 0) {
          if (res.data.data.faHuoTime) {
            res.data.data.faHuoTime = res.data.data.faHuoTime.slice(0, 10)
          }
          if (res.data.data.insertTime) {
            res.data.data.insertTime = res.data.data.insertTime.slice(0, 10)
          }
          if (res.data.data.shouHuoTime) {
            res.data.data.shouHuoTime = res.data.data.shouHuoTime.slice(0, 10)
          }
          if (res.data.data.shouHuo1Time) {
            res.data.data.shouHuo1Time = res.data.data.shouHuo1Time.slice(0, 10)
          }
          if (res.data.data.shouHuo2Time) {
            res.data.data.shouHuo2Time = res.data.data.shouHuo2Time.slice(0, 10)
          }
          if (res.data.data.shouHuo3Time) {
            res.data.data.shouHuo3Time = res.data.data.shouHuo3Time.slice(0, 10)
          }
          if(res.data.data.huoWuLeiXing==1){
            res.data.data.huoWuLeiXingName='服装'
          }else if(res.data.data.huoWuLeiXing==2){
            res.data.data.huoWuLeiXingName='食品'
          }
          if(res.data.data.baoZhuangFangShi==1){
            res.data.data.baoZhuangFangShiName='有托盘'
          }else if(res.data.data.baoZhuangFangShi==2){
            res.data.data.baoZhuangFangShiName='无托盘'
          }
          if(res.data.data.xiangXing==1){
            res.data.data.xiangXingName='20小箱'
          }else if(res.data.data.xiangXing==2){
            res.data.data.xiangXingName='40大箱'
          }else if(res.data.data.xiangXing==3){
            res.data.data.xiangXingName='40高箱'
          }else if(res.data.data.xiangXing==4){
            res.data.data.xiangXingName='45高箱'
          }

          if(res.data.data.gongNeng==1){
            res.data.data.gongNengName='普通'
          }else if(res.data.data.gongNeng==2){
            res.data.data.gongNengName='短板'
          }else if(res.data.data.gongNeng==3){
            res.data.data.gongNengName='短板自卸'
          }else if(res.data.data.gongNeng==4){
            res.data.data.gongNengName='冷柜'
          }else if(res.data.data.gongNeng==5){
            res.data.data.gongNengName='开顶'
          }else if(res.data.data.gongNeng==6){
            res.data.data.gongNengName='罐式'
          }else if(res.data.data.gongNeng==7){
            res.data.data.gongNengName='脚架折叠'
          }else if(res.data.data.gongNeng==8){
            res.data.data.gongNengName='板框折叠'
          }else if(res.data.data.gongNeng==9){
            res.data.data.gongNengName='挂衣'
          }
          // if(res.data.data.xiangShu==1){
          //   res.data.data.xiangShuName='普通'
          // }else if(res.data.data.xiangShu==2){
          //   res.data.data.xiangShuName='短板'
          // }else if(res.data.data.xiangShu==3){
          //   res.data.data.xiangShuName='短板自卸'
          // }
          if( res.data.data.xiangShuUnit==1){
            res.data.data.xiangShuUnit='个'
          }else  if( res.data.data.xiangShuUnit==2){
            res.data.data.xiangShuUnit='组'
          }
          res.data.data.orderIdEve=res.data.data.orderId.slice(res.data.data.orderId.length-15,res.data.data.orderId.length)
          that.setData({
            orderDetail: res.data.data
          })
        } else if (res.data.code == 20) {
          wx.showToast({
            title: '请先登录',
            icon: 'none',
            duration: 2000,
            mask: true,
            complete: function complete(res) {
              setTimeout(function () {
                wx.navigateTo({
                  url: '../login/login',
                })
              }, 100);
            }
          });
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
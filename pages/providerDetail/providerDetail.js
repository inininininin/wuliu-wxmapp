// pages/orderDetail/orderDetail.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yellow_star:0,//黄色五角星，默认一开始是黄色星星0分
    gray_star:5,//灰色五角星 灰色星星是5颗 表示是5分
    star_per:0,//自定义长度黄色五角星  一开始需要打的是0分
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var star="3.62";//后台获取的评分
    var yellow_star=parseInt(star);//需要展示的整个黄色5角星，3.62分的时候需要展示3颗整个的黄色五角星。
    var star_per=parseFloat(star-yellow_star)*100;//3.62颗评价分-3颗整个黄色星，是0.62的占比，先将它*100。这样赋值的时候比较方便。也就是一颗灰色的星星中展示出62%的黄色部位。
    var gray_star=parseInt(5-star);//需要展示的灰色星星，正常是5-3.62=1.38颗，0.38颗已经是在百分比中了。所以此时最后需要展示的是1整个灰色五角星
    this.setData({    
        star:star,  //评分数       
        yellow_star:yellow_star,//整个黄色五角星的个数
        star_per:star_per,//一颗灰色五角星中黄色五角星的占比
        gray_star:gray_star,//整个灰色五角星的数量
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
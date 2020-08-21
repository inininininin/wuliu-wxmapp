// pages/orderList/orderList.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [{'status':1}, {'status':0}, {'status':1}, {'status':0}],
    navbar: ['待确认订单','已完成订单'],
    currentTab: 0,
    totalCount:0,
    totalCount1:0
  },
// 导航栏切换
  navbarTap: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
      productIs: e.currentTarget.dataset.idx,
      qx:1,
    })
  },
//  分页
  lastPage(kw,baoJiaId,orderId,sort,order,pageNo){
    let that=this
   wx.request({
     url: app.globalData.url+'/wuliu/order/bao-jia-list',
     data:{
       kw: kw,
       baoJiaId:baoJiaId,
       orderId:orderId,
       sort:sort,
       order:order,
       pn:pageNo,
       ps:15
     },
     header: {
       "Content-Type": "application/x-www-form-urlencoded",
       'cookie': wx.getStorageSync('cookie')
     },
     method: 'post',
     success:function(res){
       if(res.data.codeMsg){
         wx.showToast({
           title: res.data.codeMsg,
           icon:'none'
         })
       }
       if(res.data.code==0){
         console.log(res.data.data.itemList)
         for(var i in res.data.data.itemList){
           res.data.data.itemList[i].faHuoTime=res.data.data.itemList[i].faHuoTime.slice(0,10)
           if(res.data.data.itemList[i].huoWuLeiXing==1){
             res.data.data.itemList[i].huoWuLeiXingName='服装'
           }else if(res.data.data.itemList[i].huoWuLeiXing==2){
             res.data.data.itemList[i].huoWuLeiXingName='食品'
           }
           if(res.data.data.itemList[i].xiangXing==1){
             res.data.data.itemList[i].xiangXingName='木箱'
           }else if(res.data.data.itemList[i].xiangXing==2){
             res.data.data.itemList[i].xiangXingName='纸箱'
           }
         }
         that.data.orderList.concat(res.data.data.itemList)
         var orderListArr = that.data.orderList;
         var neworderListArr = orderListArr.concat(res.data.data.itemList)
         that.setData({
           orderList:neworderListArr,
           pageNo:pageNo,
         })
         if(that.data.orderList.length==that.data.totalCount){
           that.setData({
             listTitle:'数据已全部加载完成.'
           })
         }else{
           that.setData({
             listTitle:'.'
           })
         }
       }else if(res.data.code==20){
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
 lastPageNumber(kw,baoJiaId,orderId){
   let that=this
  wx.request({
    url: app.globalData.url+'/wuliu/order/bao-jia-list-sum',
    data:{
      kw: kw,
      baoJiaId:baoJiaId,
      orderId:orderId
    },
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
      'cookie': wx.getStorageSync('cookie')
    },
    method: 'post',
    success:function(res){
      if(res.data.codeMsg){
        wx.showToast({
          title: res.data.codeMsg,
          icon:'none'
        })
      }
      if(res.data.code==0){
        that.setData({
         totalCount:res.data.data.itemCount
        })
      }else if(res.data.code==20){
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.lastPage('','','','','asc',1)
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
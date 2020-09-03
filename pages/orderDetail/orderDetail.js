// pages/orderDetail/orderDetail.js
const app = getApp()
const util=require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '请选择',
    colorTime: '#999999',
    priceList: [{ 'name': '中远', 'zhongYuanMoney': '', 'zhongYuanZhuangChuanTime': '请选择', 'zhongYuanDaoGangTime': '请选择', 'colorTime': '#999999', 'colorTime1': '#999999' }, { 'name': '中谷', 'zhongGuMoney': '', 'zhongGuZhuangChuanTime': '请选择', 'zhongGuDaoGangTime': '请选择', 'colorTime': '#999999', 'colorTime1': '#999999'  }, { 'name': '信风', 'xinFengMoney': '', 'xinFengZhuangChuanTime': '请选择', 'xinFengDaoGangTime': '请选择', 'colorTime': '#999999', 'colorTime1': '#999999'  }, { 'name': '安通', 'anTongMoney': '', 'anTongZhuangChuanTime': '请选择', 'anTongDaoGangTime': '请选择', 'colorTime': '#999999', 'colorTime1': '#999999'  }],
    orderDetail: {}
  },
// 提交报价
sendPrice(e){
  let that=this
  if(that.data.priceList[0].zhongYuanMoney==''&&that.data.priceList[1].zhongGuMoney==''&&that.data.priceList[2].xinFengMoney==''&&that.data.priceList[3].anTongMoney==''){
    wx.showToast({
      title: '请最少填写一个物流报价',
      icon: 'none'
    })
    return
  }
  // if(that.data.priceList[0].zhongYuanMoney==''||that.data.priceList[1].zhongGuMoney==''||that.data.priceList[2].xinFengMoney==''||that.data.priceList[3].anTongMoney==''){
  //   wx.showToast({
  //     title: '请填写所有的物流报价',
  //     icon: 'none'
  //   })
  //   return
  // }
  if(that.data.priceList[0].zhongYuanMoney!=''||that.data.priceList[0].zhongYuanZhuangChuanTime!='请选择'||that.data.priceList[0].zhongYuanDaoGangTime!='请选择'){
    if(that.data.priceList[0].zhongYuanMoney==''){
      wx.showToast({
        title: '请填写中远报价价格',
        icon: 'none'
      })
      return
    }
  }
  if(that.data.priceList[1].zhongGuMoney!=''||that.data.priceList[1].zhongGuZhuangChuanTime!='请选择'||that.data.priceList[1].zhongGuDaoGangTime!='请选择'){
    if(that.data.priceList[1].zhongGuMoney==''){
      wx.showToast({
        title: '请填写中谷报价价格',
        icon: 'none'
      })
      return
    }
  }
  if(that.data.priceList[2].xinFengMoney!=''||that.data.priceList[2].xinFengZhuangChuanTime!='请选择'||that.data.priceList[2].xinFengDaoGangTime!='请选择'){
    if(that.data.priceList[2].xinFengMoney==''){
      wx.showToast({
        title: '请填写信风报价价格',
        icon: 'none'
      })
      return
    }
  }
  if(that.data.priceList[3].anTongMoney!=''||that.data.priceList[3].anTongZhuangChuanTime!='请选择'||that.data.priceList[3].anTongDaoGangTime!='请选择'){
    if(that.data.priceList[3].anTongMoney==''){
      wx.showToast({
        title: '请填写安通报价价格',
        icon: 'none'
      })
      return
    }
  }
  
  wx.request({
    url: app.globalData.domain + '/wuliu/order/bao-jia-do',
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
      'cookie': wx.getStorageSync('cookie')
    },
    method: 'post',
    data: {
      orderId:that.data.orderId,
      zhongYuanMoney: that.data.priceList[0].zhongYuanMoney*10000||'',
      zhongYuanZhuangChuanTime:util.formatTimecuo(that.data.priceList[0].zhongYuanZhuangChuanTime)||'',
      zhongYuanDaoGangTime: util.formatTimecuo(that.data.priceList[0].zhongYuanDaoGangTime)||'',
      zhongGuMoney: that.data.priceList[1].zhongGuMoney*10000||'',
      zhongGuZhuangChuanTime: util.formatTimecuo(that.data.priceList[1].zhongGuZhuangChuanTime)||'',
      zhongGuDaoGangTime: util.formatTimecuo(that.data.priceList[1].zhongGuDaoGangTime)||'',
      xinFengMoney: that.data.priceList[2].xinFengMoney*10000||'',
      xinFengZhuangChuanTime: util.formatTimecuo(that.data.priceList[2].xinFengZhuangChuanTime)||'',
      xinFengDaoGangTime: util.formatTimecuo(that.data.priceList[2].xinFengDaoGangTime)||'',
      anTongMoney: that.data.priceList[3].anTongMoney*10000||'',
      anTongZhuangChuanTime: util.formatTimecuo(that.data.priceList[3].anTongZhuangChuanTime)||'',
      anTongDaoGangTime: util.formatTimecuo(that.data.priceList[3].anTongDaoGangTime)||'',
    },
    success: function (res) {
      if (res.data.codeMsg) {
        wx.showToast({
          title: res.data.codeMsg,
          icon: 'none'
        })
      }
      if (res.data.code == 0) {
        wx.showToast({
          title: '已提交报价',
          icon: 'none',
          duration: 2000,
          mask: true,
          complete: function complete(res) {
            setTimeout(function () {
              wx.redirectTo({
                url: '../myoffer/myoffer',
              })
            }, 100);
          }
        });
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

  // 报价单价格
  zhongYuanMoney(e) {
    this.data.priceList[0].zhongYuanMoney = e.detail.value
    this.setData({
      priceList: this.data.priceList
    })
  },
  zhongGuMoney(e) {
    this.data.priceList[1].zhongGuMoney = e.detail.value
    this.setData({
      priceList: this.data.priceList
    })
  },
  xinFengMoney(e) {
    this.data.priceList[2].xinFengMoney = e.detail.value
    this.setData({
      priceList: this.data.priceList
    })
  },
  anTongMoney(e) {
    this.data.priceList[3].anTongMoney = e.detail.value
    this.setData({
      priceList: this.data.priceList
    })
  },
  // 中远装船
  zhongYuanZhuangChuanTime: function (e) {
    this.data.priceList[0].zhongYuanZhuangChuanTime = e.detail.value
    this.data.priceList[0].colorTime = '#333333'
    this.setData({
      priceList: this.data.priceList,
    })
  },
  zhongYuanDaoGangTime: function (e) {
    if(this.data.priceList[0].zhongYuanZhuangChuanTime==''||this.data.priceList[0].zhongYuanZhuangChuanTime=='请选择'){
      wx.showToast({
        title: '请先选择装船时间',
        icon:'none'
      })
      return
    }
    this.data.priceList[0].zhongYuanDaoGangTime = e.detail.value
    this.data.priceList[0].colorTime1 = '#333333'
    this.setData({
      priceList: this.data.priceList,
    })
  },
  // 中谷装船
  zhongGuZhuangChuanTime: function (e) {
    this.data.priceList[1].zhongGuZhuangChuanTime = e.detail.value
    this.data.priceList[1].colorTime = '#333333'
    this.setData({
      priceList: this.data.priceList,
    })
  },
  zhongGuDaoGangTime: function (e) {
    if(this.data.priceList[1].zhongGuZhuangChuanTime==''||this.data.priceList[1].zhongGuZhuangChuanTime=='请选择'){
      wx.showToast({
        title: '请先选择装船时间',
        icon:'none'
      })
      return
    }
    this.data.priceList[1].zhongGuDaoGangTime = e.detail.value
    this.data.priceList[1].colorTime1 = '#333333'
    this.setData({
      priceList: this.data.priceList,
    })
  },
  // 信封装船
  xinFengZhuangChuanTime: function (e) {
    this.data.priceList[2].xinFengZhuangChuanTime = e.detail.value
    this.data.priceList[2].colorTime = '#333333'
    this.setData({
      priceList: this.data.priceList,
    })
  },
  xinFengDaoGangTime: function (e) {
    if(this.data.priceList[2].xinFengZhuangChuanTime==''||this.data.priceList[2].xinFengZhuangChuanTime=='请选择'){
      wx.showToast({
        title: '请先选择装船时间',
        icon:'none'
      })
      return
    }
    this.data.priceList[2].xinFengDaoGangTime = e.detail.value
    this.data.priceList[2].colorTime1 = '#333333'
    this.setData({
      priceList: this.data.priceList,
    })
  },
  // 安通装船
  anTongZhuangChuanTime: function (e) {
    this.data.priceList[3].anTongZhuangChuanTime = e.detail.value
    this.data.priceList[3].colorTime = '#333333'
    this.setData({
      priceList: this.data.priceList,
    })
  },
  anTongDaoGangTime: function (e) {
    if(this.data.priceList[3].anTongZhuangChuanTime==''||this.data.priceList[3].anTongZhuangChuanTime=='请选择'){
      wx.showToast({
        title: '请先选择装船时间',
        icon:'none'
      })
      return
    }
    this.data.priceList[3].anTongDaoGangTime = e.detail.value
    this.data.priceList[3].colorTime1 = '#333333'
    this.setData({
      priceList: this.data.priceList,
    })
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
            res.data.data.shouHuoTime = res.data.data.insertTime.slice(0, 10)
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
            res.data.data.baoZhuangFangShiName='木箱'
          }else if(res.data.data.baoZhuangFangShi==2){
            res.data.data.baoZhuangFangShiName='纸箱'
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
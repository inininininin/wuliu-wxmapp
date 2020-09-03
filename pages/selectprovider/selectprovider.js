// pages/orderDetail/orderDetail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    orderDetail: {},
    baoJiaId: '',
    orderId: '',
  },
  checkboxChange(e) {
    this.setData({
      baoJiaId: e.detail.value
    })
  },
  // 提交报价
  sendPrice() {
    let that = this
    if (that.data.baoJiaId == '') {
      wx.showToast({
        title: '请先选择报价商',
        icon: 'none'
      })
      return
    }
    wx.request({
      url: app.globalData.domain + '/wuliu/order/select-bao-jia',
      data: {
        orderId: that.data.orderId,
        baoJiaId: that.data.baoJiaId,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': wx.getStorageSync('cookie')
      },
      method: 'post',
      success(res) {
        if (res.data.codeMsg) {
          wx.showToast({
            title: res.data.codeMsg,
            icon: 'none'
          })
        }
        if (res.data.code == 0) {
          let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
          let prevPage = pages[pages.length - 2];
          //prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。
          prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
            change: 1,
          })
          wx.navigateBack({
            complete: (res) => { },
            delta: 1,
            fail: (res) => { },
            success: (res) => { },
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      orderId: options.id
    })
    that.lastpage(options.id)
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
          if (res.data.data.huoWuLeiXing == 1) {
            res.data.data.huoWuLeiXingName = '服装'
          } else if (res.data.data.huoWuLeiXing == 2) {
            res.data.data.huoWuLeiXingName = '食品'
          }
          if (res.data.data.baoZhuangFangShi == 1) {
            res.data.data.baoZhuangFangShiName = '木箱'
          } else if (res.data.data.baoZhuangFangShi == 2) {
            res.data.data.baoZhuangFangShiName = '纸箱'
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

          if (res.data.data.gongNeng == 1) {
            res.data.data.gongNengName = '普通'
          } else if (res.data.data.gongNeng == 2) {
            res.data.data.gongNengName = '短板'
          } else if (res.data.data.gongNeng == 3) {
            res.data.data.gongNengName = '短板自卸'
          } else if (res.data.data.gongNeng == 4) {
            res.data.data.gongNengName = '冷柜'
          } else if (res.data.data.gongNeng == 5) {
            res.data.data.gongNengName = '开顶'
          } else if (res.data.data.gongNeng == 6) {
            res.data.data.gongNengName = '罐式'
          } else if (res.data.data.gongNeng == 7) {
            res.data.data.gongNengName = '脚架折叠'
          } else if (res.data.data.gongNeng == 8) {
            res.data.data.gongNengName = '板框折叠'
          } else if (res.data.data.gongNeng == 9) {
            res.data.data.gongNengName = '挂衣'
          }
          // if (res.data.data.xiangShu == 1) {
          //   res.data.data.xiangShuName = '普通'
          // } else if (res.data.data.xiangShu == 2) {
          //   res.data.data.xiangShuName = '短板'
          // } else if (res.data.data.xiangShu == 3) {
          //   res.data.data.xiangShuName = '短板自卸'
          // }
          if( res.data.data.xiangShuUnit==1){
            res.data.data.xiangShuUnit='个'
          }else  if( res.data.data.xiangShuUnit==2){
            res.data.data.xiangShuUnit='组'
          }
          res.data.data.orderIdEve=res.data.data.orderId.slice(res.data.data.orderId.length-17,res.data.data.orderId.length)
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
                  url: '../login/login?tabbarIs=0&route=' + getCurrentPages()[0].route,
                })
              }, 100);
            }
          });
        }
      }
    })
  },

  lastpage(id) {
    let that = this
    wx.request({
      url: app.globalData.domain + '/wuliu/order/bao-jia-list',
      data: {
        orderId: id,
        pn: 1,
        ps: 200
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': wx.getStorageSync('cookie')
      },
      method: 'post',
      success(res) {
        if (res.data.codeMsg) {
          wx.showToast({
            title: res.data.codeMsg,
            icon: 'none'
          })
        }
        if (res.data.code == 0) {
          that.setData({
            items: res.data.data.itemList
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
                  url: '../login/login?tabbarIs=0&route=' + getCurrentPages()[0].route,
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
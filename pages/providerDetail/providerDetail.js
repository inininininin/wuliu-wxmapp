// pages/orderDetail/orderDetail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '服务商详情',
    statusBarHeight: app.globalData.statusBarHeight,
    titleBarHeight: app.globalData.titleBarHeight,
    yellow_star: 0,//黄色五角星，默认一开始是黄色星星0分
    gray_star: 5,//灰色五角星 灰色星星是5颗 表示是5分
    star_per: 0,//自定义长度黄色五角星  一开始需要打的是0分
    orderDetail: {},
    baojiaDetail: {},
    orderId: '',
    showPj: false,
    point: '',
    starList: [{ show: true, point: 1 }, { show: true, point: 2 }, { show: true, point: 3 }, { show: true, point: 4 }, { show: true, point: 5 }]
  },
  backHistory(e){
    wx.navigateBack({
      complete: (res) => {},
      delta: 1,
      fail: (res) => {},
      success: (res) => {},
    })
  },
  linePhone(e) {
    if (!e.currentTarget.dataset.phone) {
      wx.showToast({
        title: '当前无号码',
        icon: 'none'
      })
    }
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone,
    })
  },

  // 评分颜色方法
  star(star) {
    // var star=star;//后台获取的评分
    var yellow_star = parseInt(star);//需要展示的整个黄色5角星，3.62分的时候需要展示3颗整个的黄色五角星。
    var star_per = parseFloat(star - yellow_star) * 100;//3.62颗评价分-3颗整个黄色星，是0.62的占比，先将它*100。这样赋值的时候比较方便。也就是一颗灰色的星星中展示出62%的黄色部位。
    var gray_star = parseInt(5 - star);//需要展示的灰色星星，正常是5-3.62=1.38颗，0.38颗已经是在百分比中了。所以此时最后需要展示的是1整个灰色五角星
    this.setData({
      star: star,  //评分数       
      yellow_star: yellow_star,//整个黄色五角星的个数
      star_per: star_per,//一颗灰色五角星中黄色五角星的占比
      gray_star: gray_star,//整个灰色五角星的数量
    })
  },
  // 重新选择服务商
  sendPrice(e) {
    if (this.data.orderId == '') {
      wx.showToast({
        title: '请稍后重试',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: '../selectprovider/selectprovider?id=' + this.data.orderId,
    })
  },
  // 去评价
  gopoint(e) {
    this.setData({
      showPj: true
    })
  },
  // 关闭评价
  closepoint(e) {
    this.setData({
      showPj: false
    })
  },
  // 评价服务商
  pointThis(e) {
    console.log(e.currentTarget.dataset.point)
    for (var i in this.data.starList) {

      if (i < e.currentTarget.dataset.point) {
        console.log(i)
        this.data.starList[i].show = false
      } else {
        this.data.starList[i].show = true
      }
    }
    this.setData({
      starList: this.data.starList,
      point: e.currentTarget.dataset.point
    })

  },
  makesureThis(e) {
    let that = this
    if (that.data.point == '') {
      wx.showToast({
        title: '请选择几颗星',
        icon: 'none'
      })
      return
    }
    // wx.request({
    //   url: app.globalData.domain + '/wuliu/order/order-info',
    //   data: {
    //     baojiaId: that.data.baojiaId,
    // point:that.data.point
    //   },
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     'cookie': wx.getStorageSync('cookie')
    //   },
    //   method: 'post',
    //   success: function (res) {

    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      orderId: options.id
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
          wx.request({
            url: app.globalData.domain + '/wuliu/order/bao-jia-list',
            data: {
              baoJiaId: res.data.data.baoJiaId
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
                res.data.data.itemList[0].zhongYuanZhuangChuanTime = res.data.data.itemList[0].zhongYuanZhuangChuanTime.slice(0, 10)
                res.data.data.itemList[0].zhongYuanDaoGangTime = res.data.data.itemList[0].zhongYuanDaoGangTime.slice(0, 10)
                res.data.data.itemList[0].zhongGuDaoGangTime = res.data.data.itemList[0].zhongGuDaoGangTime.slice(0, 10)
                res.data.data.itemList[0].zhongGuZhuangChuanTime = res.data.data.itemList[0].zhongGuZhuangChuanTime.slice(0, 10)
                res.data.data.itemList[0].xinFengDaoGangTime = res.data.data.itemList[0].xinFengDaoGangTime.slice(0, 10)
                res.data.data.itemList[0].xinFengZhuangChuanTime = res.data.data.itemList[0].xinFengZhuangChuanTime.slice(0, 10)
                res.data.data.itemList[0].anTongZhuangChuanTime = res.data.data.itemList[0].anTongZhuangChuanTime.slice(0, 10)
                res.data.data.itemList[0].anTongDaoGangTime = res.data.data.itemList[0].anTongDaoGangTime.slice(0, 10)
                that.setData({
                  baojiaDetail: res.data.data.itemList[0]
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
          that.star(res.data.data.pingJiaScore)
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
          if (res.data.data.xiangXing == 1) {
            res.data.data.xiangXingName = '木箱'
          } else if (res.data.data.xiangXing == 2) {
            res.data.data.xiangXingName = '纸箱'
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
          if (res.data.data.xiangShu == 1) {
            res.data.data.xiangShuName = '普通'
          } else if (res.data.data.xiangShu == 2) {
            res.data.data.xiangShuName = '短板'
          } else if (res.data.data.xiangShu == 3) {
            res.data.data.xiangShuName = '短板自卸'
          }

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
// pages/orderList/orderList.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '集贤装物流',
    statusBarHeight: app.globalData.statusBarHeight,
    titleBarHeight: app.globalData.titleBarHeight,
    color: '#999',
    loginIf: '',
    selectDatas: ['最新订单', '临近发货日期', '已成交订单'], //下拉列表的数据
    indexs: 0, //选择的下拉列 表下标,
    orderList: [],
    index: 0,
    picker: true,
    pickers: true,
    region: ['请选择地址'],
    regions: ['请选择地址'],
    showIs: false,//弹窗是否弹出
    orderSort: '',
    faHuoAreaId: '',
    shouHuoAreaId: '',
    totalCount: '0',
    pageNo: '',
    listTitle: '',
    show: false,
    chengJiaoIs: 0,
    order: '',
    sort: '',
    change: 0,
  },

  // 关闭弹窗
  closePop(e) {
    this.setData({
      show: false
    })
  },
  // 去认证
  goRecognize(e) {
    this.setData({
      show: false
    })
    wx.navigateTo({
      url: '../recognizeSh/recognizeSh?type=0',
    })
  },
  // 去登陆
  gologinBtn(e) {
    wx.navigateTo({
      url: '../login/login?tabbarIs=1&route=' + getCurrentPages()[0].route,
    })
  },
  // 跳转e
  jumpThis(e) {
    console.log(e.currentTarget.dataset.userideve,e.currentTarget.dataset.chengjiao)
    if (e.currentTarget.dataset.userideve == 2 && e.currentTarget.dataset.chengjiao == 0) {//别人订单未成交
      console.log(12312)
      this.renZpd('../orderDetail/orderDetail?id=' + e.currentTarget.dataset.orderid)
    } else if (e.currentTarget.dataset.userideve == 2 && e.currentTarget.dataset.chengjiao == 1) {//别人订单已成交
      wx.navigateTo({
        url: '../orderDetailEve/orderDetailEve?id=' + e.currentTarget.dataset.orderid,
      })
    }else if (e.currentTarget.dataset.userideve == 1 && e.currentTarget.dataset.chengjiao == 1) {//自己订单已成交
      wx.navigateTo({
        url: '../providerDetail/providerDetail?id=' + e.currentTarget.dataset.orderid,
      })
    } else if (e.currentTarget.dataset.userideve == 1 &&e.currentTarget.dataset.chengjiao == 0 && e.currentTarget.dataset.baojiais == 0) {
      wx.navigateTo({
        url: '../orderDetailEve/orderDetailEve?id=' + e.currentTarget.dataset.orderid,
      })
    } else if (e.currentTarget.dataset.userideve == 1 &&e.currentTarget.dataset.chengjiao == 0 && e.currentTarget.dataset.baojiais == 1 && e.currentTarget.dataset.selectbaojiais == 0) {
      wx.navigateTo({
        url: '../selectprovider/selectprovider?id=' + e.currentTarget.dataset.orderid,
      })
    } else if (e.currentTarget.dataset.userideve == 1 &&e.currentTarget.dataset.chengjiao == 0 && e.currentTarget.dataset.baojiais == 1 && e.currentTarget.dataset.selectbaojiais == 1) {
      wx.navigateTo({
        url: '../providerDetail/providerDetail?id=' + e.currentTarget.dataset.orderid,
      })
    }
  },
  // 自己订单三个操作
  toLookEve(e) {
    this.renZpd('../orderDetailEve/orderDetailEve?id=' + e.currentTarget.dataset.orderid)
    // wx.navigateTo({
    //   url: '../orderDetailEve/orderDetailEve?id=' + e.currentTarget.dataset.orderid,
    // })


  },
  toChoice(e) {
    this.renZpd('../selectprovider/selectprovider?id=' + e.currentTarget.dataset.orderid)
    // wx.navigateTo({
    //   url: '../selectprovider/selectprovider?id=' + e.currentTarget.dataset.orderid,
    // })
  },
  toChoiceEve(e) {
    this.renZpd('../providerDetail/providerDetail?id=' + e.currentTarget.dataset.orderid)
    // wx.navigateTo({
    //   url: '../providerDetail/providerDetail?id=' + e.currentTarget.dataset.orderid,
    // })
  },
  // 去报价
  toPrice(e) {
    this.renZpd('../orderDetail/orderDetail?id=' + e.currentTarget.dataset.orderid)
    // wx.navigateTo({
    //   url: '../orderDetail/orderDetail?id=' + e.currentTarget.dataset.orderid,
    // })
  },


  // 确认是否认证
  ifRenZ() {
    let that = this
    wx.request({
      url: app.globalData.domain + '/wuliu/login-refresh',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': wx.getStorageSync('cookie')
      },
      method: 'post',
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          app.globalData.userInfoDetail = res.data.data
          app.globalData.loginIf = 1
          that.setData({
            loginIf: app.globalData.loginIf
          })
          if (app.globalData.userInfoDetail.fuWuShangRenZhengIs == 0 && app.globalData.userInfoDetail.fuWuShangRenZhengTiJiaoIs == 0) {
            that.setData({
              show: true
            })
            return
          } else if (app.globalData.userInfoDetail.fuWuShangRenZhengIs == 0 && app.globalData.userInfoDetail.fuWuShangRenZhengTiJiaoIs == 1) {
            wx.showToast({
              title: '认证已提交审核，请等待',
              icon: 'none'
            })
            return
          } else if (app.globalData.userInfoDetail.fuWuShangRenZhengIs == 2 && app.globalData.userInfoDetail.fuWuShangRenZhengTiJiaoIs == 1) {
            wx.showToast({
              title: '认证已提交审核，请等待',
              icon: 'none'
            })
            return
          } else if (app.globalData.userInfoDetail.fuWuShangRenZhengIs == 2 && app.globalData.userInfoDetail.fuWuShangRenZhengTiJiaoIs == 0) {
            wx.showToast({
              title: app.globalData.userInfoDetail.fuWuShangRenZhengNote + '，请重新提交认证！',
              icon: 'none',
              duration: 1000,
              mask: true,
              complete: function complete(res) {
                setTimeout(function () {
                  that.setData({
                    show: true
                  })
                  return
                }, 1000);
              }
            });
          }
        }
      }
    })

  },
  renZpd(url) {
    let that = this
    if (app.globalData.userInfoDetail.fuWuShangRenZhengIs == 0 && app.globalData.userInfoDetail.fuWuShangRenZhengTiJiaoIs == 0) {
      that.setData({
        show: true
      })
      return
    } else if (app.globalData.userInfoDetail.fuWuShangRenZhengIs == 0 && app.globalData.userInfoDetail.fuWuShangRenZhengTiJiaoIs == 1) {
      wx.showToast({
        title: '认证已提交审核，请等待',
        icon: 'none'
      })
      return
    } else if (app.globalData.userInfoDetail.fuWuShangRenZhengIs == 2 && app.globalData.userInfoDetail.fuWuShangRenZhengTiJiaoIs == 1) {
      wx.showToast({
        title: '认证已提交审核，请等待',
        icon: 'none'
      })
      return
    } else if (app.globalData.userInfoDetail.fuWuShangRenZhengIs == 2 && app.globalData.userInfoDetail.fuWuShangRenZhengTiJiaoIs == 0) {
      wx.showToast({
        title: app.globalData.userInfoDetail.fuWuShangRenZhengNote + '，请重新提交认证！',
        icon: 'none',
        duration: 1000,
        mask: true,
        complete: function complete(res) {
          setTimeout(function () {
            that.setData({
              show: true
            })
            return
          }, 1000);
        }
      });
    } else {
      wx.navigateTo({
        url: url,
      })
    }
  },
  // 筛选条件选择
  screen() {
    this.setData({
      showIs: true,
      shows: false,
    })
  },
  bindRegionChange: function (e) {
    this.setData({
      picker: false
    })
    this.setData({
      region: e.detail.value,
      faHuoAreaId: e.detail.code[2],
    })
  },
  bindRegionChange2: function (e) {
    this.setData({
      pickers: false
    })
    this.setData({
      regions: e.detail.value,
      shouHuoAreaId: e.detail.code[2],

    })
  },
  bindPickerChange: function (e) {
    let orderSort = '', sort = '', chengJiaoIs = 0
    if (e.detail.value == 0) {
      orderSort = '';
      sort = '';
      chengJiaoIs = 0
      // } else if (e.detail.value == 1) {
      //   sort = '';
      //   order='';
      //   chengJiaoIs=0
    } else if (e.detail.value == 1) {
      orderSort = 'faHuoTime';
      sort = 'asc';
      chengJiaoIs = 0
    } else if (e.detail.value == 2) {
      orderSort = '';
      sort = '';
      chengJiaoIs = 1
    }
    this.setData({
      index: e.detail.value,
      indexs: e.detail.value,
      order: orderSort,
      sort: '',
      chengJiaoIs: chengJiaoIs,
      color: '#333'
    })
  },
  showClose() {
    this.setData({
      showIs: false,
    })
  },
  selectAgain() {
    this.setData({
      region: ['请选择地址'],
      regions: ['请选择地址'],
      picker: true,
      pickers: true,
      indexs: 0,
      index: 0,
      faHuoAreaId: '',
      shouHuoAreaId: '',
      order: '',
      sort: '',
      chengJiaoIs: 0
    })
  },
  makesure() {
    this.setData({
      showIs: false,
      orderList: []
    })
    this.lastPage('', this.data.chengJiaoIs, '', this.data.faHuoAreaId, this.data.shouHuoAreaId, this.data.orderSort, this.data.order, 1)
    this.lastPageNumber('', this.data.chengJiaoIs, '', this.data.faHuoAreaId, this.data.shouHuoAreaId)
  },
  // 点击下拉显示框
  selectTaps(e) {
    this.setData({
      shows: !this.data.shows,
    });
  },
  // 点击下拉列表
  optionTaps(e) {
    let sort = '', chengJiaoIs = 0, order = '';
    let Indexs = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    if (Indexs == 0) {
      chengJiaoIs = 0;
      sort = '';
      order = '';
      // } else if (Indexs == 1) {
      //   chengJiaoIs=0;
      //     sort = '';
      //   order='';
    } else if (Indexs == 1) {
      chengJiaoIs = 0;
      sort = 'faHuoTime';
      order = 'asc';
    } else if (Indexs == 2) {
      chengJiaoIs = 1;
      sort = '';
      order = '';
    }
    this.setData({
      indexs: Indexs,
      index: Indexs,
      shows: !this.data.shows,
      orderList: [],
      chengJiaoIs: chengJiaoIs,
      sort: sort,
      order: order,
    });
    this.lastPage('', chengJiaoIs, '', '', '', sort, order, 1)
    this.lastPageNumber('', chengJiaoIs, '', '', '')
  },
  lastPage(kw, chengJiaoIs, baoJiaIs, faHuoAreaId, shouHuoAreaId, sort, order, pageNo) {
    let that = this
    wx.request({
      url: app.globalData.domain + '/wuliu/order/order-list',
      data: {
        kw: kw,
        chengJiaoIs: chengJiaoIs,
        baoJiaIs: baoJiaIs,
        faHuoAreaId: faHuoAreaId,
        shouHuoAreaId: shouHuoAreaId,
        sort: sort,
        order: order,
        pn: pageNo,
        ps: 15
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
          for (var i in res.data.data.itemList) {
            if (res.data.data.itemList[i].userId == app.globalData.userInfoDetail.userId) {
              res.data.data.itemList[i].userIdEve = 1
            } else {
              res.data.data.itemList[i].userIdEve = 2
            }
            console.log(res.data.data.itemList[i].userIdEve)
            res.data.data.itemList[i].orderIdEve = res.data.data.itemList[i].orderId.slice(res.data.data.itemList[i].orderId.slice.length - 8, res.data.data.itemList[i].orderId.length)
            res.data.data.itemList[i].faHuoTime = res.data.data.itemList[i].faHuoTime.slice(0, 10)
            if (res.data.data.itemList[i].huoWuLeiXing == 1) {
              res.data.data.itemList[i].huoWuLeiXingName = '服装'
            } else if (res.data.data.itemList[i].huoWuLeiXing == 2) {
              res.data.data.itemList[i].huoWuLeiXingName = '食品'
            }
            if (res.data.data.itemList[i].xiangXing == 1) {
              res.data.data.itemList[i].xiangXingName = '木箱'
            } else if (res.data.data.itemList[i].xiangXing == 2) {
              res.data.data.itemList[i].xiangXingName = '纸箱'
            }
          }
          that.data.orderList.concat(res.data.data.itemList)
          var orderListArr = that.data.orderList;
          var neworderListArr = orderListArr.concat(res.data.data.itemList)
          that.setData({
            orderList: neworderListArr,
            pageNo: pageNo,
          })
          if (res.data.data.itemList && res.data.data.itemList.length < 15) {
            that.setData({
              listTitle: '数据已全部加载完成.'
            })
          } else {
            if (that.data.orderList.length == that.data.totalCount) {
              that.setData({
                listTitle: '数据已全部加载完成.'
              })
            } else {
              that.setData({
                listTitle: ''
              })
            }
          }

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
  lastPageNumber(kw, chengJiaoIs, baoJiaIs, faHuoAreaId, shouHuoAreaId) {
    let that = this
    wx.request({
      url: app.globalData.domain + '/wuliu/order/order-list-sum',
      data: {
        kw: kw,
        chengJiaoIs: chengJiaoIs,
        baoJiaIs: baoJiaIs,
        faHuoAreaId: faHuoAreaId,
        shouHuoAreaId: shouHuoAreaId
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
          that.setData({
            totalCount: res.data.data.itemCount
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      orderList: [],
      loginIf: app.globalData.loginIf
    })


    if (app.globalData.loginIf == 0) {
      wx.request({
        url: app.globalData.domain + '/wuliu/login-refresh',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          'cookie': wx.getStorageSync('cookie')
        },
        method: 'post',
        success: function (res) {
          wx.hideToast()
          if (res.data.code == 0) {
            app.globalData.userInfoDetail = res.data.data
            app.globalData.loginIf = 1
            that.setData({
              loginIf: app.globalData.loginIf
            })
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
    }
    // if(app.globalData.loginIf==1){
    //   this.lastPage('','','','','','','',1);
    //   this.lastPageNumber('','','','','')
    // }
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
    console.log(this.data.change)
    this.ifRenZ()
    this.setData({
      loginIf: app.globalData.loginIf
    })
    if (this.data.orderList && this.data.orderList.length == 0) {
      if (app.globalData.loginIf == 1) {
        this.lastPage('', this.data.chengJiaoIs, '', '', '', this.data.sort, this.data.order, 1);
        this.lastPageNumber('', this.data.chengJiaoIs, '', '', '')
      }
    }
    if (this.data.change == 1) {
      this.setData({
        orderList:[],
        change:0
      })
      this.lastPage('', this.data.chengJiaoIs, '', this.data.faHuoAreaId, this.data.shouHuoAreaId, this.data.orderSort, this.data.order, 1)
      this.lastPageNumber('', this.data.chengJiaoIs, '', this.data.faHuoAreaId, this.data.shouHuoAreaId)
    }
    // this.setData({
    //   show:false
    // })
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
    if (app.globalData.loginIf == 1) {
      this.setData({
        orderList: [],
        totalCount: 0,
        pageNo: 1,
        listTitle: '加载中.'
      })
      this.lastPage('', this.data.chengJiaoIs, '', this.data.faHuoAreaId, this.data.shouHuoAreaId, this.data.sort, this.data.order, 1)
      this.lastPageNumber('', this.data.chengJiaoIs, '', this.data.faHuoAreaId, this.data.shouHuoAreaId)
    }

    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (app.globalData.loginIf == 1) {
      var pageNo = this.data.pageNo + 1
      this.setData({
        listTitle: '正在载入更多.'
      })
      this.lastPage('', this.data.chengJiaoIs, '', this.data.faHuoAreaId, this.data.shouHuoAreaId, this.data.sort, this.data.order, pageNo)
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
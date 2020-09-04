// pages/orderList/orderList.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['全部', '已报价订单', '已完成订单'],
    currentTab: 0,
    listTitle: '',
    totalCount: '',
    orderList: [],
    pageNo: 1,
    listTitle1: '',
    totalCount1: '',
    orderList1: [],
    pageNo1: 1,
    listTitle2: '',
    totalCount2: '',
    orderList2: [],
    pageNo2: 1,
    change: 0,
    toTopShow:false
  },
  onPageScroll(e){
    if(e.scrollTop>200){
      this.setData({
        toTopShow:true
      })
    }else{
      this.setData({
        toTopShow:false
      })
    }
  },
  toTop(e){
    wx.pageScrollTo({
      scrollTop: 0
    })
  },
  // 导航栏切换
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
    })
    if (this.data.orderList.length == 0 && e.currentTarget.dataset.idx == 0) {
      this.lastPage('', '', 1)
    }
    if (this.data.orderList1.length == 0 && e.currentTarget.dataset.idx == 1) {
      this.lastPage(0, 1, 1)
    }
    if (this.data.orderList2.length == 0 && e.currentTarget.dataset.idx == 2) {
      this.lastPage(1, '', 1)
    }
  },
  toChoice(e) {
    wx.navigateTo({
      url: '../selectprovider/selectprovider?id=' + e.currentTarget.dataset.orderid,
    })
  },
  toChoiceEve(e) {
    wx.navigateTo({
      url: '../providerDetail/providerDetail?id=' + e.currentTarget.dataset.orderid,
    })
  },
  // 已完成订单跳转评价
  jumpThis(e) {
    if (e.currentTarget.dataset.chengjiao == 1) {
      wx.navigateTo({
        url: '../providerDetail/providerDetail?id=' + e.currentTarget.dataset.orderid,
      })
    }else  if (e.currentTarget.dataset.chengjiao == 0 &&e.currentTarget.dataset.baojiais==0){
      wx.navigateTo({
        url: '../orderDetailEve/orderDetailEve?id=' + e.currentTarget.dataset.orderid,
      })
    }else  if (e.currentTarget.dataset.chengjiao == 0 &&e.currentTarget.dataset.baojiais==1&&e.currentTarget.dataset.selectbaojiais==0){
      wx.navigateTo({
        url: '../selectprovider/selectprovider?id=' + e.currentTarget.dataset.orderid,
      })
    }else  if (e.currentTarget.dataset.chengjiao == 0 &&e.currentTarget.dataset.baojiais==1&&e.currentTarget.dataset.selectbaojiais==1){
      wx.navigateTo({
        url: '../providerDetail/providerDetail?id=' + e.currentTarget.dataset.orderid,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.lastPageNumber('', '')
    this.lastPageNumber(0, 1)
    this.lastPageNumber(1, '')
    this.lastPage('', '', 1)
  },
  firstPage(chengJiaoIs, baoJiaIs, pageNo) {
    let that = this
    wx.request({
      url: app.globalData.domain + '/wuliu/my/orders-sum',
      data: {
        chengJiaoIs: chengJiaoIs,
        baoJiaIs: baoJiaIs,
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
          if (baoJiaIs == 0 && chengJiaoIs == 0) {
            if (res.data.data.itemCount != that.data.totalCount) {
              that.data.navbar[0] = '全部(' + res.data.data.itemCount + ')'
            }
            that.setData({
              totalCount: res.data.data.itemCount,
              navbar: that.data.navbar
            })
          }
          if (baoJiaIs == 1) {
            if (res.data.data.itemCount != that.data.totalCount1) {
              that.data.navbar[1] = '已报价订单(' + res.data.data.itemCount + ')'
            }
            that.setData({
              totalCount1: res.data.data.itemCount,
              navbar: that.data.navbar
            })
          }
          if (chengJiaoIs == 1) {
            if (res.data.data.itemCount != that.data.totalCount2) {
              that.data.navbar[2] = '已完成订单(' + res.data.data.itemCount + ')'
            }
            that.setData({
              totalCount2: res.data.data.itemCount,
              navbar: that.data.navbar
            })
          }
          wx.request({
            url: app.globalData.domain + '/wuliu/my/orders',
            data: {
              chengJiaoIs: chengJiaoIs,
              baoJiaIs: baoJiaIs,
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
                for (var i in res.data.data.items) {
                  res.data.data.items[i].faHuoTime = res.data.data.items[i].faHuoTime.slice(0, 10)
                  res.data.data.items[i].orderIdEve = res.data.data.items[i].orderId.slice(res.data.data.items[i].orderId.slice.length-8, res.data.data.items[i].orderId.length)
                  if (res.data.data.items[i].huoWuLeiXing == 1) {
                    res.data.data.items[i].huoWuLeiXingName = '服装'
                  } else if (res.data.data.items[i].huoWuLeiXing == 2) {
                    res.data.data.items[i].huoWuLeiXingName = '食品'
                  }
                  if (res.data.data.items[i].xiangXing == 1) {
                    res.data.data.items[i].xiangXingName = '木箱'
                  } else if (res.data.data.items[i].xiangXing == 2) {
                    res.data.data.items[i].xiangXingName = '纸箱'
                  }
                }
                if (baoJiaIs == 0 && chengJiaoIs == 0) {
                  that.data.orderList.concat(res.data.data.items)
                  var orderListArr = that.data.orderList;
                  var neworderListArr = orderListArr.concat(res.data.data.items)
                  that.setData({
                    orderList: neworderListArr,
                    pageNo: pageNo,
                  })
                  if (res.data.data.items && res.data.data.items.length < 15) {
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
                }
                if (baoJiaIs == 1) {
                  that.data.orderList1.concat(res.data.data.items)
                  var orderListArr = that.data.orderList1;
                  var neworderListArr = orderListArr.concat(res.data.data.items)
                  that.setData({
                    orderList1: neworderListArr,
                    pageNo1: pageNo,
                  })
                  if (res.data.data.items && res.data.data.items.length < 15) {
                    that.setData({
                      listTitle1: '数据已全部加载完成.'
                    })
                  } else {
                    if (that.data.orderList1.length == that.data.totalCount1) {
                      that.setData({
                        listTitle1: '数据已全部加载完成.'
                      })
                    } else {
                      that.setData({
                        listTitle1: ''
                      })
                    }
                  }
                }
                if (chengJiaoIs == 1) {
                  that.data.orderList2.concat(res.data.data.items)
                  var orderListArr = that.data.orderList2;
                  var neworderListArr = orderListArr.concat(res.data.data.items)
                  that.setData({
                    orderList2: neworderListArr,
                    pageNo2: pageNo,
                  })
                  if (res.data.data.items && res.data.data.items.length < 15) {
                    that.setData({
                      listTitle2: '数据已全部加载完成.'
                    })
                  } else {
                    if (that.data.orderList2.length == that.data.totalCount2) {
                      that.setData({
                        listTitle2: '数据已全部加载完成.'
                      })
                    } else {
                      that.setData({
                        listTitle2: ''
                      })
                    }
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
  lastPage(chengJiaoIs, baoJiaIs, pageNo) {
    let that = this
    wx.request({
      url: app.globalData.domain + '/wuliu/my/orders',
      data: {
        chengJiaoIs: chengJiaoIs,
        baoJiaIs: baoJiaIs,
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
          for (var i in res.data.data.items) {
            res.data.data.items[i].faHuoTime = res.data.data.items[i].faHuoTime.slice(0, 10)
            res.data.data.items[i].orderIdEve = res.data.data.items[i].orderId.slice(res.data.data.items[i].orderId.slice.length-8, res.data.data.items[i].orderId.length)
            if (res.data.data.items[i].huoWuLeiXing == 1) {
              res.data.data.items[i].huoWuLeiXingName = '服装'
            } else if (res.data.data.items[i].huoWuLeiXing == 2) {
              res.data.data.items[i].huoWuLeiXingName = '食品'
            }
            if (res.data.data.items[i].xiangXing == 1) {
              res.data.data.items[i].xiangXingName = '木箱'
            } else if (res.data.data.items[i].xiangXing == 2) {
              res.data.data.items[i].xiangXingName = '纸箱'
            }
          }
          if (baoJiaIs == 0 && chengJiaoIs == 0) {
            that.data.orderList.concat(res.data.data.items)
            var orderListArr = that.data.orderList;
            var neworderListArr = orderListArr.concat(res.data.data.items)
            that.setData({
              orderList: neworderListArr,
              pageNo: pageNo,
            })
            if (res.data.data.items && res.data.data.items.length < 15) {
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
          }
          if (baoJiaIs == 1) {
            that.data.orderList1.concat(res.data.data.items)
            var orderListArr = that.data.orderList1;
            var neworderListArr = orderListArr.concat(res.data.data.items)
            that.setData({
              orderList1: neworderListArr,
              pageNo1: pageNo,
            })
            if (res.data.data.items && res.data.data.items.length < 15) {
              that.setData({
                listTitle1: '数据已全部加载完成.'
              })
            } else {
              if (that.data.orderList1.length == that.data.totalCount1) {
                that.setData({
                  listTitle1: '数据已全部加载完成.'
                })
              } else {
                that.setData({
                  listTitle1: ''
                })
              }
            }
          }
          if (chengJiaoIs == 1) {
            that.data.orderList2.concat(res.data.data.items)
            var orderListArr = that.data.orderList2;
            var neworderListArr = orderListArr.concat(res.data.data.items)
            that.setData({
              orderList2: neworderListArr,
              pageNo2: pageNo,
            })
            if (res.data.data.items && res.data.data.items.length < 15) {
              that.setData({
                listTitle2: '数据已全部加载完成.'
              })
            } else {
              if (that.data.orderList2.length == that.data.totalCount2) {
                that.setData({
                  listTitle2: '数据已全部加载完成.'
                })
              } else {
                that.setData({
                  listTitle2: ''
                })
              }
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
  lastPageNumber(chengJiaoIs, baoJiaIs) {
    let that = this
    wx.request({
      url: app.globalData.domain + '/wuliu/my/orders-sum',
      data: {
        chengJiaoIs: chengJiaoIs,
        baoJiaIs: baoJiaIs,
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
          if (baoJiaIs == 0 && chengJiaoIs == 0) {
            that.data.navbar[0] = '全部(' + res.data.data.itemCount + ')'
            that.setData({
              totalCount: res.data.data.itemCount,
              navbar: that.data.navbar
            })
          }
          if (baoJiaIs == 1) {
            that.data.navbar[1] = '已报价订单(' + res.data.data.itemCount + ')'
            that.setData({
              totalCount1: res.data.data.itemCount,
              navbar: that.data.navbar
            })
          }
          if (chengJiaoIs == 1) {
            that.data.navbar[2] = '已完成订单(' + res.data.data.itemCount + ')'
            that.setData({
              totalCount2: res.data.data.itemCount,
              navbar: that.data.navbar
            })
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.data.change == 1) {
      this.lastPageNumber('', '')
      this.lastPageNumber(0, 1)
      this.lastPageNumber(1, '')
      this.setData({
        orderList: [],
        pageNo: 1,
        listTitle: '',
        change: 0,
        orderList1: [],
        pageNo1: 1,
        listTitle1: '',
        orderList2: [],
        pageNo2: 1,
        listTitle2: '',
      })
      this.firstPage('', '', 1)
      this.firstPage(0, 1, 1)
      this.firstPage(1, '', 1)
      // if (this.data.currentTab == 0) {
      //   this.setData({
      //     orderList: [],
      //     pageNo: 1,
      //     listTitle: '',
      //     change: 0,
        
      //   })
      //   this.firstPage('', '', 1)
      // }
      // if (this.data.currentTab == 1) {
      //   this.setData({
      //     orderList1: [],
      //     pageNo1: 1,
      //     listTitle1: '',
      //     change: 0
      //   })
      //   this.firstPage(0, 1, 1)
      // }
      // if (this.data.currentTab == 2) {
      //   this.setData({
      //     orderList2: [],
      //     pageNo2: 1,
      //     listTitle2: '',
      //     change: 0
      //   })
      //   this.firstPage(1, '', 1)
      // }
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
    if (this.data.currentTab == 0) {
      this.setData({
        orderList: [],
        pageNo: 1,
        listTitle: '加载中.',
        // totalCount: 0,
      })
      this.firstPage('', '', 1)
      // this.lastPageNumber('','')
    }
    if (this.data.currentTab == 1) {
      this.setData({
        orderList1: [],
        pageNo1: 1,
        listTitle1: '加载中.',
        // totalCount1: 0
      })
      this.firstPage(0, 1, 1)
      // this.lastPageNumber(0,1)
    }
    if (this.data.currentTab == 2) {
      this.setData({
        orderList2: [],
        pageNo2: 1,
        listTitle2: '加载中.',
        // totalCount2: 0
      })
      this.firstPage(1, '', 1)
      // this.lastPageNumber(1,'')
    }
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.currentTab == 0) {
      this.setData({
        listTitle: '正在载入更多.'
      })
      this.lastPage('', '', this.data.pageNo + 1)
    }
    if (this.data.currentTab == 1) {
      this.setData({
        listTitleEve: '正在载入更多.'
      })
      this.lastPage(0, 1, this.data.pageNo1 + 1)
    }
    if (this.data.currentTab == 2) {
      this.setData({
        listTitleEve: '正在载入更多.'
      })
      this.lastPage(1, '', this.data.pageNo2 + 1)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
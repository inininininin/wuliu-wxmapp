// pages/shopping/shopping.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '集贤装物流',
    statusBarHeight: app.globalData.statusBarHeight,
    titleBarHeight: app.globalData.titleBarHeight,
    showIsIcon: false,
    orderList: [],
    totalCount: '0',
    navbar: ['已报价订单', '已完成订单', '已完成订单', '已完成订单1', '已完成订单2', '已完成订单2'],
    navbar: [{ 'name': '全部', 'type': '', 'value': [{ 'name': '全部', 'type': '' }] }, { 'name': '日用品', 'type': 1, 'value': [{ 'name': '全部', 'type': 11 }, { 'name': '电灯', 'type': 12 }] }, { 'name': '进口', 'type': 2, 'value': [{ 'name': '全部', 'type': 21 }, { 'name': '冰棍', 'type': 22 }] }, { 'name': '服装', 'type': 3, 'value': [{ 'name': '全部', 'type': 31 }, { 'name': '男装', 'type': 32 }, { 'name': '女装', 'type': 33 }] }, { 'name': '食品', 'type': 4, 'value': [{ 'name': '全部', 'type': 41 }, { 'name': '牛奶', 'type': 42 }, { 'name': '酸奶', 'type': 43 }, { 'name': '坚果', 'type': 44 }, { 'name': '肉', 'type': 45 }, { 'name': '膨化食品', 'type': 46 }, { 'name': '脱水蔬菜', 'type': 47 }, { 'name': '水果', 'type': 48 }] }, { 'name': '医药', 'type': 5, 'value': [{ 'name': '全部', 'type': 51 }, { 'name': '日用品', 'type': 52 }, { 'name': '医疗器械', 'type': 53 }] }, { 'name': '母婴', 'type': 6, 'value': [{ 'name': '全部', 'type': 61 }, { 'name': '奶粉', 'type': 62 }, { 'name': '衣服', 'type': 63 }] }, { 'name': '电器', 'type': 7, 'value': [{ 'name': '全部', 'type': 71 }, { 'name': '手机', 'type': 72 }, { 'name': '电脑', 'type': 73 }] }, { 'name': '配件', 'type': 8, 'value': [{ 'name': '全部', 'type': 81 }, { 'name': '五金', 'type': 82 }, { 'name': '水管', 'type': 83 }] }],
    currentTab: 0,
    navbarEve: [],
    currentTabEve: 0,
    type1Id: '',
    type2Id: '',
    kw: '',
    listTitle: '',
  },
  // 商品详情
  goodsdetail(e) {
    wx.navigateTo({
      url: '../goodsdetail/goodsdetail?id=' + e.currentTarget.dataset.id,
    })
  },
  // 关键字搜索
  searchKw: function (e) {
    if (e.detail.value) {

      this.setData({
        showIsIcon: true,
      })
    }
    this.setData({
      kw: e.detail.value,
    })
  },
  showIsIcon: function (e) {
    this.setData({
      showIsIcon: false,
      kw: '',
    })
  },
  searchThisEve: function (e) {
    this.setData({
      orderList: [],
      // totalCount: 0,
      pageNo: 1,
      listTitle: '加载中.'
    })
    this.firstPage(1)
    // this.lastPageNumber()
  },
  // 导航栏切换
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
      navbarEve: this.data.navbar[e.currentTarget.dataset.idx].value,
      currentTabEve: 0,
      type1Id: e.currentTarget.dataset.typeid,
      type2Id: this.data.navbar[e.currentTarget.dataset.idx].value[0].type,
      orderList: [],
      // totalCount: 0,
      pageNo: 1,
      listTitle: '加载中.'
    })
    this.firstPage(1)
    // this.lastPageNumber()
  },
  navbarTapEve: function (e) {
    this.setData({
      currentTabEve: e.currentTarget.dataset.idx,
      type2Id: e.currentTarget.dataset.typeid,
      orderList: [],
      // totalCount: 0,
      pageNo: 1,
      listTitle: '加载中.'
    })
    this.firstPage(1)
    // this.lastPageNumber()
  },
  // 去登陆
  gologinBtn(e) {
    wx.navigateTo({
      url: '../login/login?tabbarIs=1&route=' + getCurrentPages()[0].route,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navbarEve: this.data.navbar[0].value
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
    this.firstPage(1)
    // this.lastPageNumber()
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
    this.setData({
      loginIf: app.globalData.loginIf
    })
    // if (this.data.navbarEve && this.data.navbarEve.length == 0) {
    //   this.setData({
    //     navbarEve: this.data.navbar[0].value
    //   })
    // }

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
    // if (app.globalData.loginIf == 1) {
    this.setData({
      orderList: [],
      // totalCount: 0,
      pageNo: 1,
      listTitle: '加载中.'
    })
    this.firstPage(1)
    // this.lastPageNumber()
    // }

    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // if (app.globalData.loginIf == 1) {
    var pageNo = this.data.pageNo + 1
    this.setData({
      listTitle: '正在载入更多.'
    })
    this.lastPage(pageNo)
    // }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  firstPage(pageNo) {
    let that = this
    wx.request({
      url: app.globalData.domain + '/wuliu/goods/goodses-sum',
      data: {
        kw: that.data.kw,
        type1Id: that.data.type1Id,
        type2Id: that.data.type2Id,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': wx.getStorageSync('cookie')
      },
      method: 'post',
      success: function (res) {
        if (res.data.codeMsg && res.data.code != 20) {
          wx.showToast({
            title: res.data.codeMsg,
            icon: 'none'
          })
        }
        if (res.data.code == 0) {
          that.setData({
            totalCount: res.data.data.itemCount
          })
          wx.request({
            url: app.globalData.domain + '/wuliu/goods/goodses',
            data: {
              kw: that.data.kw,
              type1Id: that.data.type1Id,
              type2Id: that.data.type2Id,
              pn: pageNo,
              ps: 15
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
              'cookie': wx.getStorageSync('cookie')
            },
            method: 'post',
            success: function (res) {
              if (res.data.codeMsg && res.data.code != 20) {
                wx.showToast({
                  title: res.data.codeMsg,
                  icon: 'none'
                })
              }
              if (res.data.code == 0) {
                for (var i in res.data.data.items) {
                  res.data.data.items[i].cover = app.cover(res.data.data.items[i].cover)
                  if (res.data.data.items[i].xiaoGuiPrice && res.data.data.items[i].xiaoGuiPrice < 10000) {
                    res.data.data.items[i].xiaoGuiPrice = res.data.data.items[i].xiaoGuiPrice + '元'
                  } else if (res.data.data.items[i].xiaoGuiPrice && res.data.data.items[i].xiaoGuiPrice >= 10000) {
                    res.data.data.items[i].xiaoGuiPrice = res.data.data.items[i].xiaoGuiPrice / 10000 + '万元'
                  } else {
                    res.data.data.items[i].xiaoGuiPrice = ''
                  }
                  if (res.data.data.items[i].daGuiPrice && res.data.data.items[i].daGuiPrice < 10000) {
                    res.data.data.items[i].daGuiPrice = res.data.data.items[i].daGuiPrice + '元'
                  } else if (res.data.data.items[i].daGuiPrice && res.data.data.items[i].daGuiPrice >= 10000) {
                    res.data.data.items[i].daGuiPrice = res.data.data.items[i].daGuiPrice / 10000 + '万元'
                  } else {
                    res.data.data.items[i].daGuiPrice = ''
                  }
                  if (res.data.data.items[i].diyGuiPrice && res.data.data.items[i].diyGuiPrice < 10000) {
                    res.data.data.items[i].diyGuiPrice = res.data.data.items[i].diyGuiPrice + '元'
                  } else if (res.data.data.items[i].diyGuiPrice && res.data.data.items[i].diyGuiPrice >= 10000) {
                    res.data.data.items[i].diyGuiPrice = res.data.data.items[i].diyGuiPrice / 10000 + '万元'
                  } else {
                    res.data.data.items[i].diyGuiPrice = ''
                  }
                }
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

              } else if (res.data.code == 20) {
              }
            }
          })
        } else if (res.data.code == 20) {
        }
      }
    })
  },
  lastPage(pageNo) {
    let that = this
    wx.request({
      url: app.globalData.domain + '/wuliu/goods/goodses',
      data: {
        kw: that.data.kw,
        type1Id: that.data.type1Id,
        type2Id: that.data.type2Id,
        pn: pageNo,
        ps: 15
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': wx.getStorageSync('cookie')
      },
      method: 'post',
      success: function (res) {
        if (res.data.codeMsg && res.data.code != 20) {
          wx.showToast({
            title: res.data.codeMsg,
            icon: 'none'
          })
        }
        if (res.data.code == 0) {
          for (var i in res.data.data.items) {
            res.data.data.items[i].cover = app.cover(res.data.data.items[i].cover)
            if (res.data.data.items[i].xiaoGuiPrice && res.data.data.items[i].xiaoGuiPrice < 10000) {
              res.data.data.items[i].xiaoGuiPrice = res.data.data.items[i].xiaoGuiPrice + '元'
            } else {
              res.data.data.items[i].xiaoGuiPrice = res.data.data.items[i].xiaoGuiPrice / 10000 + '万元'
            }
            if (res.data.data.items[i].daGuiPrice && res.data.data.items[i].daGuiPrice < 10000) {
              res.data.data.items[i].daGuiPrice = res.data.data.items[i].daGuiPrice + '元'
            } else {
              res.data.data.items[i].daGuiPrice = res.data.data.items[i].daGuiPrice / 10000 + '万元'
            }
            if (res.data.data.items[i].diyGuiPrice && res.data.data.items[i].diyGuiPrice < 10000) {
              res.data.data.items[i].diyGuiPrice = res.data.data.items[i].diyGuiPrice + '元'
            } else {
              res.data.data.items[i].diyGuiPrice = res.data.data.items[i].diyGuiPrice / 10000 + '万元'
            }
          }
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

        } else if (res.data.code == 20) {
          // wx.showToast({
          //   title: '请先登录',
          //   icon: 'none',
          //   duration: 2000,
          //   mask: true,
          //   complete: function complete(res) {
          //     setTimeout(function () {
          //       wx.navigateTo({
          //         url: '../login/login',
          //       })
          //     }, 100);
          //   }
          // });
        }
      }
    })
  },
  lastPageNumber() {
    let that = this
    wx.request({
      url: app.globalData.domain + '/wuliu/goods/goodses-sum',
      data: {
        kw: that.data.kw,
        type1Id: that.data.type1Id,
        type2Id: that.data.type2Id,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': wx.getStorageSync('cookie')
      },
      method: 'post',
      success: function (res) {
        if (res.data.codeMsg && res.data.code != 20) {
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
          // wx.showToast({
          //   title: '请先登录',
          //   icon: 'none',
          //   duration: 2000,
          //   mask: true,
          //   complete: function complete(res) {
          //     setTimeout(function () {
          //       wx.navigateTo({
          //         url: '../login/login',
          //       })
          //     }, 100);
          //   }
          // });
        }
      }
    })
  },
})
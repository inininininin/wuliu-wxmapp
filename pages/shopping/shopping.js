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
    navbar: [{ 'name': '全部', 'typeId': '', 'value': [{ 'name': '全部', 'typeId': '' }] }],// [{ 'name': '全部', 'type': '', 'value': [{ 'name': '全部', 'type': '' }] }, { 'name': '日用品', 'type': 1, 'value': [{ 'name': '全部', 'type': 11 }] }],
    // navbar: [{ 'name': '全部', 'type': '', 'value': [{ 'name': '全部', 'type': '' }] }, { 'name': '日用品', 'type': 1, 'value': [{ 'name': '全部', 'type': 11 }, { 'name': '电灯', 'type': 12 }] }, { 'name': '进口', 'type': 2, 'value': [{ 'name': '全部', 'type': 21 }, { 'name': '冰棍', 'type': 22 }] }, { 'name': '服装', 'type': 3, 'value': [{ 'name': '全部', 'type': 31 }, { 'name': '男装', 'type': 32 }, { 'name': '女装', 'type': 33 }] }, { 'name': '食品', 'type': 4, 'value': [{ 'name': '全部', 'type': 41 }, { 'name': '牛奶', 'type': 42 }, { 'name': '酸奶', 'type': 43 }, { 'name': '坚果', 'type': 44 }, { 'name': '肉', 'type': 45 }, { 'name': '膨化食品', 'type': 46 }, { 'name': '脱水蔬菜', 'type': 47 }, { 'name': '水果', 'type': 48 }] }, { 'name': '医药', 'type': 5, 'value': [{ 'name': '全部', 'type': 51 }, { 'name': '日用品', 'type': 52 }, { 'name': '医疗器械', 'type': 53 }] }, { 'name': '母婴', 'type': 6, 'value': [{ 'name': '全部', 'type': 61 }, { 'name': '奶粉', 'type': 62 }, { 'name': '衣服', 'type': 63 }] }, { 'name': '电器', 'type': 7, 'value': [{ 'name': '全部', 'type': 71 }, { 'name': '手机', 'type': 72 }, { 'name': '电脑', 'type': 73 }] }, { 'name': '配件', 'type': 8, 'value': [{ 'name': '全部', 'type': 81 }, { 'name': '五金', 'type': 82 }, { 'name': '水管', 'type': 83 }] }],
    currentTab: 0,
    navbarEve: [],
    currentTabEve: 0,
    typeId: '',
    type1Id: '',
    kw: '',
    listTitle: '',
    toTopShow: false
  },
  onPageScroll(e) {
    if (e.scrollTop > 200) {
      this.setData({
        toTopShow: true
      })
    } else {
      this.setData({
        toTopShow: false
      })
    }
  },
  toTop(e) {
    wx.pageScrollTo({
      scrollTop: 0
    })
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
      typeId: e.currentTarget.dataset.typeid,
      type1Id: this.data.navbar[e.currentTarget.dataset.idx].value[0].typeId,
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
      type1Id: e.currentTarget.dataset.typeid,
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
  // var arr=[{num:1},{num:3},{num:2}]
 newSort:function(x,y) {
  return x.upperId-y.upperId;
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this

    wx.request({
      url: app.globalData.domain + '/wuliu/goods/types',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': wx.getStorageSync('cookie')
      },
      data: {
        // sort: 'level',
        // order: 'asc',
      },
      method: 'post',
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          // app.globalData.userInfoDetail = res.data.data
          // app.globalData.loginIf = 1
          let navbar = [{ 'name': '全部', 'typeId': '', 'value': [{ 'name': '全部', 'typeId': '' }] }]
          // for (var i in res.data.data.items) {
          //   if (res.data.data.items[i].level == 0) {
          //     res.data.data.items[i].value = [{'name':'全部','typeId':''}]
          //     navbar.push(res.data.data.items[i])
          //   } else if (res.data.data.items[i].level == 1) {
          //     console.log(navbar)
          //     let upperId = res.data.data.items[i].upperId
          //     for (var s in navbar) {
          //       if (upperId == navbar[s].typeId) {
          //         navbar[s].value.push(res.data.data.items[i])
          //       }
          //     }
          //   }
          // }
          res.data.data.items.sort(that.newSort)
          console.log(res.data.data.items)
          for (var i in res.data.data.items) {
            if (res.data.data.items[i].upperId == 0) {
              res.data.data.items[i].value = [{'name':'全部','typeId':''}]
              navbar.push(res.data.data.items[i])
            } else {
              let upperId = res.data.data.items[i].upperId
              for (var s in navbar) {
                if (upperId == navbar[s].typeId) {
                  navbar[s].value.push(res.data.data.items[i])
                }
              }
            }
          }

           
          console.log(navbar)
          that.setData({
            navbar: navbar,
            navbarEve: navbar[0].value,
            typeId: navbar[0].typeId,
            type1Id: navbar[0].value[0].typeId
          })
          console.log(that.data.typeId, that.data.type1Id)
          that.firstPage(1)
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
    var pageNo = parseInt(this.data.pageNo) + 1
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
    console.log(that.data.typeId, that.data.type1Id)
    wx.request({
      url: app.globalData.domain + '/wuliu/goods/goodses-sum',
      data: {
        kw: that.data.kw,
        typeId: that.data.typeId,
        type1Id: that.data.type1Id,
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
          console.log(res.data.data.itemCount)
          wx.request({
            url: app.globalData.domain + '/wuliu/goods/goodses',
            data: {
              kw: that.data.kw,
              typeId: that.data.typeId,
              type1Id: that.data.type1Id,
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
                console.log(Math.ceil(3.5555), Math.floor(3.555))
                for (var i in res.data.data.items) {
                  res.data.data.items[i].cover = app.cover(res.data.data.items[i].cover)
                  if (res.data.data.items[i].xiaoGuiPrice && res.data.data.items[i].xiaoGuiPrice < 10000) {
                    res.data.data.items[i].xiaoGuiPrice = res.data.data.items[i].xiaoGuiPrice + '元'
                  } else if (res.data.data.items[i].xiaoGuiPrice && res.data.data.items[i].xiaoGuiPrice >= 10000) {
                    res.data.data.items[i].xiaoGuiPrice = Math.floor(res.data.data.items[i].xiaoGuiPrice / 100) / 100 + '万元'

                  } else {
                    res.data.data.items[i].xiaoGuiPrice = ''
                  }
                  if (res.data.data.items[i].daGuiPrice && res.data.data.items[i].daGuiPrice < 10000) {
                    res.data.data.items[i].daGuiPrice = res.data.data.items[i].daGuiPrice + '元'
                  } else if (res.data.data.items[i].daGuiPrice && res.data.data.items[i].daGuiPrice >= 10000) {
                    res.data.data.items[i].daGuiPrice = Math.floor(res.data.data.items[i].daGuiPrice / 100) / 100 + '万元'
                  } else {
                    res.data.data.items[i].daGuiPrice = ''
                  }
                  if (res.data.data.items[i].diyGuiPrice && res.data.data.items[i].diyGuiPrice < 10000) {
                    res.data.data.items[i].diyGuiPrice = res.data.data.items[i].diyGuiPrice + '元'
                  } else if (res.data.data.items[i].diyGuiPrice && res.data.data.items[i].diyGuiPrice >= 10000) {
                    res.data.data.items[i].diyGuiPrice = Math.floor(res.data.data.items[i].diyGuiPrice / 100) / 100 + '万元'
                  } else {
                    res.data.data.items[i].diyGuiPrice = ''
                  }
                  if (res.data.data.items[i].jianPrice && res.data.data.items[i].jianPrice < 10000) {
                    res.data.data.items[i].jianPrice = res.data.data.items[i].jianPrice + '元'
                  } else if (res.data.data.items[i].jianPrice && res.data.data.items[i].jianPrice >= 10000) {
                    res.data.data.items[i].jianPrice = Math.floor(res.data.data.items[i].jianPrice / 100) / 100 + '万元'
                  } else {
                    res.data.data.items[i].jianPrice = ''
                  }
                  if (res.data.data.items[i].jinPrice && res.data.data.items[i].jinPrice < 10000) {
                    res.data.data.items[i].jinPrice = res.data.data.items[i].jinPrice + '元'
                  } else if (res.data.data.items[i].jinPrice && res.data.data.items[i].jinPrice >= 10000) {
                    res.data.data.items[i].jinPrice = Math.floor(res.data.data.items[i].jinPrice / 100) / 100 + '万元'
                  } else {
                    res.data.data.items[i].jinPrice = ''
                  }
                  // 重量
                  if (res.data.data.items[i].xiaoGuiWeight && res.data.data.items[i].xiaoGuiWeight < 1000) {
                    res.data.data.items[i].xiaoGuiWeight = res.data.data.items[i].xiaoGuiWeight + 'KG'
                  } else if (res.data.data.items[i].xiaoGuiWeight && res.data.data.items[i].xiaoGuiWeight >= 1000) {
                    res.data.data.items[i].xiaoGuiWeight = (res.data.data.items[i].xiaoGuiWeight / 1000).toFixed(1) + '吨'
                  } else {
                    res.data.data.items[i].xiaoGuiWeight = ''
                  }
                  if (res.data.data.items[i].diyGuiWeight && res.data.data.items[i].diyGuiWeight < 1000) {
                    res.data.data.items[i].diyGuiWeight = res.data.data.items[i].diyGuiWeight + 'KG'
                  } else if (res.data.data.items[i].diyGuiWeight && res.data.data.items[i].diyGuiWeight >= 1000) {
                    res.data.data.items[i].diyGuiWeight = (res.data.data.items[i].diyGuiWeight / 1000).toFixed(1) + '吨'
                  } else {
                    res.data.data.items[i].diyGuiWeight = ''
                  }
                  if (res.data.data.items[i].daGuiWeight && res.data.data.items[i].daGuiWeight < 1000) {
                    res.data.data.items[i].daGuiWeight = res.data.data.items[i].daGuiWeight + 'KG'
                  } else if (res.data.data.items[i].daGuiWeight && res.data.data.items[i].daGuiWeight >= 1000) {
                    res.data.data.items[i].daGuiWeight = (res.data.data.items[i].daGuiWeight / 1000).toFixed(1) + '吨'
                  } else {
                    res.data.data.items[i].daGuiWeight = ''
                  }
                }
                that.data.orderList.concat(res.data.data.items)
                var orderListArr = that.data.orderList;
                var neworderListArr = orderListArr.concat(res.data.data.items)
                that.setData({
                  orderList: neworderListArr,
                  pageNo: parseInt(pageNo),
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
        typeId: that.data.typeId,
        type1Id: that.data.type1Id,
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
        typeId: that.data.typeId,
        type1Id: that.data.type1Id,
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
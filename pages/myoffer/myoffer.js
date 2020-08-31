// pages/orderList/orderList.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['待确认订单', '已完成订单'],
    currentTab: 0,
    orderList: [],
    pageNo: 1,
    listTitle: '',
    totalCount: 0,
    orderListFinish: [],
    pageNoEve: 1,
    listTitleEve: '',
    totalCountEve: 0
  },
  // 订单详情
  detail(e){
    wx.navigateTo({
      url: '../orderDetailEve/orderDetailEve?id='+e.currentTarget.dataset.id,
    })
  },
  // 联系用户
  userphone(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.userphone || '',
    })
  },
  // 导航栏切换
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
    })
    if (this.data.orderListFinish.length == 0 && e.currentTarget.dataset.idx == 1) {
      this.lastPage(e.currentTarget.dataset.idx, '', '', 1)
    }
    if (this.data.orderList.length == 0 && e.currentTarget.dataset.idx == 0) {
      this.lastPage(e.currentTarget.dataset.idx, '', '', 1)
    }
  },
  // 首次加载
  firstPage(chengJiaoIs, sort, order, pageNo) {
    let that = this
    wx.request({
      url: app.globalData.url + '/wuliu/my/bao-jia-orders-sum',
      data: {
        chengJiaoIs: chengJiaoIs,
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
          if (chengJiaoIs == 0) {
            if(that.data.totalCount!=res.data.data.itemCount){
              that.data.navbar[0] = '待确认订单(' + res.data.data.itemCount + ')'
            }
            that.setData({
              totalCount: res.data.data.itemCount,
              navbar: that.data.navbar
            })
          } else {
            if(that.data.totalCountEve!=res.data.data.itemCount){
              that.data.navbar[1] = '已完成订单(' + res.data.data.itemCount + ')'
            }
            that.setData({
              totalCountEve: res.data.data.itemCount,
              navbar: that.data.navbar
            })
          }
          wx.request({
            url: app.globalData.url + '/wuliu/my/bao-jia-orders',
            data: {
              chengJiaoIs: chengJiaoIs,
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
                console.log(res.data.data.items)
                for (var i in res.data.data.items) {
                  res.data.data.items[i].faHuoTime = res.data.data.items[i].faHuoTime.slice(0, 10)
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
                that.data.orderList.concat(res.data.data.items)
                if (chengJiaoIs == 0) {
                  var orderListArr = that.data.orderList;
                  var neworderListArr = orderListArr.concat(res.data.data.items)
                  that.setData({
                    orderList: neworderListArr,
                    pageNo: pageNo,
                  })
                  if(res.data.data.items&&res.data.data.items.length<15){
                    that.setData({
                      listTitle: '数据已全部加载完成.'
                    })
                  }else{
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
                  
                } else {
                  var orderListArr = that.data.orderListFinish;
                  var neworderListArr = orderListArr.concat(res.data.data.items)
                  that.setData({
                    orderListFinish: neworderListArr,
                    pageNoEve: pageNo,
                  })
                  if(res.data.data.items&&res.data.data.items.length<15){
                    that.setData({
                      listTitleEve: '数据已全部加载完成.'
                    })
                  }else{
                    if (that.data.orderListFinish.length == that.data.totalCountEve) {
                      that.setData({
                        listTitleEve: '数据已全部加载完成.'
                      })
                    } else {
                      that.setData({
                        listTitleEve: ''
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
  //  分页
  lastPage(chengJiaoIs, sort, order, pageNo) {
    let that = this
    wx.request({
      url: app.globalData.url + '/wuliu/my/bao-jia-orders',
      data: {
        chengJiaoIs: chengJiaoIs,
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
          console.log(res.data.data.items)
          for (var i in res.data.data.items) {
            res.data.data.items[i].faHuoTime = res.data.data.items[i].faHuoTime.slice(0, 10)
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
          that.data.orderList.concat(res.data.data.items)
          if (chengJiaoIs == 0) {
            var orderListArr = that.data.orderList;
            var neworderListArr = orderListArr.concat(res.data.data.items)
            that.setData({
              orderList: neworderListArr,
              pageNo: pageNo,
            })
            if(res.data.data.items&&res.data.data.items.length<15){
              that.setData({
                listTitle: '数据已全部加载完成.'
              })
            }else{
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
            
          } else {
            var orderListArr = that.data.orderListFinish;
            var neworderListArr = orderListArr.concat(res.data.data.items)
            that.setData({
              orderListFinish: neworderListArr,
              pageNoEve: pageNo,
            })
            if(res.data.data.items&&res.data.data.items.length<15){
              that.setData({
                listTitleEve: '数据已全部加载完成.'
              })
            }else{
              if (that.data.orderListFinish.length == that.data.totalCountEve) {
                that.setData({
                  listTitleEve: '数据已全部加载完成.'
                })
              } else {
                that.setData({
                  listTitleEve: ''
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
  lastPageNumber(chengJiaoIs) {
    let that = this
    wx.request({
      url: app.globalData.url + '/wuliu/my/bao-jia-orders-sum',
      data: {
        chengJiaoIs: chengJiaoIs,
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
          if (chengJiaoIs == 0) {
            that.data.navbar[0] = '待确认订单(' + res.data.data.itemCount + ')'
            that.setData({
              totalCount: res.data.data.itemCount,
              navbar: that.data.navbar
            })
          } else {
            that.data.navbar[1] = '已完成订单(' + res.data.data.itemCount + ')'
            that.setData({
              totalCountEve: res.data.data.itemCount,
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.lastPageNumber(0);
    this.lastPageNumber(1);
    this.lastPage(0, '', '', 1);
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
    if ( this.data.currentTab == 0) {
      this.setData({
        orderList: [],
        pageNo: 1,
        listTitle: '加载中.',
      })
      this.firstPage(this.data.currentTab, '', '', 1)
    }
    if ( this.data.currentTab == 1) {
      this.setData({
        orderListFinish: [],
        pageNoEve: 1,
        listTitleEve: '加载中.',
      })
      this.firstPage(this.data.currentTab, '', '', 1)
    }
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if ( this.data.currentTab == 0) {
      this.setData({
        listTitle: '正在载入更多.'
      })
      this.lastPage(this.data.currentTab, '', '', this.data.pageNo+1)
    }
    if ( this.data.currentTab == 1) {
      this.setData({
        listTitleEve: '正在载入更多.'
      })
      this.lastPage(this.data.currentTab, '', '', this.data.pageNoEve+1)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
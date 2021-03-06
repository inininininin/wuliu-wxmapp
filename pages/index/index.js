// page/index/index.js
const app = getApp()
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navtitle: '集贤装物流',
    statusBarHeight: app.globalData.statusBarHeight,
    titleBarHeight: app.globalData.titleBarHeight,
    articleList: [],
    totalCount: '0',
    loginIf: '0',
    listTitle: '',
    show:false,
    show1:false,
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
  // 关闭弹窗
  closePop(e){
    this.setData({
      show:false,
      show1:false,
    })
  },
  // 去认证
  goRecognize(e){
    this.setData({
      show:false,
      show1:false
    })
    wx.navigateTo({
      url: '../recognize/recognize',
    })
  },
  // 服务商认证
  goRecognizeZZ(e){
    this.setData({
      show1: false
    })
    wx.navigateTo({
      url: '../recognizeSh/recognizeSh?type=0',
    })
  },
  // 查看行业详情
  articleDetail(e){
    wx.navigateTo({
      url: '../articleDetail/articleDetail?id='+e.currentTarget.dataset.id,
    })
  },  
  // 发布订单
  sendorder() {
    let that=this
    if (app.globalData.loginIf == 1) {
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
            if (app.globalData.userInfoDetail.renZhengIs==0&&app.globalData.userInfoDetail.renZhengTiJiaoIs==0) {
              that.setData({
                show:true
              })
              return
            }else  if (app.globalData.userInfoDetail.renZhengIs==0&&app.globalData.userInfoDetail.renZhengTiJiaoIs==1) {
              wx.showToast({
                title: '认证已提交审核，请等待',
                icon: 'none'
              })
              return
            }else if (app.globalData.userInfoDetail.renZhengIs == 2 && app.globalData.userInfoDetail.renZhengTiJiaoIs == 1){
              wx.showToast({
                title: '认证已提交审核，请等待',
                icon: 'none'
              })
              return
            } else if(app.globalData.userInfoDetail.renZhengIs==2&&app.globalData.userInfoDetail.renZhengTiJiaoIs==0){
              wx.showToast({
                title: app.globalData.userInfoDetail.renZhengNote+'，请重新提交认证！',
                icon: 'none',
                duration: 1000,
                mask: true,
                complete: function complete(res) {
                  setTimeout(function () {
                    that.setData({
                      show:true
                    })
                    return
                  }, 1000);
                }
              });
            }else{
              wx.navigateTo({
                url: '../publishorder/publishorder',
              })
            }
          } 
        }
      })
      
      
    } else {
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

  },
  baojia() {
    let that = this
    if (app.globalData.userInfoDetail.fuWuShangRenZhengIs == 0 && app.globalData.userInfoDetail.fuWuShangRenZhengTiJiaoIs == 0) {
      that.setData({
        show1: true
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
              show1: true
            })
            return
          }, 1000);
        }
      });
    } else {
      wx.switchTab({
        url: '../orderList/orderList',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.firstPage(1)
    this.setData({
      loginIf:app.globalData.loginIf
    })
    // console.log(getApp().globalData.statusBarHeight)
    // this.lastPage(1)
    // this.lastPageNumber()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  firstPage(pageNo){
    let that = this
  
    wx.request({
      url: app.globalData.domain + '/wuliu/article/article-list-sum',
      data: {},
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
            url: app.globalData.domain + '/wuliu/article/article-list',
            data: {
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
                for (var i in res.data.data.itemList) {
                  res.data.data.itemList[i].updateTime = res.data.data.itemList[i].updateTime.slice(2, 16)
                  res.data.data.itemList[i].cover = app.cover(res.data.data.itemList[i].cover)
                }
                let newListArr, listArr
                if (res.data.data.itemList && res.data.data.itemList.length != 0) {
                  that.data.articleList.concat(res.data.data.itemList)
                  listArr = that.data.articleList;
                  newListArr = listArr.concat(res.data.data.itemList)
                } else {
                  newListArr = that.data.articleList;
                }
                that.setData({
                  articleList: newListArr,
                  pageNo: parseInt(pageNo),
                })
                if (res.data.data.itemList && res.data.data.itemList.length < 15) {
                  that.setData({
                    listTitle: '数据已全部加载完成.'
                  })
                } else {
                  if (that.data.articleList.length == that.data.totalCount) {
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
      url: app.globalData.domain + '/wuliu/article/article-list',
      data: {
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
          for (var i in res.data.data.itemList) {
            res.data.data.itemList[i].updateTime = res.data.data.itemList[i].updateTime.slice(2, 16)
            res.data.data.itemList[i].cover = app.cover(res.data.data.itemList[i].cover)
          }
          let newListArr, listArr
          if (res.data.data.itemList && res.data.data.itemList.length != 0) {
            that.data.articleList.concat(res.data.data.itemList)
            listArr = that.data.articleList;
            newListArr = listArr.concat(res.data.data.itemList)
          } else {
            newListArr = that.data.articleList;
          }
          that.setData({
            articleList: newListArr,
            pageNo: parseInt(pageNo),
          })
          if (res.data.data.itemList && res.data.data.itemList.length < 15) {
            that.setData({
              listTitle: '数据已全部加载完成.'
            })
          } else {
            if (that.data.articleList.length == that.data.totalCount) {
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
  },
  lastPageNumber() {
    let that = this
    wx.request({
      url: app.globalData.domain + '/wuliu/article/article-list-sum',
      data: {},
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
         
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if( app.globalData.loginIf==0){
      this.loginRdfresh()
    }
  },
  loginRdfresh(){
    let that=this
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
        articleList: [],
        // totalCount: 0,
        pageNo: 1,
        listTitle: '加载中.'
      })
      this.firstPage(1)
      // this.lastPageNumber()
      // this.lastPage(1)
    }
    this.loginRdfresh()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(app.globalData.loginIf)
    if(app.globalData.loginIf==1){
      var pageNo=parseInt(this.data.pageNo)+1
      this.setData({
        listTitle:'正在载入更多.'
      })
      this.lastPage(pageNo)
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 后期不一定需要的代码
  // 去登陆
  gologinBtn(e) {
    wx.navigateTo({
      url: '../login/login?tabbarIs=1&route=' + getCurrentPages()[0].route,
    })
  },
})
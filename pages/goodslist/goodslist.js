// pages/goodslist/goodslist.js
var app = getApp()
var utils = require('../../utils/util.js');
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleList: [],
    totalCount: '0',
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.firstPage(1)
  },
 firstPage(pageNo){
    let that = this
  
    wx.request({
      url: app.globalData.domain + '/wuliu/orders-sum',
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
            totalCount: res.data.data.count
          })
          wx.request({
            url: app.globalData.domain + '/wuliu/orders',
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
                for (var i in res.data.data.items) {
                  if(res.data.data.items[i].money)
                  res.data.data.items[i].money=res.data.data.items[i].money>=10000?parseInt(res.data.data.items[i].money/10000).toFixed(2)+'万元':res.data.data.items[i].money+'元'
                  res.data.data.items[i].createTime = res.data.data.items[i].createTime.slice(2, 16)
                  res.data.data.items[i].details[0].cover = app.cover(res.data.data.items[i].details[0].cover)
                }
                let newListArr, listArr
                if (res.data.data.items && res.data.data.items.length != 0) {
                  that.data.articleList.concat(res.data.data.items)
                  listArr = that.data.articleList;
                  newListArr = listArr.concat(res.data.data.items)
                } else {
                  newListArr = that.data.articleList;
                }
                that.setData({
                  articleList: newListArr,
                  pageNo: parseInt(pageNo),
                })
                if (res.data.data.items && res.data.data.items.length < 15) {
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
                console.log(that.data.articleList)
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
      url: app.globalData.domain + '/wuliu/orders',
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
          for (var i in res.data.data.items) {
            res.data.data.items[i].money=res.data.data.items[i].money>=10000?parseInt(res.data.data.items[i].money/10000).toFixed(2)+'万元':res.data.data.items[i].money+'元'
            res.data.data.items[i].createTime = res.data.data.items[i].createTime.slice(2, 16)
            res.data.data.items[i].details[0].cover = app.cover(res.data.data.items[i].details[0].cover)
          }
          let newListArr, listArr
          if (res.data.data.items && res.data.data.items.length != 0) {
            that.data.articleList.concat(res.data.data.items)
            listArr = that.data.articleList;
            newListArr = listArr.concat(res.data.data.items)
          } else {
            newListArr = that.data.articleList;
          }
          that.setData({
            articleList: newListArr,
            pageNo: parseInt(pageNo),
          })
          if (res.data.data.items && res.data.data.items.length < 15) {
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
      url: app.globalData.domain + '/wuliu/orders-sum',
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
            totalCount: res.data.data.count
          })
        } else if (res.data.code == 20) {
         
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

  }
})
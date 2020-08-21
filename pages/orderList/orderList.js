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
    loginIf:'',
    selectDatas: ['全部订单', '最新订单', '临近发货日期', '已成交订单'], //下拉列表的数据
    indexs: 0, //选择的下拉列 表下标,
    orderList: [],
    index: 0,
    picker: true,
    pickers: true,
    region: ['请选择地址'],
    regions: ['请选择地址'],
    showIs: false,//弹窗是否弹出
    orderSort:'',
    faHuoAreaId:'',
    shouHuoAreaId:'',
    totalCount:'0',
    pageNo:'',
    listTitle:''
  },
  // 去登陆
  gologinBtn(e){
    wx.navigateTo({
      url: '../login/login?tabbarIs=1&route='+getCurrentPages()[0].route,
    })
  },
// 去报价
toPrice(e){
  wx.navigateTo({
    url: '../orderDetail/orderDetail?id='+e.currentTarget.dataset.orderid,
  })
},  
  // 筛选条件选择
  screen() {
    this.setData({
      showIs: true
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
      shouHuoAreaId:e.detail.code[2],
     
    })
  },
  bindPickerChange: function (e) {
    let orderSort=''
    if (e.detail.value == 0) {
      orderSort = ''
    } else if (e.detail.value == 1) {
      orderSort = 'updateTime'
    } else if (e.detail.value == 2) {
      orderSort = 'faHuoTime'
    }else if (e.detail.value == 3) {
      orderSort = 'chengJiaoIs'
    }
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      orderSort:orderSort
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
      faHuoAreaId:'',
      shouHuoAreaId:'',
      orderSort:''
    })
  },
  makesure() {
    this.setData({
      showIs: false,
      orderList:[]
    })
    this.lastPage('','','',this.data.faHuoAreaId,this.data.shouHuoAreaId,this.data.orderSort,'asc',1)
    this.lastPageNumber('','','',this.data.faHuoAreaId,this.data.shouHuoAreaId)
  },
  // 点击下拉显示框
  selectTaps(e) {
    this.setData({
      shows: !this.data.shows,
    });
  },
  // 点击下拉列表
  optionTaps(e) {
    let sort=''
    let Indexs = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    if (Indexs == 0) {
      sort = ''
    } else if (Indexs == 1) {
      sort = 'updateTime'
    } else if (Indexs == 2) {
      sort = 'faHuoTime'
    }else if (Indexs == 3) {
      sort = 'chengJiaoIs'
    }
    this.setData({
      indexs: Indexs,
      shows: !this.data.shows,
      orderList:[],
    });
    this.lastPage('','','','','',sort,'asc',1)
    this.lastPageNumber('','','','','')
  },
   lastPage(kw,chengJiaoIs,baoJiaIs,faHuoAreaId,shouHuoAreaId,sort,order,pageNo){
     let that=this
    wx.request({
      url: app.globalData.url+'/wuliu/order/order-list',
      data:{
        kw: kw,
        chengJiaoIs:chengJiaoIs,
        baoJiaIs:baoJiaIs,
        faHuoAreaId:faHuoAreaId,
        shouHuoAreaId:shouHuoAreaId,
        sort:sort,
        order:order,
        pn:pageNo,
        ps:15
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': wx.getStorageSync('cookie')
      },
      method: 'post',
      success:function(res){
        if(res.data.codeMsg){
          wx.showToast({
            title: res.data.codeMsg,
            icon:'none'
          })
        }
        if(res.data.code==0){
          console.log(res.data.data.itemList)
          for(var i in res.data.data.itemList){
            res.data.data.itemList[i].faHuoTime=res.data.data.itemList[i].faHuoTime.slice(0,10)
            if(res.data.data.itemList[i].huoWuLeiXing==1){
              res.data.data.itemList[i].huoWuLeiXingName='服装'
            }else if(res.data.data.itemList[i].huoWuLeiXing==2){
              res.data.data.itemList[i].huoWuLeiXingName='食品'
            }
            if(res.data.data.itemList[i].xiangXing==1){
              res.data.data.itemList[i].xiangXingName='木箱'
            }else if(res.data.data.itemList[i].xiangXing==2){
              res.data.data.itemList[i].xiangXingName='纸箱'
            }
          }
          that.data.orderList.concat(res.data.data.itemList)
          var orderListArr = that.data.orderList;
          var neworderListArr = orderListArr.concat(res.data.data.itemList)
          that.setData({
            orderList:neworderListArr,
            pageNo:pageNo,
          })
          if(that.data.orderList.length==that.data.totalCount){
            that.setData({
              listTitle:'数据已全部加载完成.'
            })
          }else{
            that.setData({
              listTitle:'.'
            })
          }
        }else if(res.data.code==20){
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
  lastPageNumber(kw,chengJiaoIs,baoJiaIs,faHuoAreaId,shouHuoAreaId){
    let that=this
   wx.request({
     url: app.globalData.url+'/wuliu/order/order-list-sum',
     data:{
       kw: kw,
       chengJiaoIs:chengJiaoIs,
       baoJiaIs:baoJiaIs,
       faHuoAreaId:faHuoAreaId,
       shouHuoAreaId:shouHuoAreaId
     },
     header: {
       "Content-Type": "application/x-www-form-urlencoded",
       'cookie': wx.getStorageSync('cookie')
     },
     method: 'post',
     success:function(res){
       if(res.data.codeMsg){
         wx.showToast({
           title: res.data.codeMsg,
           icon:'none'
         })
       }
       if(res.data.code==0){
         that.setData({
          totalCount:res.data.data.itemCount
         })
       }else if(res.data.code==20){
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
    this.setData({
      orderList:[],
      loginIf:app.globalData.loginIf
    })
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
    console.log(this.data.orderList,this.data.orderList.length)
    this.setData({
      loginIf:app.globalData.loginIf
    })
    if(this.data.orderList&&this.data.orderList.length==0){
      if(app.globalData.loginIf==1){
        this.lastPage('','','','','','','',1);
        this.lastPageNumber('','','','','')
      }
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
    if(app.globalData.loginIf==1){
      this.setData({
        orderList:[],
        totalCount:0,
        pageNo:1,
        listTitle:'加载中.'
      })
      this.lastPage('','','',this.data.faHuoAreaId,this.data.shouHuoAreaId,this.data.orderSort,'asc',1)
      this.lastPageNumber('','','',this.data.faHuoAreaId,this.data.shouHuoAreaId)
    }
    
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(app.globalData.loginIf==1){
      var pageNo=this.data.pageNo+1
      console.log(this.data.pageNo,pageNo)
      this.setData({
        listTitle:'正在载入更多.'
      })
      this.lastPage('','','',this.data.faHuoAreaId,this.data.shouHuoAreaId,this.data.orderSort,'asc',pageNo)
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
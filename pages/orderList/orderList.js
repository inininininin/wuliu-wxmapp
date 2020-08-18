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
    selectDatas: ['全部订单', '最新订单', '临近发货日期', '已成交订单'], //下拉列表的数据
    indexs: 0, //选择的下拉列 表下标,
    orderList: [{}, {}, {}, {}],
    index: 0,
    picker: true,
    pickers: true,
    region: ['请选择地址'],
    regions: ['请选择地址'],
    showIs: false,//弹窗是否弹出
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
      area1Id: e.detail.code[2].substring(0, 2),
      area2Id: e.detail.code[2].substring(0, 4),
      area3Id: e.detail.code[2],
      area1Name: e.detail.value[0],
      area2Name: e.detail.value[1],
      area3Name: e.detail.value[2],
    })
  },
  bindRegionChange2: function (e) {
    this.setData({
      pickers: false
    })

    this.setData({
      regions: e.detail.value,
      area1Id: e.detail.code[2].substring(0, 2),
      area2Id: e.detail.code[2].substring(0, 4),
      area3Id: e.detail.code[2],
      area1Name: e.detail.value[0],
      area2Name: e.detail.value[1],
      area3Name: e.detail.value[2],
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  selectAgain() {
    this.setData({
      region: ['请选择地址'],
      regions: ['请选择地址'],
      picker: true,
      pickers: true,
      indexs: 0
    })
  },
  makesure() {
    this.setData({
      showIs: false
    })
  },
  // 点击下拉显示框
  selectTaps() {
    this.setData({
      shows: !this.data.shows,
    });
  },
  // 点击下拉列表
  optionTaps(e) {
    var status
    let Indexs = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    if (Indexs == 0) {
      status = ''
    } else if (Indexs == 1) {
      status = '1'
    } else if (Indexs == 2) {
      status = '4'
    }
    this.setData({
      indexs: Indexs,
      shows: !this.data.shows,
      status: status,
      list1: []
    });
    this.lastPage(0, status, this.data.clinicId)
  },
   lastPage(kw,chengJiaoIs,baoJiaIs,faHuoAreaId,shouHuoAreaId,sort,order,pn){
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
        pn:pn,
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
          that.setData({
            orderList:res.data.data
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
      // data:'kw='+kw+'&chengJiaoIs='+chengJiaoIs+'&chengJiaoIs='+chengJiaoIs+'&faHuoAreaId='+faHuoAreaId+'&shouHuoAreaId='+shouHuoAreaId+'&sort='+sort+'&order='+order+'&pn='+pageNo+'&ps=15'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.lastPage('','','','','','','',1)
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
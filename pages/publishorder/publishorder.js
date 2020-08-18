// pages/publishorder/publishorder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picker:true,
    region: ['请选择发货地址：省-市-区'],
    faaddress2:'',
    date: '请选择发货日期',
    colorTime:'#999999',
    getAddressList:[{}],
    itemsOne: [
      {value: '1', name: '小柜', checked: 'true'},
      {value: '2', name: '大柜'},
      {value: '3', name: '冷柜'},
    ],
    itemsOne1: [
      {value: '1', name: '短板', checked: 'true'},
      {value: '2', name: '短板自卸'},
      {value: '3', name: '一组'},
    ],
    itemsOne2: [
      {value: '1', name: '平箱', checked: 'true'},
      {value: '2', name: '高箱'},
    ],
    itemsOne3: [
      {value: '1', name: '小柜', checked: 'true'},
      {value: '2', name: '大柜'},
    ],
    showIf:1,
    array1: ['请选择箱型','20小箱', '40大箱', '40高箱', '45高箱'],
    index1:0,
    array2: ['请选择功能','普通', '短板', '短板自卸', '冷柜','开顶','罐式','脚架折叠','板框折叠','挂衣'],
    index2:0,
    array3: ['请选择单位','一个', '一组', '十个'],
    index3:0,
    
  },
 
  xxrequire: function(e) {
    this.setData({
      index1: e.detail.value
    })
  },
  gnrequire: function(e) {
    this.setData({
      index2: e.detail.value
    })
  },
  xsrequire: function(e) {
    this.setData({
      index3: e.detail.value
    })
  },
  selectBz(e) {
    const itemsOne = this.data.itemsOne
    for (let i = 0, len = items.length; i < len; ++i) {
      itemsOne[i].checked = itemsOne[i].value === e.detail.value
    }
    this.setData({
      itemsOneitemsOne
    })
  },
 // 筛选条件选择
 bindDateChange: function(e) {
  console.log('picker发送选择改变，携带值为', e.detail.value)
  this.setData({
    date: e.detail.value,
    colorTime:'#333333'
  })
},
 bindRegionChange: function (e) {
  this.setData({
    picker:false
  })
 
  this.setData({
    region: e.detail.value,
    area1Id:e.detail.code[2].substring(0,2),
    area2Id:e.detail.code[2].substring(0,4),
    area3Id:e.detail.code[2],
    area1Name:e.detail.value[0],
    area2Name:e.detail.value[1],
    area3Name:e.detail.value[2],
  })
},

// 发布订单
send(){
  wx.reLaunch({
    url: '../orderList/orderList',
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
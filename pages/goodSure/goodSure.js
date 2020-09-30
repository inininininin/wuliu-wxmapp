// pages/goodSure/goodSure.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array3: ['请选择', '个', '组'],
    index3: 0,
    picker: true,
    region: ['请选择发货地址：省-市-区'],
    getAddressList: { 'shouHuoArea1Id': '', 'shouHuoArea1Name': '', 'shouHuoArea2Id': '', 'shouHuoArea2Name': '', 'shouHuoArea3Id': '', 'shouHuoArea3Name': '', 'shouHuoAddress': '' },
  },
  faaddress1: function (e) {
    console.log(e.detail.value,this.data.picker)
    this.data.getAddressList.shouHuo1Area1Id = e.detail.code[2].substring(0, 2);
    this.data.getAddressList.shouHuo1Area2Id = e.detail.code[2].substring(0, 4);
    this.data.getAddressList.shouHuo1Area3Id = e.detail.code[2];
    this.data.getAddressList.shouHuo1Area1Name = e.detail.value[0];
    this.data.getAddressList.shouHuo1Area2Name = e.detail.value[1];
    this.data.getAddressList.shouHuo1Area3Name = e.detail.value[2];
    this.setData({
      getAddressList: this.data.getAddressList,
      picker:false,
      region:e.detail.value
    })
  },
  // 商品规格
  goodgg: function (e) {
    let xiangShu = ''
    for (var i in this.data.array3) {
      if (i == e.detail.value) {
        xiangShu = this.data.array3[i]
      }
    }
    this.setData({
      index3: e.detail.value,
      xiangShu: xiangShu == '请选择' ? '' : e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    let that = this
    that.setData({
      id: id
    })
    wx.request({
      url: app.globalData.domain + '/wuliu/goods/goods-info',
      method: 'post',
      data: {
        goodsId: id,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': wx.getStorageSync('cookie')
      },
      async: true,
      success: function (res) {
        if (res.data.code == 0) {
          let array3=['请选择']
          res.data.data.cover = app.cover(res.data.data.cover)
          res.data.data.updateTime = res.data.data.updateTime.slice(2, 16)
          res.data.data.insertTime = res.data.data.insertTime.slice(2, 16)
          if (res.data.data.xiaoGuiPrice && res.data.data.xiaoGuiPrice < 10000) {
            res.data.data.xiaoGuiPrice = res.data.data.xiaoGuiPrice + '元'
          } else if (res.data.data.xiaoGuiPrice && res.data.data.xiaoGuiPrice >= 10000) {
            res.data.data.xiaoGuiPrice = res.data.data.xiaoGuiPrice / 10000 + '万元'
          } else {
            res.data.data.xiaoGuiPrice = ''
          }
          if (res.data.data.daGuiPrice && res.data.data.daGuiPrice < 10000) {
            res.data.data.daGuiPrice = res.data.data.daGuiPrice + '元'
          } else if (res.data.data.daGuiPrice && res.data.data.daGuiPrice >= 10000) {
            res.data.data.daGuiPrice = res.data.data.daGuiPrice / 10000 + '万元'
          } else {
            res.data.data.daGuiPrice = ''
          }
          if (res.data.data.diyGuiPrice && res.data.data.diyGuiPrice < 10000) {
            res.data.data.diyGuiPrice = res.data.data.diyGuiPrice + '元'
          } else if (res.data.data.diyGuiPrice && res.data.data.diyGuiPrice >= 10000) {
            res.data.data.diyGuiPrice = res.data.data.diyGuiPrice / 10000 + '万元'
          } else {
            res.data.data.diyGuiPrice = ''
          }
          if (res.data.data.jianPrice && res.data.data.jianPrice < 10000) {
            res.data.data.jianPrice = res.data.data.jianPrice + '元'
          } else if (res.data.data.jianPrice && res.data.data.jianPrice >= 10000) {
            res.data.data.jianPrice = res.data.data.jianPrice / 10000 + '万元'
          } else {
            res.data.data.jianPrice = ''
          }
          if (res.data.data.jinPrice && res.data.data.jinPrice < 10000) {
            res.data.data.jinPrice = res.data.data.jinPrice + '元'
          } else if (res.data.data.jinPrice && res.data.data.jinPrice >= 10000) {
            res.data.data.jinPrice = res.data.data.jinPrice / 10000 + '万元'
          } else {
            res.data.data.jinPrice = ''
          }

          if (res.data.data.diyGuiWeight && res.data.data.diyGuiWeight < 1000) {
            res.data.data.diyGuiWeight = res.data.data.diyGuiWeight + 'KG'
          } else if (res.data.data.diyGuiWeight && res.data.data.diyGuiWeight >= 1000) {
            res.data.data.diyGuiWeight = res.data.data.diyGuiWeight / 1000 + '吨'
          } else {
            res.data.data.diyGuiWeight = ''
          }
          if (res.data.data.xiaoGuiWeight && res.data.data.xiaoGuiWeight < 1000) {
            res.data.data.xiaoGuiWeight = res.data.data.xiaoGuiWeight + 'KG'
          } else if (res.data.data.xiaoGuiWeight && res.data.data.xiaoGuiWeight >= 1000) {
            res.data.data.xiaoGuiWeight = res.data.data.xiaoGuiWeight / 1000 + '吨'
          } else {
            res.data.data.xiaoGuiWeight = ''
          }

          if (res.data.data.daGuiWeight && res.data.data.daGuiWeight < 1000) {
            res.data.data.daGuiWeight = res.data.data.daGuiWeight + 'KG'
          } else if (res.data.data.daGuiWeight && res.data.data.daGuiWeight >= 1000) {
            res.data.data.daGuiWeight = res.data.data.daGuiWeight / 1000 + '吨'
          } else {
            res.data.data.daGuiWeight = ''
          }
          res.data.data.areaAddress = (res.data.data.area1Name || '') + '-' + (res.data.data.area2Name || '') + '-' + (res.data.data.area3Name || '') + '-' + (res.data.data.address || '')
          console.log(res.data.data.areaAddress)
          res.data.data.areaAddress = res.data.data.areaAddress.replace('---', '-').replace('--', '-')
          if (res.data.data.areaAddress) {
            if (res.data.data.areaAddress.slice(0, 1) == '-') {
              res.data.data.areaAddress = res.data.data.areaAddress.slice(1, res.data.data.areaAddress.length)
            } else if (res.data.data.areaAddress.slice(res.data.data.areaAddress.length - 1, res.data.data.areaAddress.length) == '-') {
              res.data.data.areaAddress = res.data.data.areaAddress.slice(0, res.data.data.areaAddress.length - 1)
            }
          }
          console.log(res.data.data.areaAddress)

          if(res.data.data.jinPrice||res.data.data.jianPrice){
            var jinPriceName='',jianPriceName=''
            if(res.data.data.jinPrice){
              jinPriceName=res.data.data.jinPrice+'/斤'
            }
            if(res.data.data.jianPrice){
              jianPriceName=res.data.data.jianPrice+'/件'
            }
            array3.push(jianPriceName+jinPriceName)
            console.log(array3)
          }
          if(res.data.data.xiaoGuiPrice){
            let xiaoGuiWeightName='',xiaoGuiVolumnName=''
            if(res.data.data.xiaoGuiWeight){
              xiaoGuiWeightName=res.data.data.xiaoGuiWeight+'-'
            }
            if(res.data.data.xiaoGuiVolumn){
              xiaoGuiVolumnName=res.data.data.xiaoGuiVolumn+'M³-'
            }
            array3.push('小柜-'+xiaoGuiWeightName+xiaoGuiVolumnName+res.data.data.xiaoGuiPrice)
          }
          if(res.data.data.daGuiPrice){
            let daGuiWeightName='',daGuiVolumnName=''
            if(res.data.data.daGuiWeight){
              daGuiWeightName=res.data.data.daGuiWeight+'-'
            }
            if(res.data.data.daGuiVolumn){
              daGuiVolumnName=res.data.data.daGuiVolumn+'M³-'
            }
            array3.push('大柜-'+daGuiWeightName+daGuiVolumnName+res.data.data.daGuiPrice)
          }
          if(res.data.data.diyGuiPrice&&res.data.data.diyGuiCount){
            let diyGuiWeightName='',diyGuiVolumnName=''
            if(res.data.data.diyGuiWeight){
              diyGuiWeightName=res.data.data.diyGuiWeight+'-'
            }
            if(res.data.data.diyGuiWeight){
              diyGuiVolumnName=res.data.data.diyGuiVolumn+'M³-'
            }
            array3.push(res.data.data.diyGuiCount+'柜-'+diyGuiWeightName+diyGuiVolumnName+res.data.data.diyGuiPrice)
          }
          console.log(array3)
          that.setData({
            list: res.data.data,
            id: id,
            array3:array3
          });
        } else if (res.data.code == 20 || res.data.code == 26) {
          wx.hideToast()
          wx.navigateTo({
            url: '../../login/login',
          })
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
    wx.stopPullDownRefresh({
      complete: (res) => {},
    })
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
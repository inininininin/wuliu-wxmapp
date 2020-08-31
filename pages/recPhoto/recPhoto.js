// pages/recPhote/recPhoto.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'验证您的身份证',
    tempFilePaths:''
  },
  photo(e){
    let that=this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        that.setData({
          tempFilePaths:tempFilePaths[0]
        })
       
      }
    })
  },
  makesure(e){
    wx.showToast({
      title: '上传中，请稍等',
      icon:'none'
    })
    let that=this
    wx.uploadFile({
      url: app.globalData.domain + '/wuliu/upload-file', //仅为示例，非真实的接口地址
      filePath: that.data.tempFilePaths,
      name: 'file',
      success: function (res) {
        var data = JSON.parse(res.data);
        var url = data.data.url
        console.log(url)
        if (data.code == 0) {
          if(that.data.type==1){
            app.globalData.renzhengcover1=app.cover(url)
          }else  if(that.data.type==2){
            app.globalData.renzhengcover2=app.cover(url)
          }else  if(that.data.type==3){
            app.globalData.renzhengcover3=app.cover(url)
          }else  if(that.data.type==4){
            app.globalData.renzhengcover4=app.cover(url)
          }
          wx.showToast({
            title: '上传成功',
            icon: 'none',
            duration: 2000,
            mask: true,
            complete: function complete(res) {
              setTimeout(function () {
                wx.navigateBack({
                  delta:1,
                  complete: (res) => {},
                })
              }, 500);
            }
          })
        }
      },
      fail: function (res) {
        console.log(res)
      }
    })
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type:options.typeId
    })
    console.log(options.typeId)
    if(options.typeId==1){
      this.setData({
        tempFilePaths:app.globalData.renzhengcover1
      })
    }else if(options.typeId==2){
      this.setData({
        tempFilePaths:app.globalData.renzhengcover2
      })
    }else if(options.typeId==3){
      this.setData({
        tempFilePaths:app.globalData.renzhengcover3
      })
    }else if(options.typeId==4){
      this.setData({
        tempFilePaths:app.globalData.renzhengcover4
      })
    }
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
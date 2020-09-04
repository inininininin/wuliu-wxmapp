// pages/publishorder/publishorder.js
const app = getApp()
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picker: true,
    region: ['请选择发货地址：省-市-区'],
    faaddress2: '',
    date: '请选择发货日期',
    colorTime: '#999999',
    fahuoList: { 'faHuoArea1Id': '', 'faHuoArea1Name': '', 'faHuoArea2Id': '', 'faHuoArea2Name': '', 'faHuoArea3Id': '', 'faHuoArea3Name': '', 'faHuoAddress': '', 'faHuoTime': '请选择发货日期', 'picker': true, 'colorTime': '#999999', 'region': '' },
    getAddressList: [{ 'shouHuoArea1Id': '', 'shouHuoArea1Name': '', 'shouHuoArea2Id': '', 'shouHuoArea2Name': '', 'shouHuoArea3Id': '', 'shouHuoArea3Name': '', 'shouHuoAddress': '', 'shouHuoWeight': '', 'shouHuoVolume': '', 'shouHuoTime': '请选择收货日期', 'type': '', 'region': '', 'picker': true, 'colorTime': '#999999' }],
    showIf: 1,
    array1: ['请选择', '20小箱', '40大箱', '40高箱', '45高箱'],
    index1: 0,
    array2: ['请选择', '普通', '短板', '短板自卸', '冷柜', '开顶', '罐式', '脚架折叠', '板框折叠', '挂衣'],
    index2: 0,
    array3: ['请选择', '个', '组'],
    index3: 0,
    huoWuLeiXingList: ['请选择', '服装', '食品'],
    huoWuLeiXingIndex: 0,
    baoZhuangFangShiList: ['请选择', '木箱', '纸箱'],
    baoZhuangFangShiIndex: 0,
    xiangXing: '',
    gongNeng: '',
    xiangShu: '',
    xiangShuUnit: '',
    huoWuLeiXing: '',
    huoWuLeiXingDetail:'',
    huoWuVolume: '',
    huoWuWeight: '',
    baoZhuangFangShi: '',
    note:'',
  },
  //  发货地址
  bindRegionChange: function (e) {
    this.data.fahuoList.region = e.detail.value,
      this.data.fahuoList.picker = false,
      this.data.fahuoList.faHuoArea1Id = e.detail.code[2].substring(0, 2),
      this.data.fahuoList.faHuoArea2Id = e.detail.code[2].substring(0, 4),
      this.data.fahuoList.faHuoArea3Id = e.detail.code[2],
      this.data.fahuoList.faHuoArea1Name = e.detail.value[0],
      this.data.fahuoList.faHuoArea2Name = e.detail.value[1],
      this.data.fahuoList.faHuoArea3Name = e.detail.value[2],
      this.setData({
        fahuoList: this.data.fahuoList
      })
  },
  // 发货详细地址
  faHuoAddress(e) {
    this.data.fahuoList.faHuoAddress = e.detail.value
    this.setData({
      fahuoList: this.data.fahuoList
    })
  },
  // 发货日期
  faHuoTime: function (e) {
    this.data.fahuoList.faHuoTime = e.detail.value,
      this.data.fahuoList.colorTime = '#333333'
    this.setData({
      fahuoList: this.data.fahuoList
    })
  },
  // 货物类型  huoWuLeiXingList
  huoWuLeiXing: function (e) {
    let huoWuLeiXing = ''
    for (var i in this.data.huoWuLeiXingList) {
      if (i == e.detail.value) {
        huoWuLeiXing = this.data.huoWuLeiXingList[i]
      }
    }
    this.setData({
      huoWuLeiXingIndex: e.detail.value,
      huoWuLeiXing: huoWuLeiXing == '请选择' ? '' : e.detail.value
    })
  },
  huoWuLeiXingDetail: function (e) {
    this.setData({
      huoWuLeiXingDetail: e.detail.value
    })
  },
  // 货物重量
  huoWuWeight: function (e) {
    this.setData({
      huoWuWeight: e.detail.value
    })
  },
  // 货物体积
  huoWuVolume: function (e) {
    this.setData({
      huoWuVolume: e.detail.value
    })
  },
  // 包装方式baoZhuangFangShiList
  baoZhuangFangShi: function (e) {
    let baoZhuangFangShi = ''
    for (var i in this.data.baoZhuangFangShiList) {
      if (i == e.detail.value) {
        baoZhuangFangShi = this.data.baoZhuangFangShiList[i]
      }
    }
    this.setData({
      baoZhuangFangShiIndex: e.detail.value,
      baoZhuangFangShi: baoZhuangFangShi == '请选择' ? '' : e.detail.value
    })
    // this.setData({
    //   baoZhuangFangShi: e.detail.value
    // })
  },

  // 箱型
  xiangXing: function (e) {
    let xiangXing = ''
    for (var i in this.data.array1) {
      if (i == e.detail.value) {
        xiangXing = this.data.array1[i]
      }
    }
    this.setData({
      index1: e.detail.value,
      xiangXing: xiangXing == '请选择' ? '' : e.detail.value
    })
  },
  // 功能
  gongNeng: function (e) {
    let gongNeng = ''
    for (var i in this.data.array2) {
      if (i == e.detail.value) {
        gongNeng = this.data.array1[i]
      }
    }
    this.setData({
      index2: e.detail.value,
      gongNeng: gongNeng == '请选择' ? '' : e.detail.value
    })
  },
  // 箱数
  xiangShu: function (e) {
    let xiangShu = ''
    for (var i in this.data.array3) {
      if (i == e.detail.value) {
        xiangShu = this.data.array1[i]
      }
    }
    this.setData({
      index3: e.detail.value,
      xiangShu: xiangShu == '请选择' ? '' : e.detail.value
    })
  },
  // 箱数个数
  xiangShuUnit: function (e) {
    this.setData({
      xiangShuUnit: e.detail.value
    })
  },
  // 备注
  note: function (e) {
    this.setData({
      note: e.detail.value
    })
  },

  // 收货日期
  shouHuoTime: function (e) {
    this.data.getAddressList[0].shouHuoTime = e.detail.value||'',
      this.data.getAddressList[0].colorTime = '#333333'
    this.setData({
      getAddressList: this.data.getAddressList
    })
  },
  shouHuo1Time: function (e) {
    this.data.getAddressList[1].shouHuo1Time = e.detail.value||'',
      this.data.getAddressList[1].colorTime = '#333333'
    this.setData({
      getAddressList: this.data.getAddressList
    })
  },
  shouHuo2Time: function (e) {
    this.data.getAddressList[2].shouHuo2Time = e.detail.value||'',
      this.data.getAddressList[2].colorTime = '#333333'
    this.setData({
      getAddressList: this.data.getAddressList
    })
  },
  shouHuo3Time: function (e) {
    this.data.getAddressList[3].shouHuo3Time = e.detail.value||'',
      this.data.getAddressList[3].colorTime = '#333333'
    this.setData({
      getAddressList: this.data.getAddressList
    })
  },
  // 收货重量
  shouHuoWeight: function (e) {
    this.data.getAddressList[0].shouHuoWeight = e.detail.value,
      this.setData({
        getAddressList: this.data.getAddressList
      })
  },
  shouHuo1Weight: function (e) {
    this.data.getAddressList[1].shouHuo1Weight = e.detail.value,
      this.setData({
        getAddressList: this.data.getAddressList
      })
  },
  shouHuo2Weight: function (e) {
    this.data.getAddressList[2].shouHuo2Weight = e.detail.value,
      this.setData({
        getAddressList: this.data.getAddressList
      })
  },
  shouHuo3Weight: function (e) {
    this.data.getAddressList[3].shouHuo3Weight = e.detail.value,
      this.setData({
        getAddressList: this.data.getAddressList
      })
  },
  // 收货体积
  shouHuoVolume: function (e) {
    this.data.getAddressList[0].shouHuoVolume = e.detail.value,
      this.setData({
        getAddressList: this.data.getAddressList
      })
  },
  shouHuo1Volume: function (e) {
    this.data.getAddressList[1].shouHuo1Volume = e.detail.value,
      this.setData({
        getAddressList: this.data.getAddressList
      })
  },
  shouHuo2Volume: function (e) {
    this.data.getAddressList[2].shouHuo2Volume = e.detail.value,
      this.setData({
        getAddressList: this.data.getAddressList
      })
  },
  shouHuo3Volume: function (e) {
    this.data.getAddressList[3].shouHuo3Volume = e.detail.value,
      this.setData({
        getAddressList: this.data.getAddressList
      })
  },
  // 收货地址
  faaddress: function (e) {
    this.data.getAddressList[0].region = e.detail.value,
      this.data.getAddressList[0].picker = false,
      this.data.getAddressList[0].shouHuoArea1Id = e.detail.code[2].substring(0, 2),
      this.data.getAddressList[0].shouHuoArea2Id = e.detail.code[2].substring(0, 4),
      this.data.getAddressList[0].shouHuoArea3Id = e.detail.code[2],
      this.data.getAddressList[0].shouHuoArea1Name = e.detail.value[0],
      this.data.getAddressList[0].shouHuoArea2Name = e.detail.value[1],
      this.data.getAddressList[0].shouHuoArea3Name = e.detail.value[2],
      this.setData({
        getAddressList: this.data.getAddressList
      })
  },
  faaddress1: function (e) {
    this.data.getAddressList[1].region = e.detail.value,
      this.data.getAddressList[1].picker = false,
      this.data.getAddressList[1].shouHuo1Area1Id = e.detail.code[2].substring(0, 2),
      this.data.getAddressList[1].shouHuo1Area2Id = e.detail.code[2].substring(0, 4),
      this.data.getAddressList[1].shouHuo1Area3Id = e.detail.code[2],
      this.data.getAddressList[1].shouHuo1Area1Name = e.detail.value[0],
      this.data.getAddressList[1].shouHuo1Area2Name = e.detail.value[1],
      this.data.getAddressList[1].shouHuo1Area3Name = e.detail.value[2],
      this.setData({
        getAddressList: this.data.getAddressList
      })
  },
  faaddress2: function (e) {
    this.data.getAddressList[2].region = e.detail.value,
      this.data.getAddressList[2].picker = false,
      this.data.getAddressList[2].shouHuo2Area1Id = e.detail.code[2].substring(0, 2),
      this.data.getAddressList[2].shouHuo2Area2Id = e.detail.code[2].substring(0, 4),
      this.data.getAddressList[2].shouHuo2Area3Id = e.detail.code[2],
      this.data.getAddressList[2].shouHuo2Area1Name = e.detail.value[0],
      this.data.getAddressList[2].shouHuo2Area2Name = e.detail.value[1],
      this.data.getAddressList[2].shouHuo2Area3Name = e.detail.value[2],
      this.setData({
        getAddressList: this.data.getAddressList
      })
  },
  faaddress3: function (e) {
    this.data.getAddressList[3].region = e.detail.value,
      this.data.getAddressList[3].picker = false,
      this.data.getAddressList[3].shouHuo3Area1Id = e.detail.code[2].substring(0, 2),
      this.data.getAddressList[3].shouHuo3Area2Id = e.detail.code[2].substring(0, 4),
      this.data.getAddressList[3].shouHuo3Area3Id = e.detail.code[2],
      this.data.getAddressList[3].shouHuo3Area1Name = e.detail.value[0],
      this.data.getAddressList[3].shouHuo3Area2Name = e.detail.value[1],
      this.data.getAddressList[3].shouHuo3Area3Name = e.detail.value[2],
      this.setData({
        getAddressList: this.data.getAddressList
      })
  },
  // 收货地址详情
  shouHuoAddress(e) {
    this.data.getAddressList[0].shouHuoAddress = e.detail.value
    this.setData({
      getAddressList: this.data.getAddressList
    })
  },
  shouHuo1Address(e) {
    this.data.getAddressList[1].shouHuo1Address = e.detail.value
    this.setData({
      getAddressList: this.data.getAddressList
    })
  },
  shouHuo2Address(e) {
    this.data.getAddressList[2].shouHuo2Address = e.detail.value
    this.setData({
      getAddressList: this.data.getAddressList
    })
  },
  shouHuo3Address(e) {
    this.data.getAddressList[3].shouHuo3Address = e.detail.value
    this.setData({
      getAddressList: this.data.getAddressList
    })
  },
  addNewaddress() {
    if (this.data.getAddressList.length == 1) {
      this.data.getAddressList.push({ 'shouHuo1Area1Id': '', 'shouHuo1Area1Name': '', 'shouHuo1Area2Id': '', 'shouHuo1Area2Name': '', 'shouHuo1Area3Id': '', 'shouHuo1Area3Name': '', 'shouHuo1Address': '', 'shouHuo1Weight': '', 'shouHuo1Volume': '', 'shouHuo1Time': '请选择收货日期', 'type': '1', 'region': '', 'picker': true, 'colorTime': '#999999' })
    } else if (this.data.getAddressList.length == 2) {
      this.data.getAddressList.push({ 'shouHuo2Area1Id': '', 'shouHuo2Area1Name': '', 'shouHuo2Area2Id': '', 'shouHuo2Area2Name': '', 'shouHuo2Area3Id': '', 'shouHuo2Area3Name': '', 'shouHuo2Address': '', 'shouHuo2Weight': '', 'shouHuo2Volume': '', 'shouHuo2Time': '请选择收货日期', 'type': '2', 'region': '', 'picker': true, 'colorTime': '#999999' })
    } else if (this.data.getAddressList.length == 3) {
      this.data.getAddressList.push({ 'shouHuo3Area1Id': '', 'shouHuo3Area1Name': '', 'shouHuo3Area2Id': '', 'shouHuo3Area2Name': '', 'shouHuo3Area3Id': '', 'shouHuo3Area3Name': '', 'shouHuo3Address': '', 'shouHuo3Weight': '', 'shouHuo3Volume': '', 'shouHuo3Time': '请选择收货日期', 'type': '3', 'region': '', 'picker': true, 'colorTime': '#999999' })
    } else {
      wx.showToast({
        title: '最多选择4条发货地址',
        icon: 'none',
        duration: 2000,
        mask: true,
        complete: function complete(res) {
          setTimeout(function () {

          }, 100);
        }
      });
    }
    this.setData({
      getAddressList: this.data.getAddressList
    })
  },
  // 发布订单
  send() {
    let param = '';
    let that = this;
    if (that.data.fahuoList.faHuoTime == '请选择发货日期') {
      that.data.fahuoList.faHuoTime == ''
    }
    if (that.data.getAddressList[0].shouHuoTime == '请选择收货日期') {
      that.data.getAddressList[0].shouHuoTime == ''
    }
    if (that.data.fahuoList.faHuoArea1Id == '' || that.data.fahuoList.faHuoArea2Id == '' || that.data.fahuoList.faHuoArea3Id == '' || that.data.fahuoList.faHuoAddress == '' || that.data.fahuoList.faHuoTime == '') {
      wx.showToast({
        title: '请填写完整发货地址',
        icon: 'none',
      });
      return
    }
    if (that.data.getAddressList[0].shouHuoArea1Id == '' || that.data.getAddressList[0].shouHuoArea2Id == '' || that.data.getAddressList[0].shouHuoArea3Id == '' || that.data.getAddressList[0].shouHuoAddress == '' || that.data.getAddressList[0].shouHuoWeight == '' || that.data.getAddressList[0].shouHuoVolume == '' || that.data.getAddressList[0].shouHuoTime == '') {
      wx.showToast({
        title: '请至少填写一个完整收货地址',
        icon: 'none',
      });
      return
    }

    if (that.data.huoWuLeiXing == '' ||  that.data.baoZhuangFangShi == ''||that.data.huoWuLeiXingDetail=='') {
      wx.showToast({
        title: '请填写完整货物详情',
        icon: 'none',
      });
      return
    }
    if (that.data.xiangXing == '' || that.data.gongNeng == '' || that.data.xiangshu == '' || that.data.xiangShuUnit == '') {
      wx.showToast({
        title: '请填写完整箱型功能等',
        icon: 'none',
      });
      return
    }
    if (that.data.getAddressList.length == 1) {
      param = 'shouHuoArea1Id=' + that.data.getAddressList[0].shouHuoArea1Id + '&shouHuoArea1Name=' + that.data.getAddressList[0].shouHuoArea1Name
        + '&shouHuoArea2Id=' + that.data.getAddressList[0].shouHuoArea2Id + '&shouHuoArea2Name=' + that.data.getAddressList[0].shouHuoArea2Name
        + '&shouHuoArea3Id=' + that.data.getAddressList[0].shouHuoArea3Id + '&shouHuoArea3Name=' + that.data.getAddressList[0].shouHuoArea3Name
        + '&shouHuoAddress=' + that.data.getAddressList[0].shouHuoAddress + '&shouHuoWeight=' + that.data.getAddressList[0].shouHuoWeight
        + '&shouHuoVolume=' + that.data.getAddressList[0].shouHuoVolume + '&shouHuoTime=' + util.formatTimecuo(that.data.getAddressList[0].shouHuoTime)
    } else if (that.data.getAddressList.length == 2) {
      if (that.data.getAddressList[1].shouHuo1Time && that.data.getAddressList[1].shouHuo1Time == '请选择收货日期') {
        that.data.getAddressList[1].shouHuo1Time = ''
      }
      if (that.data.getAddressList[1].shouHuo1Area1Id == '' || that.data.getAddressList[1].shouHuo1Area2Id == '' || that.data.getAddressList[1].shouHuo1Area3Id == '' || that.data.getAddressList[1].shouHuo1Address == '' || that.data.getAddressList[1].shouHuo1Weight == '' || that.data.getAddressList[1].shouHuo1Volume == '' || that.data.getAddressList[1].shouHuo1Time == '') {
        wx.showToast({
          title: '请填写完整收货地址',
          icon: 'none',
        });
        return
      }
      param = 'shouHuoArea1Id=' + that.data.getAddressList[0].shouHuoArea1Id + '&shouHuoArea1Name=' + that.data.getAddressList[0].shouHuoArea1Name
        + '&shouHuoArea2Id=' + that.data.getAddressList[0].shouHuoArea2Id + '&shouHuoArea2Name=' + that.data.getAddressList[0].shouHuoArea2Name
        + '&shouHuoArea3Id=' + that.data.getAddressList[0].shouHuoArea3Id + '&shouHuoArea3Name=' + that.data.getAddressList[0].shouHuoArea3Name
        + '&shouHuoAddress=' + that.data.getAddressList[0].shouHuoAddress + '&shouHuoWeight=' + that.data.getAddressList[0].shouHuoWeight
        + '&shouHuoVolume=' + that.data.getAddressList[0].shouHuoVolume + '&shouHuoTime=' + util.formatTimecuo(that.data.getAddressList[0].shouHuoTime)
        + '&shouHuo1Area1Id=' + that.data.getAddressList[1].shouHuo1Area1Id + '&shouHuo1Area1Name=' + that.data.getAddressList[1].shouHuo1Area1Name
        + '&shouHuo1Area2Id=' + that.data.getAddressList[1].shouHuo1Area2Id + '&shouHuo1Area2Name=' + that.data.getAddressList[1].shouHuo1Area2Name
        + '&shouHuo1Area3Id=' + that.data.getAddressList[1].shouHuo1Area3Id + '&shouHuo1Area3Name=' + that.data.getAddressList[1].shouHuo1Area3Name
        + '&shouHuo1Address=' + that.data.getAddressList[1].shouHuo1Address + '&shouHuo1Weight=' + that.data.getAddressList[1].shouHuo1Weight
        + '&shouHuo1Volume=' + that.data.getAddressList[1].shouHuo1Volume + '&shouHuo1Time=' + util.formatTimecuo(that.data.getAddressList[1].shouHuo1Time)
    } else if (that.data.getAddressList.length == 3) {
      if (that.data.getAddressList[1].shouHuo1Time && that.data.getAddressList[1].shouHuo1Time == '请选择收货日期') {
        that.data.getAddressList[1].shouHuo1Time = ''
      }
      if (that.data.getAddressList[2].shouHuo2Time && that.data.getAddressList[2].shouHuo2Time == '请选择收货日期') {
        that.data.getAddressList[2].shouHuo2Time = ''
      }
      if (that.data.getAddressList[1].shouHuo1Area1Id == '' || that.data.getAddressList[1].shouHuo1Area2Id == '' || that.data.getAddressList[1].shouHuo1Area3Id == '' || that.data.getAddressList[1].shouHuo1Address == '' || that.data.getAddressList[1].shouHuo1Weight == '' || that.data.getAddressList[1].shouHuo1Volume == '' || that.data.getAddressList[1].shouHuo1Time == '' || that.data.getAddressList[2].shouHuo2Area1Id == '' || that.data.getAddressList[2].shouHuo2Area2Id == '' || that.data.getAddressList[2].shouHuo2Area3Id == '' || that.data.getAddressList[2].shouHuo2Address == '' || that.data.getAddressList[2].shouHuo2Weight == '' || that.data.getAddressList[2].shouHuo2Volume == '' || that.data.getAddressList[2].shouHuo2Time == '') {
        wx.showToast({
          title: '请填写完整收货地址',
          icon: 'none',
        });
        return
      }
      param = 'shouHuoArea1Id=' + that.data.getAddressList[0].shouHuoArea1Id + '&shouHuoArea1Name=' + that.data.getAddressList[0].shouHuoArea1Name
        + '&shouHuoArea2Id=' + that.data.getAddressList[0].shouHuoArea2Id + '&shouHuoArea2Name=' + that.data.getAddressList[0].shouHuoArea2Name
        + '&shouHuoArea3Id=' + that.data.getAddressList[0].shouHuoArea3Id + '&shouHuoArea3Name=' + that.data.getAddressList[0].shouHuoArea3Name
        + '&shouHuoAddress=' + that.data.getAddressList[0].shouHuoAddress + '&shouHuoWeight=' + that.data.getAddressList[0].shouHuoWeight
        + '&shouHuoVolume=' + that.data.getAddressList[0].shouHuoVolume + '&shouHuoTime=' + util.formatTimecuo(that.data.getAddressList[0].shouHuoTime)
        + '&shouHuo1Area1Id=' + that.data.getAddressList[1].shouHuo1Area1Id + '&shouHuo1Area1Name=' + that.data.getAddressList[1].shouHuo1Area1Name
        + '&shouHuo1Area2Id=' + that.data.getAddressList[1].shouHuo1Area2Id + '&shouHuo1Area2Name=' + that.data.getAddressList[1].shouHuo1Area2Name
        + '&shouHuo1Area3Id=' + that.data.getAddressList[1].shouHuo1Area3Id + '&shouHuo1Area3Name=' + that.data.getAddressList[1].shouHuo1Area3Name
        + '&shouHuo1Address=' + that.data.getAddressList[1].shouHuo1Address + '&shouHuo1Weight=' + that.data.getAddressList[1].shouHuo1Weight
        + '&shouHuo1Volume=' + that.data.getAddressList[1].shouHuo1Volume + '&shouHuo1Time=' + util.formatTimecuo(that.data.getAddressList[1].shouHuo1Time)
        + '&shouHuo2Area1Id=' + that.data.getAddressList[2].shouHuo2Area1Id + '&shouHuo2Area1Name=' + that.data.getAddressList[2].shouHuo2Area1Name
        + '&shouHuo2Area2Id=' + that.data.getAddressList[2].shouHuo2Area2Id + '&shouHuo2Area2Name=' + that.data.getAddressList[2].shouHuo2Area2Name
        + '&shouHuo2Area3Id=' + that.data.getAddressList[2].shouHuo2Area3Id + '&shouHuo2Area3Name=' + that.data.getAddressList[2].shouHuo2Area3Name
        + '&shouHuo2Address=' + that.data.getAddressList[2].shouHuo2Address + '&shouHuo2Weight=' + that.data.getAddressList[2].shouHuo2Weight
        + '&shouHuo2Volume=' + that.data.getAddressList[2].shouHuo2Volume + '&shouHuo2Time=' + util.formatTimecuo(that.data.getAddressList[2].shouHuo2Time)
    } else if (that.data.getAddressList.length == 4) {
      if (that.data.getAddressList[1].shouHuo1Time && that.data.getAddressList[1].shouHuo1Time == '请选择收货日期') {
        that.data.getAddressList[1].shouHuo1Time = ''
      }
      if (that.data.getAddressList[2].shouHuo2Time && that.data.getAddressList[2].shouHuo2Time == '请选择收货日期') {
        that.data.getAddressList[2].shouHuo2Time = ''
      }
      if (that.data.getAddressList[3].shouHuo3Time && that.data.getAddressList[3].shouHuo3Time == '请选择收货日期') {
        that.data.getAddressList[3].shouHuo3Time = ''
      }
      if (that.data.getAddressList[1].shouHuo1Area1Id == '' || that.data.getAddressList[1].shouHuo1Area2Id == '' || that.data.getAddressList[1].shouHuo1Area3Id == '' || that.data.getAddressList[1].shouHuo1Address == '' || that.data.getAddressList[1].shouHuo1Weight == '' || that.data.getAddressList[1].shouHuo1Volume == '' || that.data.getAddressList[1].shouHuo1Time == '' || that.data.getAddressList[2].shouHuo2Area1Id == '' || that.data.getAddressList[2].shouHuo2Area2Id == '' || that.data.getAddressList[2].shouHuo2Area3Id == '' || that.data.getAddressList[2].shouHuo2Address == '' || that.data.getAddressList[2].shouHuo2Weight == '' || that.data.getAddressList[2].shouHuo2Volume == '' || that.data.getAddressList[2].shouHuo2Time == '' || that.data.getAddressList[3].shouHuo3Area1Id == '' || that.data.getAddressList[3].shouHuo3Area2Id == '' || that.data.getAddressList[3].shouHuo3Area3Id == '' || that.data.getAddressList[3].shouHuo3Address == '' || that.data.getAddressList[3].shouHuo3Weight == '' || that.data.getAddressList[3].shouHuo3Volume == '' || that.data.getAddressList[3].shouHuo3Time == '') {
        wx.showToast({
          title: '请填写完整收货地址',
          icon: 'none',
        });
        return
      }
      param = 'shouHuoArea1Id=' + that.data.getAddressList[0].shouHuoArea1Id + '&shouHuoArea1Name=' + that.data.getAddressList[0].shouHuoArea1Name
        + '&shouHuoArea2Id=' + that.data.getAddressList[0].shouHuoArea2Id + '&shouHuoArea2Name=' + that.data.getAddressList[0].shouHuoArea2Name
        + '&shouHuoArea3Id=' + that.data.getAddressList[0].shouHuoArea3Id + '&shouHuoArea3Name=' + that.data.getAddressList[0].shouHuoArea3Name
        + '&shouHuoAddress=' + that.data.getAddressList[0].shouHuoAddress + '&shouHuoWeight=' + that.data.getAddressList[0].shouHuoWeight
        + '&shouHuoVolume=' + that.data.getAddressList[0].shouHuoVolume + '&shouHuoTime=' + util.formatTimecuo(that.data.getAddressList[0].shouHuoTime)
        + '&shouHuo1Area1Id=' + that.data.getAddressList[1].shouHuo1Area1Id + '&shouHuo1Area1Name=' + that.data.getAddressList[1].shouHuo1Area1Name
        + '&shouHuo1Area2Id=' + that.data.getAddressList[1].shouHuo1Area2Id + '&shouHuo1Area2Name=' + that.data.getAddressList[1].shouHuo1Area2Name
        + '&shouHuo1Area3Id=' + that.data.getAddressList[1].shouHuo1Area3Id + '&shouHuo1Area3Name=' + that.data.getAddressList[1].shouHuo1Area3Name
        + '&shouHuo1Address=' + that.data.getAddressList[1].shouHuo1Address + '&shouHuo1Weight=' + that.data.getAddressList[1].shouHuo1Weight
        + '&shouHuo1Volume=' + that.data.getAddressList[1].shouHuo1Volume + '&shouHuo1Time=' + util.formatTimecuo(that.data.getAddressList[1].shouHuo1Time)
        + '&shouHuo2Area1Id=' + that.data.getAddressList[2].shouHuo2Area1Id + '&shouHuo2Area1Name=' + that.data.getAddressList[2].shouHuo2Area1Name
        + '&shouHuo2Area2Id=' + that.data.getAddressList[2].shouHuo2Area2Id + '&shouHuo2Area2Name=' + that.data.getAddressList[2].shouHuo2Area2Name
        + '&shouHuo2Area3Id=' + that.data.getAddressList[2].shouHuo2Area3Id + '&shouHuo2Area3Name=' + that.data.getAddressList[2].shouHuo2Area3Name
        + '&shouHuo2Address=' + that.data.getAddressList[2].shouHuo2Address + '&shouHuo2Weight=' + that.data.getAddressList[2].shouHuo2Weight
        + '&shouHuo2Volume=' + that.data.getAddressList[2].shouHuo2Volume + '&shouHuo2Time=' + util.formatTimecuo(that.data.getAddressList[2].shouHuo2Time)
        + '&shouHuo3Area1Id=' + that.data.getAddressList[3].shouHuo3Area1Id + '&shouHuo3Area1Name=' + that.data.getAddressList[3].shouHuo3Area1Name
        + '&shouHuo3Area2Id=' + that.data.getAddressList[3].shouHuo3Area2Id + '&shouHuo3Area2Name=' + that.data.getAddressList[3].shouHuo3Area2Name
        + '&shouHuo3Area3Id=' + that.data.getAddressList[3].shouHuo3Area3Id + '&shouHuo3Area3Name=' + that.data.getAddressList[3].shouHuo3Area3Name
        + '&shouHuo3Address=' + that.data.getAddressList[3].shouHuo3Address + '&shouHuo3Weight=' + that.data.getAddressList[3].shouHuo3Weight
        + '&shouHuo3Volume=' + that.data.getAddressList[3].shouHuo3Volume + '&shouHuo3Time=' + util.formatTimecuo(that.data.getAddressList[3].shouHuo3Time)
    }
    wx.request({
      url: app.globalData.domain + '/wuliu/order/order-insert?' + param,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': wx.getStorageSync('cookie')
      },
      method: 'post',
      data: {
        faHuoArea1Id: that.data.fahuoList.faHuoArea1Id,
        faHuoArea1Name: that.data.fahuoList.faHuoArea1Name,
        faHuoArea2Id: that.data.fahuoList.faHuoArea2Id,
        faHuoArea2Name: that.data.fahuoList.faHuoArea2Name,
        faHuoArea3Id: that.data.fahuoList.faHuoArea3Id,
        faHuoArea3Name: that.data.fahuoList.faHuoArea3Name,
        faHuoAddress: that.data.fahuoList.faHuoAddress,
        faHuoTime: util.formatTimecuo(that.data.fahuoList.faHuoTime),
        huoWuLeiXing: that.data.huoWuLeiXing,
        huoWuLeiXingDetail:that.data.huoWuLeiXingDetail,
        // huoWuWeight: that.data.huoWuWeight,
        // huoWuVolume: that.data.huoWuVolume,
        baoZhuangFangShi: that.data.baoZhuangFangShi,
        note: that.data.note,
        xiangXing: that.data.xiangXing,
        gongNeng: that.data.gongNeng,
        xiangShu: that.data.xiangShuUnit,
        xiangShuUnit: that.data.xiangShu,
      },
      success: function (res) {
        if (res.data.codeMsg) {
          wx.showToast({
            title: res.data.codeMsg,
            icon: 'none'
          })
        }
        if (res.data.code == 0) {
          wx.showToast({
            title: '订单已发布',
            icon: 'none',
            duration: 2000,
            mask: true,
            complete: function complete(res) {
              setTimeout(function () {
                wx.switchTab({
                  url: '../orderList/orderList',
                })
              }, 100);
            }
          });
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
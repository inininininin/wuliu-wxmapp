const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatTimecuo = dates => {
  const repTime= dates.replace(/-/g, '/');
  const timeTamp = Date.parse(repTime);
  return timeTamp
}
// var repTime = time.replace(/-/g, '/');//用正则主要是把“2019-05-20 00:00:00”转换成“2019/05/0 00:00:00”兼容ios

// console.log("返回时间：" + repTime);

// var timeTamp = Date.parse(repTime);

// console.log("返回时间戳：" + timeTamp)

module.exports = {
  formatTime: formatTime,
  formatTimecuo:formatTimecuo
}

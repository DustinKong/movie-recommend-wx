// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showList:[]
  },
  judge() {
    console.log("x0")
    let info=wx.getStorageSync('userInfo');
    if ( info.length == 0) {
      wx.showToast({
        title: '请先登陆',
        icon: 'none',
        duration: 1000,
        success: function () {
          setTimeout(function () {
            wx.switchTab({
              url: '/pages/my/my',
            })
          }, 1000);
        }
      })
      return false;
    }
    return true;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getMovie',
      // 传给云函数的参数
      data: {
      },
      success: function (res) {
        console.log(res.result.list);
        that.setData({
          showList:res.result.list
        })
      },
      fail: console.error
    })
  },
  golist:function(){
    if(!this.judge()) 
      return;
    wx.navigateTo({
      url: '/pages/movieList/movieList',
    })
  },
  gorec:function(){
    wx.navigateTo({
      url: '/pages/rec/rec',
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
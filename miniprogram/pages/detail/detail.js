// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie:{}
  },

  initMovie:function(movie_id){
    let that=this
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getAMovie',
      // 传给云函数的参数
      data: {
        movie_id
      },
      success: function (res) {
        console.log(res.result.data[0]);
        that.setData({
          movie:res.result.data[0]
        })
      },
      fail: console.error
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(id) {
    let movie_id = id.movie_id;
    // console.log(movie_id)
    this.initMovie(movie_id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
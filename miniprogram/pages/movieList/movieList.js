// pages/home/home.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showList:[],
    answer:[],
    current:0
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
  nextImg(e){
    let that=this
    let id=wx.getStorageSync('openId')
    if(that.data.current==9){
      var date = new Date();
      //http (xxx).
      db.collection('recommand').where({
        userId: id,
      }).get().then(res => {
        // res.data 包含该记录的数据
        console.log(res.data)
        if (!res.data.length) {
          console.log("new");
          db.collection('recommand').add({
            data: {
              userId:id,
              data:that.data.answer,
              date: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
            }
          })
        } else {
          console.log("old")
          db.collection('recommand').where({
            userId: id,
          }).update({
            data: {
              userId:id,
              data:that.data.answer,
              date: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
            }
          })
        }

        wx.showToast({
          title: '提交成功',
          duration: 1000,
          success: function () {
            setTimeout(function () {
              wx.switchTab({
                url: '/pages/home/home',
              })
            }, 1000);
          }
        })
      })
    }
    let cur = this.data.current
    this.data.current = cur < 9 ? cur + 1 : 9;
    that.setData({
      current:this.data.current
    })
    let tmp=that.data.answer
    console.log(e.currentTarget.dataset.num)
    let A={}
    A.movieId=e.currentTarget.dataset.id;
    A.prefer=e.currentTarget.dataset.num
    tmp.push(A);
    that.setData({
      answer:tmp
    })
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
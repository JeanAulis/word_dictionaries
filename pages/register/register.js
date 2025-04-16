Page({
  data: {
    // 删除 user_num
    user_passwd: '',
    user_name: '',
    user_email: ''
  },
  onInputUserPasswd(e) {
    this.setData({ user_passwd: e.detail.value });
  },
  onInputUserName(e) {
    this.setData({ user_name: e.detail.value });
  },
  onInputUserEmail(e) {
    this.setData({ user_email: e.detail.value });
  },
  onRegister() {
    wx.request({
      url: 'https://你的服务器地址/api/register',
      method: 'POST',
      data: {
        // 不传 user_num
        user_passwd: this.data.user_passwd,
        user_name: this.data.user_name,
        user_email: this.data.user_email
      },
      success: res => {
        if (res.data.code === 0) {
          wx.showToast({ title: '注册成功', icon: 'success' });
          wx.redirectTo({ url: '/pages/login/login' });
        } else {
          wx.showToast({ title: res.data.msg || '注册失败', icon: 'none' });
        }
      }
    });
  }
})
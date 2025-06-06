Page({
  data: {
    user_num: '',
    user_passwd: '',
    user_name: '',
    user_email: ''
  },
  onInputUserNum(e) {
    this.setData({ user_num: e.detail.value });
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
  onLogin() {
    wx.request({
      url: 'https://你的服务器地址/api/login',
      method: 'POST',
      data: {
        user_num: this.data.user_num,
        user_passwd: this.data.user_passwd
      },
      success: res => {
        if (res.data.code === 0) {
          wx.showToast({ title: '登录成功', icon: 'success' });
          // 登录成功后的跳转或处理
        } else {
          wx.showToast({ title: res.data.msg || '登录失败', icon: 'none' });
        }
      }
    });
  },
  goRegister() {
    wx.navigateTo({
      url: '/pages/register/register'
    });
  }
})
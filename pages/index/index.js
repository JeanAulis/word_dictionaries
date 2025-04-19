// index.js
Page({
  data: {
    keyword: '',
    cyList: [],
    loading: false,
    error: false,
    errorMsg: '',
    searched: false,
    showDetail: false,
    currentCy: null
  },
  
  
  onInputChange(e) {
    this.setData({
      keyword: e.detail.value
    });
  },
  
  onInputConfirm(e) {
    this.searchCy();
  },
  
  searchCy() {
    const keyword = this.data.keyword.trim();
    if (!keyword) {
      wx.showToast({
        title: '请输入关键词',
        icon: 'none'
      });
      return;
    }
    
    this.setData({
      loading: true,
      error: false,
      searched: true,
      cyList: []
    });
    
    const searchUrl = `http://localhost:8124/api/cy/search?name=${encodeURIComponent(keyword)}`;
    
    wx.request({
      url: searchUrl,
      method: 'GET',
      success: (res) => {
        console.log(res.data)
        if (res.statusCode === 200 && Array.isArray(res.data)) {
          this.setData({
            cyList: res.data,
            loading: false
          });
        } else {
          this.setData({
            error: true,
            errorMsg: '查询失败，请稍后重试',
            loading: false
          });
        }
      },
      fail: (err) => {
        this.setData({
          error: true,
          errorMsg: '网络连接失败，请检查网络设置',
          loading: false
        });
      }
    });
  },
  
  viewDetail(e) {
    const cy = e.currentTarget.dataset.cy;
    this.setData({
      showDetail: true,
      currentCy: cy
    });
  },
  
  closeDetail() {
    this.setData({
      showDetail: false
    });
  },
  
})


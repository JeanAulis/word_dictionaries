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
  
  onLoad() {
    // 页面加载时，可以加载一些热门成语
    // this.loadHotCy();
  },
  
  onInputChange(e) {
    this.setData({
      keyword: e.detail.value
    });
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
    
    // 请求后端API查询成语
    wx.request({
      url: 'http://localhost:8080/word_dict_war/api/cy/search',
      data: {
        keyword: keyword
      },
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200 && res.data.success) {
          this.setData({
            cyList: res.data.data,
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
        console.error('搜索失败', err);
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
  
  // 加载热门成语示例
  loadHotCy() {
    this.setData({
      loading: true,
      error: false
    });
    
    wx.request({
      url: 'http://localhost:8080/word_dict_war/api/cy',
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200) {
          this.setData({
            cyList: res.data.slice(0, 10), // 只显示前10个
            loading: false
          });
        } else {
          this.setData({
            error: true,
            errorMsg: '加载失败，请稍后重试',
            loading: false
          });
        }
      },
      fail: (err) => {
        console.error('加载失败', err);
        this.setData({
          error: true,
          errorMsg: '网络连接失败，请检查网络设置',
          loading: false
        });
      }
    });
  }
})

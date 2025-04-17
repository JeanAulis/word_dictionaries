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
    currentCy: null,
    baseUrl: 'http://192.168.0.1:8080/word_dict' // 替换为您电脑的实际IP地址
  },
  
  onLoad() {
    // 页面加载时，可以加载一些热门成语
    // this.loadHotCy();
    
    // 动态获取本机IP地址（这只是个示例，微信小程序环境下可能无法直接获取）
    // 您需要手动替换为实际的IP地址
    this.getBaseUrl();
  },
  
  // 获取基础URL
  getBaseUrl() {
    // 在实际部署时，您应该将此URL替换为您的实际服务器地址
    // 示例：this.setData({ baseUrl: 'http://192.168.1.100:8080/word_dict' });
    
    // 开发环境下也可以尝试使用这些地址
    const possibleUrls = [
      'http://localhost:8080/word_dict',
      'http://127.0.0.1:8080/word_dict',
      // 添加您的真实IP地址
      'http://192.168.0.1:8080/word_dict'
    ];
    
    // 测试每个URL的连通性
    this.testUrls(possibleUrls, 0);
  },
  
  // 测试URL连通性
  testUrls(urls, index) {
    if (index >= urls.length) {
      console.log('无法连接到任何服务器地址');
      return;
    }
    
    wx.request({
      url: urls[index] + '/api/cy/search',
      data: { keyword: '示例' },
      method: 'GET',
      success: () => {
        console.log('成功连接到服务器：', urls[index]);
        this.setData({ baseUrl: urls[index] });
      },
      fail: () => {
        console.log('无法连接到：', urls[index]);
        this.testUrls(urls, index + 1);
      },
      timeout: 2000 // 2秒超时
    });
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
      url: this.data.baseUrl + '/api/cy/search',
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
          errorMsg: '网络连接失败，请检查网络设置或后端服务是否启动',
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
      url: this.data.baseUrl + '/api/cy',
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
          errorMsg: '网络连接失败，请检查网络设置或后端服务是否启动',
          loading: false
        });
      }
    });
  }
})

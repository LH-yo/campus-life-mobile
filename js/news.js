// 新闻页面功能
(function() {
    'use strict';
    
    var currentTab = 'all';
    var newsPage = 1;
    var isLoading = false;
    
    // 初始化
    document.addEventListener('DOMContentLoaded', function() {
        initTabs();
        initSearch();
        initLoadMore();
    });
    
    // 标签切换
    function initTabs() {
        var tabs = document.querySelectorAll('.tab-item');
        tabs.forEach(function(tab) {
            tab.addEventListener('click', function() {
                // 移除所有active
                tabs.forEach(function(t) {
                    t.classList.remove('active');
                });
                // 添加active
                this.classList.add('active');
                currentTab = this.dataset.type || 'all';
                
                // 重新加载新闻
                loadNews(currentTab);
            });
        });
    }
    
    // 搜索功能
    function initSearch() {
        window.showSearch = function() {
            var modal = document.getElementById('searchModal');
            if (modal) {
                modal.classList.add('active');
                // 聚焦输入框
                setTimeout(function() {
                    document.getElementById('searchInput').focus();
                }, 300);
            }
        };
        
        window.hideSearch = function() {
            var modal = document.getElementById('searchModal');
            if (modal) {
                modal.classList.remove('active');
            }
        };
        
        // 热门标签点击
        var hotTags = document.querySelectorAll('.hot-tag');
        hotTags.forEach(function(tag) {
            tag.addEventListener('click', function() {
                var keyword = this.textContent;
                document.getElementById('searchInput').value = keyword;
                // 执行搜索
                performSearch(keyword);
            });
        });
        
        // 搜索输入框回车
        var searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    performSearch(this.value);
                }
            });
        }
    }
    
    // 执行搜索
    function performSearch(keyword) {
        if (!keyword.trim()) return;
        
        console.log('搜索关键词：', keyword);
        // 关闭搜索弹窗
        hideSearch();
        // 这里应该调用搜索API
        showToast('搜索：' + keyword);
    }
    
    // 加载更多
    function initLoadMore() {
        var loadMore = document.getElementById('loadMore');
        if (!loadMore) return;
        
        // 监听滚动
        window.addEventListener('scroll', function() {
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
            
            // 距离底部50px时加载
            if (scrollHeight - scrollTop - clientHeight < 50) {
                loadMoreNews();
            }
        });
        
        // 点击加载更多
        loadMore.addEventListener('click', function() {
            loadMoreNews();
        });
    }
    
    // 加载更多新闻
    function loadMoreNews() {
        if (isLoading) return;
        
        isLoading = true;
        var loadMore = document.getElementById('loadMore');
        loadMore.classList.add('loading');
        loadMore.innerHTML = '<span>加载中...</span>';
        
        // 模拟加载延迟
        setTimeout(function() {
            newsPage++;
            appendNews();
            
            isLoading = false;
            loadMore.classList.remove('loading');
            loadMore.innerHTML = '<span>上拉加载更多</span>';
        }, 1000);
    }
    
    // 加载新闻
    function loadNews(type) {
        showLoading('加载中...');
        
        // 模拟API调用
        setTimeout(function() {
            hideLoading();
            showToast('已切换到：' + getTypeName(type));
        }, 500);
    }
    
    // 追加新闻
    function appendNews() {
        var newsList = document.getElementById('newsList');
        if (!newsList) return;
        
        // 模拟新的新闻数据
        var newsHTML = `
            <article class="news-item" onclick="location.href='news-detail.html?id=${newsPage}1'">
                <div class="news-main">
                    <h3>新加载的新闻标题 ${newsPage}</h3>
                    <p class="news-desc">这是通过下拉加载更多功能新增的新闻内容...</p>
                    <div class="news-footer">
                        <span class="news-source">教务处</span>
                        <span class="news-time">刚刚</span>
                        <span class="news-stats">100阅读</span>
                    </div>
                </div>
            </article>
        `;
        
        // 添加到列表
        newsList.insertAdjacentHTML('beforeend', newsHTML);
    }
    
    // 获取类型名称
    function getTypeName(type) {
        var typeMap = {
            'all': '全部',
            'notice': '通知公告',
            'academic': '学术动态',
            'activity': '校园活动',
            'sports': '体育赛事',
            'culture': '文化艺术'
        };
        return typeMap[type] || '全部';
    }
    
})();
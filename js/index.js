// 首页JavaScript
(function() {
    'use strict';
    
    var currentSlide = 1;
    var totalSlides = 3;
    var autoPlayTimer = null;
    
    // DOM加载完成后执行
    document.addEventListener('DOMContentLoaded', function() {
        initBanner();
        initQuickEntry();
        loadNews();
        loadActivities();
    });
    
    // 初始化轮播图
    function initBanner() {
        startAutoPlay();
        
        // 触摸滑动支持
        var banner = document.querySelector('.banner');
        var startX = 0;
        var endX = 0;
        
        banner.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            stopAutoPlay();
        });
        
        banner.addEventListener('touchmove', function(e) {
            endX = e.touches[0].clientX;
        });
        
        banner.addEventListener('touchend', function(e) {
            var diff = startX - endX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
            startAutoPlay();
        });
    }
    
    // 切换到指定幻灯片
    window.currentSlide = function(n) {
        showSlide(n);
    };
    
    function showSlide(n) {
        var slides = document.querySelectorAll('.swiper-slide');
        var dots = document.querySelectorAll('.dot');
        
        if (n > totalSlides) {
            currentSlide = 1;
        }
        if (n < 1) {
            currentSlide = totalSlides;
        }
        
        slides.forEach(function(slide) {
            slide.classList.remove('active');
        });
        
        dots.forEach(function(dot) {
            dot.classList.remove('active');
        });
        
        if (slides[currentSlide - 1]) {
            slides[currentSlide - 1].classList.add('active');
        }
        if (dots[currentSlide - 1]) {
            dots[currentSlide - 1].classList.add('active');
        }
    }
    
    // 下一张
    function nextSlide() {
        currentSlide++;
        if (currentSlide > totalSlides) {
            currentSlide = 1;
        }
        showSlide(currentSlide);
    }
    
    // 上一张
    function prevSlide() {
        currentSlide--;
        if (currentSlide < 1) {
            currentSlide = totalSlides;
        }
        showSlide(currentSlide);
    }
    
    // 自动播放
    function startAutoPlay() {
        stopAutoPlay();
        autoPlayTimer = setInterval(function() {
            nextSlide();
        }, 3000);
    }
    
    // 停止自动播放
    function stopAutoPlay() {
        if (autoPlayTimer) {
            clearInterval(autoPlayTimer);
            autoPlayTimer = null;
        }
    }
    
    // 初始化快捷入口
    function initQuickEntry() {
        var entries = document.querySelectorAll('.entry-item');
        
        entries.forEach(function(entry) {
            entry.addEventListener('click', function() {
                // 添加点击动画
                this.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
                
                // 记录用户使用习惯
                var entryName = this.querySelector('span').textContent;
                recordUsage(entryName);
            });
        });
    }
    
    // 记录使用习惯
    function recordUsage(name) {
        var usage = storage.get('usage') || {};
        usage[name] = (usage[name] || 0) + 1;
        storage.set('usage', usage);
    }
    
    // 加载新闻
    function loadNews() {
        // 这里模拟加载新闻数据
        // 实际项目中可以从服务器获取
        var newsData = [
            {
                id: 1,
                title: '学校举办2024年春季运动会',
                summary: '青春飞扬，活力四射。我校春季运动会于本周隆重开幕...',
                image: 'images/news1.jpg',
                time: '2小时前',
                views: 1823
            },
            {
                id: 2,
                title: '图书馆延长开放时间通知',
                summary: '为满足同学们的学习需求，图书馆将从下周起延长开放时间...',
                image: 'images/news2.jpg',
                time: '5小时前',
                views: 967
            }
        ];
        
        // 渲染新闻列表
        renderNewsList(newsData);
    }
    
    // 渲染新闻列表
    function renderNewsList(data) {
        var newsList = document.querySelector('.news-list');
        if (!newsList) return;
        
        // 清空现有内容
        newsList.innerHTML = '';
        
        data.forEach(function(item) {
            var newsItem = document.createElement('article');
            newsItem.className = 'news-item';
            newsItem.onclick = function() {
                location.href = 'news-detail.html?id=' + item.id;
            };
            
            newsItem.innerHTML = `
                <div class="news-img">
                    <img src="${item.image}" alt="新闻图片">
                </div>
                <div class="news-content">
                    <h3>${item.title}</h3>
                    <p>${item.summary}</p>
                    <div class="news-meta">
                        <span class="news-time">${item.time}</span>
                        <span class="news-views">${item.views}次浏览</span>
                    </div>
                </div>
            `;
            
            newsList.appendChild(newsItem);
        });
    }
    
    // 加载活动
    function loadActivities() {
        // 模拟活动数据
        var activities = [
            {
                id: 1,
                name: '校园音乐节',
                image: 'images/activity1.jpg',
                time: '4月15日 19:00',
                location: '大礼堂'
            },
            {
                id: 2,
                name: '篮球联赛',
                image: 'images/activity2.jpg',
                time: '4月16日 16:00',
                location: '体育馆'
            },
            {
                id: 3,
                name: '创业分享会',
                image: 'images/activity3.jpg',
                time: '4月17日 14:00',
                location: '报告厅'
            }
        ];
        
        renderActivities(activities);
    }
    
    // 渲染活动列表
    function renderActivities(data) {
        var scroll = document.querySelector('.activity-scroll');
        if (!scroll) return;
        
        scroll.innerHTML = '';
        
        data.forEach(function(item) {
            var card = document.createElement('div');
            card.className = 'activity-card';
            card.onclick = function() {
                location.href = 'activity-detail.html?id=' + item.id;
            };
            
            card.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="activity-info">
                    <h4>${item.name}</h4>
                    <p class="activity-time">📅 ${item.time}</p>
                    <p class="activity-location">📍 ${item.location}</p>
                </div>
            `;
            
            scroll.appendChild(card);
        });
    }
    
    // 下拉刷新
    var startY = 0;
    var isPulling = false;
    
    document.addEventListener('touchstart', function(e) {
        if (window.scrollY === 0) {
            startY = e.touches[0].clientY;
            isPulling = true;
        }
    });
    
    document.addEventListener('touchmove', function(e) {
        if (!isPulling) return;
        
        var currentY = e.touches[0].clientY;
        var diff = currentY - startY;
        
        if (diff > 80) {
            // 触发刷新
            refreshPage();
            isPulling = false;
        }
    });
    
    document.addEventListener('touchend', function(e) {
        isPulling = false;
    });
    
    // 刷新页面数据
    function refreshPage() {
        showLoading('刷新中...');
        
        setTimeout(function() {
            loadNews();
            loadActivities();
            hideLoading();
            showToast('刷新成功');
        }, 1000);
    }
    
})();
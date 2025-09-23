// 通用JavaScript函数
(function() {
    'use strict';
    
    // 侧边菜单控制
    window.toggleMenu = function() {
        var menu = document.getElementById('sideMenu');
        var overlay = document.querySelector('.overlay');
        
        if (!overlay) {
            // 创建遮罩层
            overlay = document.createElement('div');
            overlay.className = 'overlay';
            document.body.appendChild(overlay);
            
            // 点击遮罩关闭菜单
            overlay.addEventListener('click', function() {
                toggleMenu();
            });
        }
        
        if (menu.classList.contains('active')) {
            menu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            menu.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };
    
    // 页面加载完成后执行
    document.addEventListener('DOMContentLoaded', function() {
        // 底部导航激活状态
        setActiveNav();
        
        // 添加触摸反馈
        addTouchFeedback();
        
        // 初始化返回顶部
        initBackToTop();
        
        // 处理iOS橡皮筋效果
        handleIOSBounce();
    });
    
    // 设置当前页面的导航激活状态
    function setActiveNav() {
        var currentPage = window.location.pathname.split('/').pop() || 'index.html';
        var navItems = document.querySelectorAll('.bottom-nav .nav-item');
        
        navItems.forEach(function(item) {
            var href = item.getAttribute('href');
            if (href === currentPage) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    // 添加触摸反馈效果
    function addTouchFeedback() {
        var elements = document.querySelectorAll('.btn, .card, .entry-item');
        
        elements.forEach(function(el) {
            el.addEventListener('touchstart', function() {
                this.style.opacity = '0.7';
            });
            
            el.addEventListener('touchend', function() {
                this.style.opacity = '1';
            });
            
            el.addEventListener('touchcancel', function() {
                this.style.opacity = '1';
            });
        });
    }
    
    // 返回顶部功能
    function initBackToTop() {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        
        if (scrollTop > 300) {
            // 显示返回顶部按钮的逻辑
        }
        
        window.addEventListener('scroll', throttle(function() {
            scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            // 处理滚动事件
        }, 100));
    }
    
    // iOS橡皮筋效果处理
    function handleIOSBounce() {
        var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        if (isIOS) {
            document.body.addEventListener('touchmove', function(e) {
                // 防止整体页面滚动
            }, { passive: false });
        }
    }
    
    // 节流函数
    function throttle(func, wait) {
        var timeout;
        return function() {
            var context = this;
            var args = arguments;
            if (!timeout) {
                timeout = setTimeout(function() {
                    timeout = null;
                    func.apply(context, args);
                }, wait);
            }
        };
    }
    
    // 防抖函数
    function debounce(func, wait) {
        var timeout;
        return function() {
            var context = this;
            var args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                func.apply(context, args);
            }, wait);
        };
    }
    
    // 获取URL参数
    window.getQueryParam = function(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        }
        return null;
    };
    
    // 本地存储封装
    window.storage = {
        set: function(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch(e) {
                console.error('存储失败:', e);
            }
        },
        get: function(key) {
            try {
                var value = localStorage.getItem(key);
                return value ? JSON.parse(value) : null;
            } catch(e) {
                console.error('读取失败:', e);
                return null;
            }
        },
        remove: function(key) {
            try {
                localStorage.removeItem(key);
            } catch(e) {
                console.error('删除失败:', e);
            }
        },
        clear: function() {
            try {
                localStorage.clear();
            } catch(e) {
                console.error('清空失败:', e);
            }
        }
    };
    
    // Toast提示
    window.showToast = function(message, duration) {
        duration = duration || 2000;
        
        var toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0,0,0,0.7); color: #fff; padding: 10px 20px; border-radius: 5px; z-index: 9999; font-size: 14px;';
        
        document.body.appendChild(toast);
        
        setTimeout(function() {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s';
            setTimeout(function() {
                document.body.removeChild(toast);
            }, 300);
        }, duration);
    };
    
    // Loading加载提示
    window.showLoading = function(message) {
        message = message || '加载中...';
        
        var loading = document.createElement('div');
        loading.id = 'globalLoading';
        loading.className = 'loading-mask';
        loading.innerHTML = '<div class="loading-content"><div class="loading-spinner"></div><div>' + message + '</div></div>';
        loading.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 9998;';
        
        document.body.appendChild(loading);
    };
    
    window.hideLoading = function() {
        var loading = document.getElementById('globalLoading');
        if (loading) {
            document.body.removeChild(loading);
        }
    };
    
    // 格式化日期
    window.formatDate = function(date, format) {
        format = format || 'YYYY-MM-DD';
        var d = new Date(date);
        
        var year = d.getFullYear();
        var month = ('0' + (d.getMonth() + 1)).slice(-2);
        var day = ('0' + d.getDate()).slice(-2);
        var hours = ('0' + d.getHours()).slice(-2);
        var minutes = ('0' + d.getMinutes()).slice(-2);
        var seconds = ('0' + d.getSeconds()).slice(-2);
        
        return format
            .replace('YYYY', year)
            .replace('MM', month)
            .replace('DD', day)
            .replace('HH', hours)
            .replace('mm', minutes)
            .replace('ss', seconds);
    };
    
})();
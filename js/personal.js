// 个人中心JavaScript
(function() {
    'use strict';
    
    // 页面加载完成
    document.addEventListener('DOMContentLoaded', function() {
        loadUserInfo();
        initMenuActions();
    });
    
    // 加载用户信息
    function loadUserInfo() {
        // 从本地存储获取用户信息
        var userInfo = storage.get('userInfo');
        
        if (!userInfo) {
            // 默认用户信息
            userInfo = {
                name: '张同学',
                major: '计算机科学与技术',
                grade: '2021级',
                posts: 128,
                following: 456,
                followers: 789
            };
            // 保存到本地
            storage.set('userInfo', userInfo);
        }
        
        // 更新页面显示
        updateUserDisplay(userInfo);
    }
    
    // 更新用户显示
    function updateUserDisplay(info) {
        var username = document.querySelector('.username');
        var userinfo = document.querySelector('.user-info');
        var stats = document.querySelectorAll('.stat-num');
        
        if (username) username.textContent = info.name;
        if (userinfo) userinfo.textContent = info.major + ' · ' + info.grade;
        if (stats[0]) stats[0].textContent = info.posts;
        if (stats[1]) stats[1].textContent = info.following;
        if (stats[2]) stats[2].textContent = info.followers;
    }
    
    // 初始化菜单点击事件
    function initMenuActions() {
        // 头像编辑
        var editAvatar = document.querySelector('.edit-avatar');
        if (editAvatar) {
            editAvatar.addEventListener('click', function(e) {
                e.stopPropagation();
                showToast('更换头像功能开发中');
            });
        }
        
        // 统计项点击
        var statItems = document.querySelectorAll('.stat-item');
        statItems.forEach(function(item, index) {
            item.addEventListener('click', function() {
                var labels = ['动态', '关注', '粉丝'];
                showToast('查看' + labels[index]);
            });
        });
    }
    
    // 退出登录
    window.handleLogout = function() {
        // 显示确认对话框
        if (confirm('确定要退出登录吗？')) {
            // 清除本地存储
            storage.clear();
            // 显示提示
            showToast('已退出登录');
            // 跳转到首页
            setTimeout(function() {
                location.href = 'index.html';
            }, 1000);
        }
    };
    
    // 模拟功能点击
    var menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(function(item) {
        // 如果没有onclick属性，添加默认提示
        if (!item.getAttribute('onclick')) {
            item.addEventListener('click', function() {
                var text = this.querySelector('.menu-text').textContent;
                showToast(text + ' 功能开发中');
            });
        }
    });
    
})();
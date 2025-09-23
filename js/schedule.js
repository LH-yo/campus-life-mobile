// 课程表JavaScript
(function() {
    'use strict';
    
    var currentWeek = 8;
    var currentDay = 2; // 周二
    
    // 初始化
    document.addEventListener('DOMContentLoaded', function() {
        initDateNav();
        initWeekSelector();
        checkCurrentCourse();
    });
    
    // 初始化日期导航
    function initDateNav() {
        var dateItems = document.querySelectorAll('.date-item');
        
        dateItems.forEach(function(item, index) {
            item.addEventListener('click', function() {
                // 移除所有active
                dateItems.forEach(function(d) {
                    d.classList.remove('active');
                });
                // 添加active
                this.classList.add('active');
                currentDay = index + 1;
                
                // 加载当天课程
                loadDayCourses(currentDay);
            });
        });
    }
    
    // 初始化周选择器
    function initWeekSelector() {
        window.showWeekPicker = function() {
            // 创建周选择弹窗
            var weeks = [];
            for (var i = 1; i <= 20; i++) {
                weeks.push('第' + i + '周');
            }
            
            // 简单的选择提示
            var weekNum = prompt('请输入周数 (1-20):', currentWeek);
            if (weekNum && weekNum >= 1 && weekNum <= 20) {
                currentWeek = parseInt(weekNum);
                updateWeekDisplay();
                loadWeekCourses();
            }
        };
    }
    
    // 更新周显示
    function updateWeekDisplay() {
        var selector = document.querySelector('.week-selector');
        if (selector) {
            selector.textContent = '第' + currentWeek + '周 ▼';
        }
    }
    
    // 检查当前课程
    function checkCurrentCourse() {
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var currentTime = hours * 60 + minutes;
        
        // 课程时间表
        var schedule = [
            { start: 8 * 60, end: 9 * 60 + 40, slot: '1-2节' },
            { start: 10 * 60, end: 11 * 60 + 40, slot: '3-4节' },
            { start: 14 * 60, end: 15 * 60 + 40, slot: '5-6节' },
            { start: 16 * 60, end: 17 * 60 + 40, slot: '7-8节' },
            { start: 19 * 60, end: 20 * 60 + 40, slot: '9-10节' }
        ];
        
        // 查找当前时间段
        for (var i = 0; i < schedule.length; i++) {
            if (currentTime >= schedule[i].start && currentTime <= schedule[i].end) {
                highlightCurrentCourse(schedule[i].slot);
                break;
            }
        }
    }
    
    // 高亮当前课程
    function highlightCurrentCourse(slot) {
        var courses = document.querySelectorAll('.course-item');
        courses.forEach(function(course) {
            var timeSlot = course.querySelector('.time-slot');
            if (timeSlot && timeSlot.textContent === slot) {
                var status = course.querySelector('.course-status');
                if (status) {
                    status.classList.add('ongoing');
                    status.textContent = '进行中';
                }
            }
        });
    }
    
    // 加载某天的课程
    function loadDayCourses(day) {
        showLoading('加载课程中...');
        
        // 模拟加载
        setTimeout(function() {
            hideLoading();
            var days = ['', '周一', '周二', '周三', '周四', '周五', '周六', '周日'];
            showToast('已切换到' + days[day] + '的课程');
        }, 300);
    }
    
    // 加载某周的课程
    function loadWeekCourses() {
        showLoading('加载第' + currentWeek + '周课程...');
        
        setTimeout(function() {
            hideLoading();
            showToast('已加载第' + currentWeek + '周课程');
        }, 500);
    }
    
    // 添加课程按钮
    var addBtn = document.querySelector('.add-course-btn');
    if (addBtn) {
        addBtn.addEventListener('click', function() {
            showToast('添加课程功能开发中');
        });
    }
    
})();
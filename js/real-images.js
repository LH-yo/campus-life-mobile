// 使用免费图片服务的真实图片URL
// 这些都是可以直接访问的真实图片

var realImages = {
    // 使用 Unsplash 免费图片服务
    banners: {
        banner1: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop', // 学校建筑
        banner2: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=400&fit=crop', // 图书馆
        banner3: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=400&fit=crop'  // 学生活动
    },
    
    // 新闻图片 - 使用 Picsum 随机图片服务
    news: {
        news1: 'https://picsum.photos/300/200?random=1', // 随机新闻图1
        news2: 'https://picsum.photos/300/200?random=2', // 随机新闻图2
        news3: 'https://picsum.photos/300/200?random=3', // 随机新闻图3
        news4: 'https://picsum.photos/300/200?random=4', // 随机新闻图4
        news5: 'https://picsum.photos/300/200?random=5'  // 随机新闻图5
    },
    
    // 活动图片
    activities: {
        activity1: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=280&h=200&fit=crop', // 音乐活动
        activity2: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=280&h=200&fit=crop', // 篮球
        activity3: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=280&h=200&fit=crop'  // 讲座
    },
    
    // 商品图片 - 使用占位符服务
    goods: {
        goods1: 'https://via.placeholder.com/300x300/4A90E2/ffffff?text=AirPods', // 耳机
        goods2: 'https://via.placeholder.com/300x300/50C878/ffffff?text=Books',    // 书籍
        goods3: 'https://via.placeholder.com/300x300/FF6B6B/ffffff?text=Scooter',  // 平衡车
        goods4: 'https://via.placeholder.com/300x300/4ECDC4/ffffff?text=Fridge',   // 冰箱
        goods5: 'https://via.placeholder.com/300x300/95E1D3/ffffff?text=Study',    // 学习资料
        goods6: 'https://via.placeholder.com/300x300/F38181/ffffff?text=Switch'    // 游戏机
    },
    
    // 用户头像 - 使用随机头像服务
    avatars: {
        default: 'https://ui-avatars.com/api/?name=User&background=4A90E2&color=fff&size=100',
        user1: 'https://i.pravatar.cc/100?img=1',
        user2: 'https://i.pravatar.cc/100?img=2',
        user3: 'https://i.pravatar.cc/100?img=3'
    },
    
    // 食堂菜品图片
    food: {
        food1: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200&h=150&fit=crop', // 汉堡
        food2: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=150&fit=crop', // 披萨
        food3: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=200&h=150&fit=crop', // 沙拉
        food4: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=200&h=150&fit=crop'  // 鸡肉
    },
    
    // 图书馆图片
    library: {
        building: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
        interior: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400&h=300&fit=crop',
        books: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=300&fit=crop'
    },
    
    // Logo
    logo: 'https://ui-avatars.com/api/?name=Campus&background=4A90E2&color=fff&size=200&rounded=true'
};

// 备用图片方案 - 使用 placeholder.com
var fallbackImages = {
    placeholder: function(width, height, text) {
        return `https://via.placeholder.com/${width}x${height}/4A90E2/ffffff?text=${encodeURIComponent(text)}`;
    },
    
    // Dummyimage 服务
    dummy: function(width, height, text) {
        return `https://dummyimage.com/${width}x${height}/4A90E2/ffffff&text=${encodeURIComponent(text)}`;
    }
};

// 使用方法：
// 1. 直接在 img 标签中使用：<img src="https://picsum.photos/300/200" alt="图片">
// 2. 或者引用上面的对象：<img src="" data-src="realImages.banners.banner1" alt="图片">

// 图片加载失败处理
function handleImageError(img) {
    // 如果图片加载失败，使用备用方案
    var width = img.width || 300;
    var height = img.height || 200;
    var text = img.alt || 'Image';
    img.src = fallbackImages.placeholder(width, height, text);
}

// 初始化真实图片
function initRealImages() {
    // 替换所有带有 data-real-image 属性的图片
    document.querySelectorAll('[data-real-image]').forEach(function(img) {
        var imageKey = img.getAttribute('data-real-image');
        var keys = imageKey.split('.');
        var imageUrl = realImages;
        
        keys.forEach(function(key) {
            imageUrl = imageUrl[key];
        });
        
        if (imageUrl) {
            img.src = imageUrl;
            img.onerror = function() {
                handleImageError(this);
            };
        }
    });
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRealImages);
} else {
    initRealImages();
}
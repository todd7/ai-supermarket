-- AI模板超市数据库表结构

-- 用户表
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    nickname VARCHAR(50),
    email VARCHAR(100),
    wechat VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 模板表
CREATE TABLE templates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    category_name VARCHAR(50) NOT NULL,
    sales INTEGER DEFAULT 0,
    upload_time DATE NOT NULL,
    cover_image VARCHAR(255) NOT NULL,
    scenario TEXT,
    server_config VARCHAR(255),
    env VARCHAR(255),
    deploy_way VARCHAR(255),
    delivery_list TEXT,
    license TEXT,
    open_source_license VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Banner表
CREATE TABLE banners (
    id SERIAL PRIMARY KEY,
    image VARCHAR(255) NOT NULL,
    title VARCHAR(100) NOT NULL,
    link VARCHAR(255) NOT NULL,
    sort INTEGER DEFAULT 0,
    status INTEGER DEFAULT 1, -- 1: 启用, 0: 禁用
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 订单表
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(20) NOT NULL UNIQUE,
    user_id INTEGER REFERENCES users(id),
    user_name VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    order_type VARCHAR(20) NOT NULL, -- template: 模板订单, deployment: 代部署订单
    amount DECIMAL(10,2) NOT NULL,
    payment_status VARCHAR(20) DEFAULT 'pending', -- pending: 待支付, paid: 已支付, cancelled: 已取消
    order_status VARCHAR(20) DEFAULT 'pending', -- pending: 待处理, processing: 处理中, delivered: 已交付, completed: 已完成, cancelled: 已取消
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 订单详情表
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER,
    product_name VARCHAR(100) NOT NULL,
    product_type VARCHAR(20) NOT NULL, -- template: 模板, deployment: 代部署服务
    quantity INTEGER DEFAULT 1,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 购物车表
CREATE TABLE cart (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    product_id INTEGER,
    product_name VARCHAR(100) NOT NULL,
    product_type VARCHAR(20) NOT NULL, -- template: 模板, deployment: 代部署服务
    price DECIMAL(10,2) NOT NULL,
    quantity INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 下载记录表
CREATE TABLE downloads (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    product_id INTEGER,
    product_name VARCHAR(100) NOT NULL,
    product_type VARCHAR(20) NOT NULL, -- template: 模板, deployment: 代部署服务
    download_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 收藏表
CREATE TABLE collections (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    product_id INTEGER,
    product_name VARCHAR(100) NOT NULL,
    product_type VARCHAR(20) NOT NULL, -- template: 模板, deployment: 代部署服务
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- FAQ表
CREATE TABLE faqs (
    id SERIAL PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    question VARCHAR(255) NOT NULL,
    answer TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 插入测试数据

-- Banner测试数据
INSERT INTO banners (image, title, link, sort, status) VALUES
('https://picsum.photos/1920/600?random=1', 'AI客服系统模板', '/templates/1', 10, 1),
('https://picsum.photos/1920/600?random=2', '企业知识库模板', '/templates/2', 20, 1),
('https://picsum.photos/1920/600?random=3', '代部署服务', '/deployment', 30, 1);

-- 模板测试数据
INSERT INTO templates (name, description, price, category, category_name, sales, upload_time, cover_image, scenario, server_config, env, deploy_way) VALUES
('AI文案生成工具', '基于大语言模型的文案生成工具，支持多种场景的文案创作', 99.00, 'ai-content', 'AI 文案生成', 1280, '2024-01-15', 'https://picsum.photos/400/300?random=1', '适用于市场营销、广告宣传、内容创作等场景', '1核2G内存，20G存储空间', 'Node.js 14+, MongoDB 4.0+', 'Docker容器部署'),
('智能客服系统', '基于AI的智能客服系统，支持多轮对话和知识库集成', 199.00, 'ai-customer-service', 'AI 客服', 950, '2024-01-10', 'https://picsum.photos/400/300?random=2', '适用于企业客服中心、在线咨询等场景', '2核4G内存，50G存储空间', 'Node.js 14+, MongoDB 4.0+, Redis', 'Docker容器部署'),
('企业知识库', '基于向量数据库的智能知识库，支持语义搜索', 299.00, 'ai-knowledge', '企业知识库', 680, '2024-01-05', 'https://picsum.photos/400/300?random=3', '适用于企业内部知识管理、文档检索等场景', '4核8G内存，100G存储空间', 'Python 3.8+, PostgreSQL 12+, Redis', 'Docker容器部署'),
('个人博客模板', '简洁美观的个人博客模板，支持Markdown编辑', 49.00, 'blog', '个人博客 / 作品集', 820, '2023-12-28', 'https://picsum.photos/400/300?random=4', '适用于个人博主、开发者、设计师等', '1核1G内存，10G存储空间', 'Node.js 14+, MongoDB 4.0+', 'Docker容器部署'),
('播客网站模板', '专业的播客网站模板，支持音频上传和播放', 89.00, 'podcast', '播客网站', 380, '2023-12-20', 'https://picsum.photos/400/300?random=5', '适用于播客创作者、音频内容平台', '2核4G内存，100G存储空间', 'Node.js 14+, MongoDB 4.0+', 'Docker容器部署'),
('进销存系统', '简单易用的进销存管理系统，支持库存跟踪', 199.00, 'inventory', '进销存系统', 320, '2023-12-15', 'https://picsum.photos/400/300?random=6', '适用于小型企业、实体店等', '2核4G内存，50G存储空间', 'Node.js 14+, PostgreSQL 12+', 'Docker容器部署');

-- FAQ测试数据
INSERT INTO faqs (category, question, answer) VALUES
('account', '如何注册账号？', '您可以通过手机号注册账号，点击首页的注册按钮，按照提示输入手机号和验证码，设置密码即可完成注册。'),
('order', '如何查看我的订单？', '登录后进入个人中心，点击「我的订单」即可查看所有订单记录。'),
('order', '如何申请售后？', '在「我的订单」页面，找到需要售后的订单，点击「申请售后」按钮，填写售后原因和问题描述，我们会在24小时内处理。'),
('deployment', '模板如何部署？', '每个模板都包含详细的部署教程，您可以按照教程步骤进行部署。如果遇到问题，可以选择我们的代部署服务。'),
('deployment', '代部署服务包含哪些内容？', '我们的代部署服务包括环境配置、应用部署、模型配置、调试等，具体内容根据您选择的套餐不同而有所差异。'),
('template', '模板是否支持定制？', '是的，我们提供模板定制服务，您可以联系客服详细咨询定制需求。'),
('template', '模板是否可以二次开发？', '是的，购买模板后您可以根据自己的需求进行二次开发，我们提供完整的源代码。');
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { connectDB, client } from './config/db.js';

// 加载环境变量
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// 中间件
app.use(cors());
app.use(express.json());

// 连接数据库
connectDB();

// API路由

// 用户注册接口
app.post('/api/register', async (req, res) => {
  try {
    const { username, phone, password, email } = req.body;
    
    // 验证必填字段
    if (!username || !phone || !password) {
      res.status(400).json({ error: '用户名、手机号和密码不能为空' });
      return;
    }
    
    // 验证手机号格式
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      res.status(400).json({ error: '手机号格式不正确' });
      return;
    }
    
    // 检查手机号是否已注册
    const existingUser = await client.query('SELECT * FROM users WHERE phone = $1', [phone]);
    if (existingUser.rowCount > 0) {
      res.status(400).json({ error: '该手机号已注册' });
      return;
    }
    
    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // 创建用户
    const result = await client.query(
      'INSERT INTO users (username, phone, password, email) VALUES ($1, $2, $3, $4) RETURNING id, username, phone, email',
      [username, phone, hashedPassword, email]
    );
    
    const user = result.rows[0];
    
    // 生成JWT token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({ 
      success: true, 
      token, 
      user: { 
        id: user.id, 
        username: user.username, 
        phone: user.phone, 
        email: user.email 
      } 
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 用户登录接口
app.post('/api/login', async (req, res) => {
  try {
    const { phone, password, username } = req.body;
    
    // 验证必填字段
    if ((!phone && !username) || !password) {
      res.status(400).json({ error: '手机号/账号和密码不能为空' });
      return;
    }
    
    // 查找用户
    let query = 'SELECT * FROM users WHERE ';
    const params = [];
    
    if (phone) {
      query += 'phone = $1';
      params.push(phone);
    } else {
      query += 'username = $1';
      params.push(username);
    }
    
    const result = await client.query(query, params);
    
    if (result.rowCount === 0) {
      res.status(401).json({ error: '用户不存在' });
      return;
    }
    
    const user = result.rows[0];
    
    // 验证密码
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      res.status(401).json({ error: '密码错误' });
      return;
    }
    
    // 生成JWT token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({ 
      success: true, 
      token, 
      user: { 
        id: user.id, 
        username: user.username, 
        phone: user.phone, 
        email: user.email,
        nickname: user.nickname,
        wechat: user.wechat
      } 
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 模板相关接口
app.get('/api/templates', async (req, res) => {
  try {
    const { category } = req.query;
    let query = 'SELECT * FROM templates';
    const params = [];
    
    if (category) {
      query += ' WHERE category = $1';
      params.push(category);
    }
    
    query += ' ORDER BY upload_time DESC';
    
    const result = await client.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching templates:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/templates/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await client.query('SELECT * FROM templates WHERE id = $1', [id]);
    
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Template not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error fetching template:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Banner相关接口
app.get('/api/banners', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM banners WHERE status = 1 ORDER BY sort ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching banners:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 订单相关接口
app.get('/api/orders', async (req, res) => {
  try {
    const { user_id } = req.query;
    let query = 'SELECT * FROM orders';
    const params = [];
    
    if (user_id) {
      query += ' WHERE user_id = $1';
      params.push(user_id);
    }
    
    query += ' ORDER BY created_at DESC';
    
    const result = await client.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const { user_id, user_name, phone, order_type, amount, order_items } = req.body;
    
    // 生成订单ID
    const orderId = `ORD${Date.now()}`;
    
    // 开始事务
    await client.query('BEGIN');
    
    // 创建订单
    const orderResult = await client.query(
      'INSERT INTO orders (order_id, user_id, user_name, phone, order_type, amount) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      [orderId, user_id, user_name, phone, order_type, amount]
    );
    
    const orderIdValue = orderResult.rows[0].id;
    
    // 创建订单详情
    for (const item of order_items) {
      await client.query(
        'INSERT INTO order_items (order_id, product_id, product_name, product_type, quantity, price) VALUES ($1, $2, $3, $4, $5, $6)',
        [orderIdValue, item.product_id, item.product_name, item.product_type, item.quantity, item.price]
      );
    }
    
    // 提交事务
    await client.query('COMMIT');
    
    res.json({ success: true, order_id: orderId });
  } catch (error) {
    // 回滚事务
    await client.query('ROLLBACK');
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 购物车相关接口
app.get('/api/cart', async (req, res) => {
  try {
    const { user_id } = req.query;
    
    if (!user_id) {
      res.status(400).json({ error: 'User ID is required' });
      return;
    }
    
    const result = await client.query('SELECT * FROM cart WHERE user_id = $1', [user_id]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/cart', async (req, res) => {
  try {
    const { user_id, product_id, product_name, product_type, price, quantity } = req.body;
    
    // 检查购物车中是否已存在该商品
    const existingItem = await client.query(
      'SELECT * FROM cart WHERE user_id = $1 AND product_id = $2 AND product_type = $3',
      [user_id, product_id, product_type]
    );
    
    if (existingItem.rowCount > 0) {
      // 更新数量
      await client.query(
        'UPDATE cart SET quantity = quantity + $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
        [quantity, existingItem.rows[0].id]
      );
    } else {
      // 添加新商品
      await client.query(
        'INSERT INTO cart (user_id, product_id, product_name, product_type, price, quantity) VALUES ($1, $2, $3, $4, $5, $6)',
        [user_id, product_id, product_name, product_type, price, quantity]
      );
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 下载记录相关接口
app.get('/api/downloads', async (req, res) => {
  try {
    const { user_id } = req.query;
    
    if (!user_id) {
      res.status(400).json({ error: 'User ID is required' });
      return;
    }
    
    const result = await client.query('SELECT * FROM downloads WHERE user_id = $1 ORDER BY download_time DESC', [user_id]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching downloads:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 收藏相关接口
app.get('/api/collections', async (req, res) => {
  try {
    const { user_id } = req.query;
    
    if (!user_id) {
      res.status(400).json({ error: 'User ID is required' });
      return;
    }
    
    const result = await client.query('SELECT * FROM collections WHERE user_id = $1', [user_id]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching collections:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/collections', async (req, res) => {
  try {
    const { user_id, product_id, product_name, product_type } = req.body;
    
    // 检查是否已收藏
    const existingItem = await client.query(
      'SELECT * FROM collections WHERE user_id = $1 AND product_id = $2 AND product_type = $3',
      [user_id, product_id, product_type]
    );
    
    if (existingItem.rowCount > 0) {
      res.json({ success: true, message: 'Already collected' });
    } else {
      // 添加收藏
      await client.query(
        'INSERT INTO collections (user_id, product_id, product_name, product_type) VALUES ($1, $2, $3, $4)',
        [user_id, product_id, product_name, product_type]
      );
      res.json({ success: true });
    }
  } catch (error) {
    console.error('Error adding to collection:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// FAQ相关接口
app.get('/api/faqs', async (req, res) => {
  try {
    const { category } = req.query;
    let query = 'SELECT * FROM faqs';
    const params = [];
    
    if (category) {
      query += ' WHERE category = $1';
      params.push(category);
    }
    
    const result = await client.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching faqs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
import { Client } from 'pg';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

// 数据库连接配置
const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: false
};

// 创建数据库客户端
const client = new Client(config);

// 连接数据库
async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL database');
  } catch (error) {
    console.error('Error connecting to database:', error);
    process.exit(1);
  }
}

// 断开数据库连接
async function disconnectDB() {
  try {
    await client.end();
    console.log('Disconnected from PostgreSQL database');
  } catch (error) {
    console.error('Error disconnecting from database:', error);
  }
}

export {
  client,
  connectDB,
  disconnectDB
};
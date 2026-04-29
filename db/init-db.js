import { Client } from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// 加载环境变量
dotenv.config();

// 数据库连接配置
const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'postgres' // 连接到默认的postgres数据库
};

// 初始化数据库
async function initDatabase() {
  const client = new Client(config);
  
  try {
    // 连接到数据库
    await client.connect();
    console.log('Connected to PostgreSQL server');
    
    // 检查数据库是否存在
    const dbExistsResult = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [process.env.DB_NAME]
    );
    
    if (dbExistsResult.rowCount === 0) {
      // 创建数据库
      await client.query(`CREATE DATABASE ${process.env.DB_NAME}`);
      console.log(`Database ${process.env.DB_NAME} created successfully`);
    } else {
      console.log(`Database ${process.env.DB_NAME} already exists`);
    }
    
    // 关闭连接
    await client.end();
    
    // 连接到新创建的数据库
    const appConfig = {
      ...config,
      database: process.env.DB_NAME
    };
    
    const appClient = new Client(appConfig);
    await appClient.connect();
    console.log(`Connected to ${process.env.DB_NAME} database`);
    
    // 读取并执行SQL脚本
    const sqlScript = fs.readFileSync('./db/schema.sql', 'utf8');
    
    // 执行SQL脚本
    await appClient.query(sqlScript);
    console.log('Database schema created successfully');
    
    // 关闭连接
    await appClient.end();
    
    console.log('Database initialization completed');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

// 执行初始化
initDatabase();
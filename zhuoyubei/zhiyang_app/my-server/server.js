import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mysql from 'mysql2/promise';

const app = express();
app.use(cors({ origin: 'http://localhost:5173' })); // 允许前端访问
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

//  创建数据库连接池
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',        
  password: 'yao20061105', 
  database: 'my_app',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

//  测试数据库连接
app.get('/api/test-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '数据库连接失败' });
  }
});

//  获取单个用户信息
app.get('/api/user/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: '用户不存在' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: '查询失败' });
  }
});

//  更新用户信息
app.post('/api/user/:id', async (req, res) => {
  const { nickname, gender, phone } = req.body;
  try {
    await pool.query(
      'UPDATE users SET nickname = ?, gender = ?, phone = ? WHERE id = ?',
      [nickname, gender, phone, req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: '更新失败' });
  }
});

//  启动服务
app.listen(5000, () => {
  console.log(' 服务器已启动：http://localhost:5000');
});

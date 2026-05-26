// 既然缓存里是 V3，那我们就彻底顺从 V3 的语法，绝对不使用 new Server
const { createServer } = require('@waline/vercel');

// 直接把数据库对象硬编码传进去，彻底无视 Netlify 的环境变量系统
const waline = createServer({
  db: 'postgres',
  dbConfig: {
    dialect: 'postgres',
    host: 'aws-1-ap-southeast-1.pooler.supabase.com',
    port: 6543,
    username: 'postgres.hsuhbblpodwkxzxmqbbc',
    password: 'pY@.$GwntmikTS9', // 原始密码，不需要任何 URL 转义
    database: 'postgres',
    ssl: { rejectUnauthorized: false },
    schema: 'public'
  }
});

// 直接导出这个处理函数
exports.handler = waline;

// 【第一步】在引入包之前，强行在 Node.js 全局进程中伪造它需要的所有环境变量
process.env.W_DB = 'postgres';
process.env.POSTGRES_URL = 'postgresql://postgres.hsuhbblpodwkxzxmqbbc:pY%40.$GwntmikTS9@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres';

// 【第二步】此时再引入包，它内部的 config.js 就能顺利读到变量，绝对不会再崩溃
const walineNext = require('@waline/vercel');

// 【第三步】根据日志导出的 "function"，直接调用它并传入直连配置
const dbConfig = {
  db: 'postgres',
  dbConfig: {
    dialect: 'postgres',
    host: 'aws-1-ap-southeast-1.pooler.supabase.com',
    port: 5432,
    username: 'postgres.hsuhbblpodwkxzxmqbbc',
    password: 'pY@.$GwntmikTS9', // 这里用原始密码
    database: 'postgres',
    ssl: { rejectUnauthorized: false },
    schema: 'public'
  }
};

// 动态适配这个导出的函数
module.exports = typeof walineNext.createServer === 'function' 
  ? walineNext.createServer(dbConfig) 
  : walineNext(dbConfig);

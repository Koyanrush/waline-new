// 既然 Vercel 缓存里死活是 V3，那我们就用 V3 的 createServer 语法
const { createServer } = require('@waline/vercel');

// 直接把完整的数据库对象作为参数传进去，彻底无视、绕过 Vercel 的环境变量系统
module.exports = createServer({
  db: 'postgres',
  dbConfig: {
    dialect: 'postgres',
    host: 'aws-1-ap-southeast-1.pooler.supabase.com',
    port: 5432,                      // 直连 5432 端口
    username: 'postgres.hsuhbblpodwkxzxmqbbc',
    password: 'pY@.$GwntmikTS9',     // 原始密码，不需要任何转义
    database: 'postgres',
    ssl: { rejectUnauthorized: false },
    schema: 'public'
  }
});

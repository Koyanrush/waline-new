const { Server } = require('@waline/vercel');

const waline = new Server({
  db: 'postgres',
  dbConfig: {
    dialect: 'postgres',
    host: 'aws-1-ap-southeast-1.pooler.supabase.com',
    port: 5432, // 用回你最纯净的 5432 端口
    username: 'postgres.hsuhbblpodwkxzxmqbbc',
    password: 'pY@.$GwntmikTS9', // 在 V2 代码对象里，直接写原始密码，不需要转义
    database: 'postgres',
    ssl: { rejectUnauthorized: false },
    schema: 'public'
  }
});

module.exports = waline.netlify;

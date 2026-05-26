const { Server } = require('@waline/vercel');

const waline = new Server({
  db: 'postgres',
  dbConfig: {
    dialect: 'postgres',
    host: 'aws-1-ap-southeast-1.pooler.supabase.com',
    port: 6543,
    username: 'postgres.hsuhbblpodwkxzxmqbbc',
    password: 'pY@.$GwntmikTS9', // 经典版直连，这里直接放原始密码，完全不需要转义
    database: 'postgres',
    ssl: { rejectUnauthorized: false },
    schema: 'public'
  }
});

// 经典版在 Netlify 上的专属导出接口
exports.handler = waline.netlify;

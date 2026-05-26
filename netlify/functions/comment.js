const { Server } = require('@waline/cloud');

// 纯净配置，直接跳过任何平台的环境变量扫描
const waline = new Server({
  db: 'postgres',
  dbConfig: {
    dialect: 'postgres',
    host: 'aws-1-ap-southeast-1.pooler.supabase.com',
    port: 6543,
    username: 'postgres.hsuhbblpodwkxzxmqbbc',
    password: 'pY@.$GwntmikTS9', // 独立包不需要转义，直接用原始密码
    database: 'postgres',
    ssl: { rejectUnauthorized: false },
    schema: 'public'
  }
});

// 导出 Netlify 云函数标准的 handler
exports.handler = waline.netlify;

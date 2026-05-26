const walineNext = require('@waline/vercel');

// 直接在代码里定义，不走环境变量
const dbConfig = {
  db: 'postgres',
  // 完美拼接你的所有 Supabase 数据库信息
  dbConfig: {
    dialect: 'postgres',
    host: 'aws-1-ap-southeast-1.pooler.supabase.com',
    port: 6543,
    username: 'postgres.hsuhbblpodwkxzxmqbbc',
    password: 'pY@.$GwntmikTS9', // 在代码里不需要转义，直接写原始密码
    database: 'postgres',
    ssl: { rejectUnauthorized: false },
    schema: 'public'
  }
};

let handler;

try {
  if (typeof walineNext.createServer === 'function') {
    handler = walineNext.createServer(dbConfig);
  } else if (walineNext.default && typeof walineNext.default.createServer === 'function') {
    handler = walineNext.default.createServer(dbConfig);
  } else if (typeof walineNext === 'function') {
    handler = walineNext(dbConfig);
  } else {
    handler = async () => ({ statusCode: 500, body: "Waline core mismatch" });
  }
} catch (err) {
  handler = async () => ({ statusCode: 500, body: err.message });
}

exports.handler = handler;

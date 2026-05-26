// 强行注入环境变量，彻底堵死 Waline 底层的校验错误
process.env.W_DB = 'postgres';
process.env.NETLIFY = 'true';
process.env.DATABASE_URL = 'postgresql://postgres.hsuhbblpodwkxzxmqbbc:pY%40.$GwntmikTS9@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true';

const walineNext = require('@waline/vercel');

const dbConfig = {
  db: 'postgres',
  dbConfig: {
    dialect: 'postgres',
    host: 'aws-1-ap-southeast-1.pooler.supabase.com',
    port: 6543,
    username: 'postgres.hsuhbblpodwkxzxmqbbc',
    password: 'pY@.$GwntmikTS9',
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

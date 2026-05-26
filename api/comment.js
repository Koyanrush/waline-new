const walineNext = require('@waline/vercel');

// 打印一下当前的 walineNext 到底导出了什么，在日志里一目了然
console.log('Waline Export Target:', typeof walineNext, Object.keys(walineNext || {}));

// 无论你是数据库对象直连，还是走环境变量，配置对象都先备好
const dbConfig = {
  db: 'postgres',
  dbConfig: {
    dialect: 'postgres',
    host: 'aws-1-ap-southeast-1.pooler.supabase.com',
    port: 5432,
    username: 'postgres.hsuhbblpodwkxzxmqbbc',
    password: 'pY@.$GwntmikTS9',
    database: 'postgres',
    ssl: { rejectUnauthorized: false },
    schema: 'public'
  }
};

let handler;

// 开启全自动无缝兼容匹配
if (typeof walineNext.createServer === 'function') {
  // 如果是标准的 V3
  handler = walineNext.createServer(dbConfig);
} else if (walineNext.Server && typeof walineNext.Server === 'function') {
  // 如果是标准的 V2 构造函数
  handler = new walineNext.Server(dbConfig).netlify;
} else if (typeof walineNext === 'function') {
  // 如果它本身就是一个直接可以 new 的构造函数 (部分魔改版)
  try {
    handler = new walineNext(dbConfig).netlify;
  } catch(e) {
    handler = walineNext(dbConfig);
  }
} else if (walineNext.default) {
  // 如果是带有 .default 的 ESM 混淆包
  if (typeof walineNext.default.createServer === 'function') {
    handler = walineNext.default.createServer(dbConfig);
  } else if (typeof walineNext.default === 'function') {
    handler = new walineNext.default(dbConfig).netlify;
  }
}

// 保底兜底：如果上面全翻车了，至少别让服务死掉
if (!handler) {
  handler = async (req, res) => {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Waline matching failed", exports: Object.keys(walineNext || {}) })
    };
  };
}

module.exports = handler;

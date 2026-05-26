const walineNext = require('@waline/vercel');

let handler;

try {
  // 1. 尝试 V3 官方的标准工厂函数
  if (typeof walineNext.createServer === 'function') {
    handler = walineNext.createServer({ db: 'postgres' });
  } 
  // 2. 尝试某些打包环境下可能出现的 default 嵌套
  else if (walineNext.default && typeof walineNext.default.createServer === 'function') {
    handler = walineNext.default.createServer({ db: 'postgres' });
  } 
  // 3. 尝试直接把引入的模块当作函数执行（V2 或部分云函数包装形式）
  else if (typeof walineNext === 'function') {
    handler = walineNext({ db: 'postgres' });
  } 
  // 4. 终极兜底：直接抛出模块里到底有什么，抓出内鬼
  else {
    throw new Error(`Waline module keys: ${Object.keys(walineNext).join(', ')}. Type: ${typeof walineNext}`);
  }
} catch (err) {
  handler = async (event, context) => {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Waline Initialization Failed",
        message: err.message,
        stack: err.stack
      })
    };
  };
}

exports.handler = handler;

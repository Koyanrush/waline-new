const WalineModule = require('@waline/vercel');

// 自动兼容 V2 和 V3 的不同导出结构
const createServer = WalineModule.createServer || WalineModule.default?.createServer;
const Server = WalineModule.Server || WalineModule.default?.Server;

let walineHandler;

if (typeof createServer === 'function') {
  // 新版 V3 架构
  walineHandler = createServer({ db: 'postgres' });
} else if (typeof Server === 'function') {
  // 旧版 V2 架构
  walineHandler = new Server({ db: 'postgres' }).netlify;
} else if (typeof WalineModule === 'function') {
  // 备用直接运行架构
  walineHandler = WalineModule({ db: 'postgres' });
} else {
  // 终极兜底，直接把整个模块作为函数尝试
  walineHandler = typeof WalineModule.netlify === 'function' ? WalineModule.netlify : WalineModule;
}

exports.handler = walineHandler;

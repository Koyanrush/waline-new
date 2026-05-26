const { Server } = require('@waline/vercel');

const waline = new Server({
  db: 'postgres',
});

exports.handler = waline.netlify;

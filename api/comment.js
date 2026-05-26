const { Server } = require('@waline/vercel');

const waline = new Server({
  db: 'postgres',
});

module.exports = waline.netlify;

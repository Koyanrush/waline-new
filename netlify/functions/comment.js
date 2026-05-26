const { createServer } = require('@waline/vercel');

const waline = createServer({
  db: 'postgres',
});

exports.handler = waline;

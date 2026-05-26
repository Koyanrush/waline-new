const { createServer } = require('@waline/vercel');

module.exports = createServer({
  db: 'postgres'
});

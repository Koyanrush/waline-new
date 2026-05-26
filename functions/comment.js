const { Server } = require('@waline/cloud');

const waline = new Server({
  db: 'postgres',
});

exports.handler = waline.netlify;

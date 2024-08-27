const jsonServer = require('json-server');
const server = jsonServer.default();
const port = 3000; // You can change this port if needed

server.use(jsonServer.router('db.json'));
server.use(jsonServer.rewriter({ '/api/*': '/$1' }));

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
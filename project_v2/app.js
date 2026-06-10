const http = require("http");
const requestListener = require("./server");
const server = http.createServer(requestListener);

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`server run, on: ${PORT}`);
});

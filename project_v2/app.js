require("dotenv").config();

const http = require("http");
const requestListener = require("./server");
const server = http.createServer(requestListener);

const PORT = process.env.PORT || 3000;

server.listen(PORT, '0,0,0,0',() => {
  console.log(`server run, on: ${PORT}`);
});

require("dotenv").config();

const http = require("http");
const requestListener = require("./server");
const server = http.createServer(requestListener);

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`server run, on: ${PORT}`);
});

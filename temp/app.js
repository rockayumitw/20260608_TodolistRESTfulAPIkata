const http = require("http");
const requestListener = require("./server");

const server = http.createServer(requestListener);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`伺服器正在主機上運行，連接埠：${PORT}`);
});

// temp/server.js
const todoController = require("./todoController");
const errorHandle = require("./errorHandle");

const headers = {
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, Content-Length, X-Requested-With",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "PATCH, POST, GET, OPTIONS, DELETE",
  "Content-Type": "application/json",
};

const routes = {
  "GET /todos": (req, res, body) => todoController.getTodos(res, headers),
  "DELETE /todos": (req, res, body) => todoController.deleteTodos(res, headers),
  "POST /todos": (req, res, body) =>
    todoController.createTodo(req, res, body, headers),
  "PUT /todos": (req, res, body) =>
    todoController.updateTodo(req, res, body, headers),
};

const requestListener = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    if (req.method === "OPTIONS") {
      res.writeHead(200, headers);
      return res.end();
    }

    const routeKey = `${req.method} ${req.url}`;

    // 1. 先比對完全匹配的路由 (GET, POST, DELETE 全部)
    if (routes[routeKey]) {
      routes[routeKey](req, res, body);
    }
    // 2. 新增：如果網址是 PATCH /todos/ 開頭，代表是要編輯單一項目
    else if (req.url.startsWith("/todos/") && req.method === "PATCH") {
      todoController.updateTodo(req, res, body, headers);
    }
    // 3. 都不匹配就是 404
    else {
      errorHandle(res, 404, "無此網站路由", headers);
    }
  });
};

module.exports = requestListener;

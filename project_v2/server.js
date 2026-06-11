const todoController = require("./todoController");
const { successHandle, errorHandle, headers } = require("./responseHandle");

const routes = {
  "GET /todos": (req, res, body) => todoController.getTodos(res),
  "POST /todo": (req, res, body) => todoController.createTodo(req, res, body),
  "PATCH /todo": (req, res, body) => todoController.updateTodo(req, res, body),
  "DELETE /todo": (req, res, body) => todoController.deleteTodo(req, res, body),
  "DELETE /todos": (req, res, body) =>
    todoController.deleteTodos(req, res, body),
};

const requestListener = (req, res) => {
  let body = "";
  req.on("data", (c) => {
    body += c;
  });

  req.on("end", () => {
    if (req.method == "OPTIONS") {
      res.writeHead(200, headers);
      return res.end();
    }

    const routeKey = `${req.method} ${req.url}`;
    console.log(routeKey);

    if (routes[routeKey]) {
      routes[routeKey](req, res, body);
    } else if (req.url.startsWith("/todo/") && req.method == "PATCH") {
      todoController.updateTodo(req, res, body);
    } else if (req.url.startsWith("/todo/") && req.method == "DELETE") {
      todoController.deleteTodo(req, res, body);
    } else {
      errorHandle(res, 404, "無此路由");
    }
  });
};

module.exports = requestListener;

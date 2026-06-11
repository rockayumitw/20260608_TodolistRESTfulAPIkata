const crypto = require("crypto");
const todos = require("./data");

const { successHandle, errorHandle } = require("./responseHandle");

const todoController = {
  getTodos(res) {
    successHandle(res, 200, todos, "撈取成功");
  },
  createTodo(req, res, body) {
    try {
      const { title } = JSON.parse(body);
      if (!title || title.trim() === "") {
        return errorHandle(res, 400, "欄位填寫不正確或 title 不得為空");
      }

      todos.push({
        id: crypto.randomUUID(),
        title,
      });
      successHandle(res, 200, todos, "新增成功");
    } catch (e) {
      errorHandle(res, 400, "非正確的JSON格式或伺服器出錯");
    }
  },
  updateTodo(req, res, body) {
    try {
      const { title } = JSON.parse(body);
      if (!title || title.trim() === "") {
        return errorHandle(res, 400, "欄位填寫不正確或 title 不得為空");
      }

      const id = req.url.split("/").pop();
      const idx = todos.findIndex((todo) => todo.id === id);

      if (idx != -1) {
        todos[idx].title = title;
        successHandle(res, 200, todos, "更新成功");
      } else {
        errorHandle(res, 400, "找不到此ID");
      }
    } catch (e) {
      errorHandle(res, 400, "伺服器出錯");
    }
  },
  deleteTodo(req, res, body) {
    try {
      const id = req.url.split("/").pop();
      const idx = todos.findIndex((todo) => todo.id === id);
      if (idx != -1) {
        todos.splice(idx, 1);
        successHandle(res, 200, todos, "刪除成功");
      } else {
        errorHandle(res, 400, "找不到此ID");
      }
    } catch (e) {
      errorHandle(res, 400, "伺服器出錯");
    }
  },
  deleteTodos(req, res, body) {
    todos.length = 0;
    successHandle(res, 200, todos, "刪除成功");
  },
};

module.exports = todoController;

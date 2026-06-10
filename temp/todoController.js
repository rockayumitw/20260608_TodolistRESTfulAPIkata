// temp/todoController.js
const crypto = require('crypto');
const todos = require('./data');
const successHandle = require('./successHandle');
const errorHandle = require('./errorHandle');

const todoController = {
  getTodos(res, headers) {
    successHandle(res, 200, todos, '撈取成功', headers);
  },

  deleteTodos(res, headers) {
    todos.length = 0;
    successHandle(res, 200, todos, '刪除成功', headers);
  },

  createTodo(req, res, body, headers) {
    try {
      const { title } = JSON.parse(body);
      if (!title || title.trim() === '') {
        return errorHandle(res, 400, '欄位填寫不正確，title 不能為空', headers);
      }
      const newTodo = { id: crypto.randomUUID(), title };
      todos.push(newTodo);
      successHandle(res, 200, todos, '新增成功', headers);
    } catch {
      errorHandle(res, 400, '非正確的 JSON 格式或伺服器出錯', headers);
    }
  },

  // 📝 新增：編輯單一 Todo
  updateTodo(req, res, body, headers) {
    try {
      const { title } = JSON.parse(body);
      if (!title || title.trim() === '') {
        return errorHandle(res, 400, '欄位填寫不正確，title 不能為空', headers);
      }

      // 從網址切出 ID，例如 "/todos/123-456" -> "123-456"
      const id = req.url.split('/').pop(); 
      const index = todos.findIndex(todo => todo.id === id);

      if (index !== -1) {
        todos[index].title = title; // 更新資料
        successHandle(res, 200, todos, '更新成功', headers);
      } else {
        errorHandle(res, 400, '找不到此 ID 的 Todo', headers);
      }
    } catch {
      errorHandle(res, 400, '非正確的 JSON 格式或伺服器出錯', headers);
    }
  }
};

module.exports = todoController;
// successHandle.js
const successHandle = (res, statusCode = 200, data, message, headers) => {
  res.writeHead(statusCode, headers);
  res.end(JSON.stringify({ status: "success", data, message }));
};

module.exports = successHandle;

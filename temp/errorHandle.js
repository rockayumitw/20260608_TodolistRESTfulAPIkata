// errorHandle.js
const errorHandle = (res, statusCode = 400, message, headers) => {
    res.writeHead(statusCode, headers);
    res.end(JSON.stringify({ status: 'false', message }));
  };
  
module.exports = errorHandle;
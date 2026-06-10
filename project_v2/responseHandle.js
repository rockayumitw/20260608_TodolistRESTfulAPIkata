const headers = {
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, Content-Length, X-Requested-With",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, PATCH, OPTIONS",
  "Content-Type": "application/json",
};

const successHandle = (res, statusCode = 200, data, message) => {
  res.writeHead(statusCode, headers);
  res.end(
    JSON.stringify({
      status: "success",
      data,
      message,
    })
  );
};

const errorHandle = (res, statusCode = 400, message) => {
  res.writeHead(statusCode, headers);
  res.end(
    JSON.stringify({
      status: "false",
      message,
    })
  );
};

module.exports = {
  successHandle,
  errorHandle,
  headers,
};

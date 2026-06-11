# API 文件

## 撈取全部列表

- path: {{localhost}}/todos
- method: get
- res:

```json
{
  "status": "success",
  "data": [
    {
      "id": "c13fe245-9e89-49be-b3e0-ca87e6f109ae",
      "title": "test"
    }
  ],
  "message": "撈取成功"
}
```

## 新增

- path: {{localhost}}/todo
- method: post
- param:

```json
{
  "title": "123"
}
```

- success response:

```json
{
  "status": "success",
  "data": [
    {
      "id": "c13fe245-9e89-49be-b3e0-ca87e6f109ae",
      "title": "test"
    },
    {
      "id": "97712362-941c-4d4b-9ac3-17c00c09ea5e",
      "title": "123"
    }
  ],
  "message": "新增成功"
}
```

- err response:

```json
{
  "status": "false",
  "message": "欄位填寫不正確或 title 不得為空"
}
```

## 編輯

- path: {{localhost}}/todo/{{id}}
- ex: {{localhost}}/todo/c13fe245-9e89-49be-b3e0-ca87e6f109ae
- method: patch
- param:

```json
{
  "title": "1111"
}
```

- success response:

```json
{
  "status": "success",
  "data": [
    {
      "id": "c13fe245-9e89-49be-b3e0-ca87e6f109ae",
      "title": "1111"
    },
    {
      "id": "97712362-941c-4d4b-9ac3-17c00c09ea5e",
      "title": "123"
    }
  ],
  "message": "更新成功"
}
```

- err response:

```json
{
  "status": "false",
  "message": "欄位填寫不正確或 title 不得為空"
}
```

## 單筆刪除

- path: {{localhost}}/todo/{{id}}
- ex: {{localhost}}/todo/c13fe245-9e89-49be-b3e0-ca87e6f109ae
- method: delete

- success response:

```json
{
  "status": "success",
  "data": [
    {
      "id": "97712362-941c-4d4b-9ac3-17c00c09ea5e",
      "title": "123"
    }
  ],
  "message": "刪除成功"
}
```

- err response

```json
{
  "status": "false",
  "message": "找不到此ID"
}
```

## 刪除全部

- path: {{localhost}}/todos
- method: delete

- success response

```json
{
  "status": "success",
  "data": [],
  "message": "刪除成功"
}
```

- err response:

```json
{
  "status": "false",
  "message": "無此路由"
}
```

#

```sql
-- 1. 班級表
CREATE TABLE classes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- 2. 老師表 (連到班級)
CREATE TABLE teachers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    salary INTEGER,
    class_id INTEGER REFERENCES classes(id)
);

-- 3. 家長/家庭表 (獨立出來，兄弟姊妹都共用這個 family_id)
CREATE TABLE parents (
    id SERIAL PRIMARY KEY,
    father_name VARCHAR(50),
    mother_name VARCHAR(50),
    phone VARCHAR(20) NOT NULL
);

-- 4. 學生表 (同時連到「班級」與「家長」)
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    sex VARCHAR(10),
    age INTEGER,
    class_id INTEGER REFERENCES classes(id),  -- 作業一、二的成果
    family_id INTEGER REFERENCES parents(id)   -- 作業三的成果（外來鍵）
);

-- 假資料
INSERT INTO classes (name) VALUES 
('三年一班'),
('三年二班'),
('四年一班');

INSERT INTO teachers (name, salary, class_id) VALUES 
('張老師', 45000, 1), -- 管 三年一班 (id: 1)
('陳老師', 48000, 2), -- 管 三年二班 (id: 2)
('林老師', 52000, 3); -- 管 四年一班 (id: 3)


INSERT INTO parents (father_name, mother_name, phone) VALUES 
('王大明', '李淑芬', '0912-345678'), -- 假設自動生成 id: 1 (王家)
('張智強', '林美玲', '0922-111222'), -- 假設自動生成 id: 2 (張家)
('劉德華', '朱麗倩', '0933-888888'); -- 假設自動生成 id: 3 (劉家)


INSERT INTO students (name, sex, age, class_id, family_id) VALUES 
-- 王家的大哥，在三年一班
('王大寶', '男', 9, 1, 1), 

-- 王家的二弟，在三年二班（跟哥哥同一個 family_id 都是 1）
('王二寶', '男', 8, 2, 1), 

-- 張家的小孩，在三年一班
('張小明', '男', 9, 1, 2), 

-- 劉家的小孩，在四年一班
('劉小美', '女', 10, 3, 3);

SELECT 
    s.name AS 學生姓名,
    s.sex AS 性別,
    c.name AS 所屬班級,
    t.name AS 班導師,
    p.father_name AS 父親姓名,
    p.phone AS 家長電話
FROM students s
INNER JOIN classes c ON s.class_id = c.id
INNER JOIN teachers t ON c.id = t.class_id
INNER JOIN parents p ON s.family_id = p.id;
```

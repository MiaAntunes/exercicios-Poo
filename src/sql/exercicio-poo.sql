-- Active: 1690391524213@@127.0.0.1@3306

CREATE TABLE video (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    title TEXT NOT NULL,
    duration_second INTEGER NOT NULL,
    date_upload TEXT DEFAULT (DATETIME()) NOT NULL
);

INSERT INTO video (id, title, duration_second)
VALUES
   ('v001', 'I am krying study database', 10);

SELECT * FROM video;
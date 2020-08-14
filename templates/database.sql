DROP TABLE IF EXISTS checkout_history;
DROP TABLE IF EXISTS copies_of_books;


DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS member;



CREATE TABLE IF NOT EXISTS member (
    id              serial primary key,
    name           varchar(16) not null,
    phone_number      varchar(128) not null,
    email       varchar(128) not null,
    adress       varchar(1000) not null
);

CREATE TABLE IF NOT EXISTS books (
    id              serial primary key,
    title           varchar(16) not null,
    author     varchar(128) not null,
    genre       varchar(128) not null,
    release_date    int not null
);

CREATE TABLE IF NOT EXISTS copies_of_books (
    id              serial primary key,
    book_id           int REFERENCES books(id) not null
);

CREATE TABLE IF NOT EXISTS checkout_history (
    id       serial primary key,
    user_id   int REFERENCES member(id) not null,
    copy_id   int REFERENCES copies_of_books(id) not null,
    return_date  date not null,
    check_in   date not null,
    check_out  date not null

);


DROP TABLE IF EXISTS checkout_history;
DROP TABLE IF EXISTS copies_of_books;


DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS member;



CREATE TABLE IF NOT EXISTS member (
    id              serial primary key,
    name           varchar(256) not null,
    phone_number      varchar(128) not null,
    email       varchar(128) not null,
    address       varchar(1000) not null
);

CREATE TABLE IF NOT EXISTS books (
    id              serial primary key,
    title           varchar(256) not null,
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
    user_id   int REFERENCnpES member(id) not null,
    copy_id   int REFERENCES copies_of_books(id) not null,
    return_date  date not null,
    check_in   date not null,
    check_out  date not null

);

INSERT INTO member ( name, phone_number, email, address)
VALUES
('book_junkie', '97560355675', 'bookie@bookz.biz', 'Sunny av.56, Mordor'),
('drunkie', '97560399775', 'elf@magicland.biz', 'Sunny av.56, Mordor'),
('book_woman', '97568885675', 'boo@bookz.biz', 'Moon av.56, Mordor'),
('traitor', '9756535675', 'monster@hotmail.biz', 'Bland street, Mordor'),
('sodalobster', '97566531675', 'lobster@bookz.biz', 'Fishy av.99 Mordor');

INSERT INTO books ( title, author, genre, release_date)
VALUES
('Harry Potter and the Sorcerers Stone','J.K.Rowling', 'Fantasy/Family', 2001),
('The Lord of the Rings: The Fellowship of the Ring', 'J. R. R. Tolkien','Adventure fiction', 2001),
('How to Win Friends and Influence People', 'Dale Carnegie', 'Self-help ',1936),
('To Kill a Mockingbird', 'Harper Lee', 'Southern Gothic' ,1960),
('The Great Gatsby', 'F. Scott Fitzgerald','Tragedy', 1925 );

INSERT INTO copies_of_books ( book_id)
VALUES 
(1),
(1),
(1),
(3),
(3),
(3),
(5);

INSERT INTO checkout_history (user_id, copy_id, return_date, check_in, check_out)
VALUES
(2, 3,'2020-10-20', '2020-08-20', '2020-09-30'),
(1, 5,'2020-09-23', '2020-09-23', '2020-10-05'),
(4, 4,'2020-09-19', '2020-08-30', '2020-08-06');

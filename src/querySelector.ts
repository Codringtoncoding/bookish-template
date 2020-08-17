import Knex from "knex";
// create new client {configuration}\dt
const client = Knex({
    client: 'pg',
    connection: {
       // user: "postgres",
        host: "localhost",
        database: "bookish",
        password: process.env.POSTGRES_PASSWORD,
    }
});

export const book_name = ( title: string) => {
    return client('books')
        .select()
        .where('title', 'like', `%${title}%`)
}

export const book_list = () => {
    return client('books')
        .select()
};

interface Book {
    title : string;
    author: string;
    genre: string;
    releaseDate: Date;
}

export const new_book = (book : Book ) => {
    return client.insert({title: book.title , author: book.author, genre: book.genre, releaseDate: book.releaseDate }).into('books')
}
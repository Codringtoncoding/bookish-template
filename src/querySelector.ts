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
import Knex from "knex";
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from "constants";
// create new client {configuration}\dt
export const client = Knex({
    client: 'pg',
    connection: {

        host: "localhost",
        database: "bookish",
        password: process.env.POSTGRES_PASSWORD,
    }
});

export const book_name = (panda: string) => {
    return client('books')
        .select()
        .where('title', 'like', `%${panda}%`)

    /*
        panda = 'to kill a mockingbird'

        SELECT * FROM books
        WHERE title like '%to kill a mockingbird%'
    */
};

export const book_list = () => {
    return client('books')
        .select()
};

//doesnt work
export const delete_book = (id: number) => {
    return client('copies_of_books')
        .delete()
        .where('book_id', id)
};
//doesnt work
export const book_removal = (id: number) => {
    console.log(id)
    return client('books')
        .delete()
        .where('id', id)
};

interface Book {
    title: string;
    author: string;
    genre: string;
    release_date: number;
};

export const new_book = (book: Book) => {
    return client.insert({ title: book.title, author: book.author, genre: book.genre, release_date: book.release_date }).into('books')
};

interface editBook{
    id: number;
    newtitle: string;
    newauthor: string;
    newgenre: string;
    newrelease : number;
}
export const editBook = (book : editBook) => {
    return client('books')
    .where('id', book.id)
    .update({title: book.newtitle, author: book.newauthor, genre: book.newgenre, release_date: book.newrelease})
}


export const get_quantity = (passedInBookId: number) => {
    return client('copies_of_books')
        .count('book_id')
        .where('book_id', passedInBookId);
}


//COUNT * FROM copies_of_books
//where book_id = passedInBookId

export const userCheckOutBook = (userId: number, copyId: number) => {

    return client('checkout_history')
        .insert({
            user_id: userId,
            copy_id: copyId,
            check_out: client.fn.now(),
            return_date: client.raw("now() + interval '7 days'")
        })
    // return client('member')
    // .join( 'checkout_history', 'member.id', 'checkout_history.user_id')
    // .join( 'copies_of_books', 'checkout_history.copy_id', 'copies_of_books.id')
    // .join( 'books', 'books.id', 'copies_of_books.book_id')
    // .w
}

export const CheckoutHistory = () => { 
    return client('checkout_history')
    .select()
}

export const UserDisplay = () => {
    return client ('member')
    .select()
}

export const GetUserByEmail = (email: string) => {
    return client('member')
    .where('email', email)
    .select()
    .first()

}

export const RegisterUser = () => {
    return client('member')
}
//SELECT * FROM members s
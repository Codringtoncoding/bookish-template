import "dotenv/config";
import express, { response, request } from "express";
import nunjucks from "nunjucks";
import sassMiddleware from "node-sass-middleware";
import { book_name, book_list, editBook, new_book, get_quantity, userCheckOutBook, CheckoutHistory, UserDisplay, book_removal } from "./querySelector"
import moment from "moment";

const app = express();

const port = process.env['PORT'] || 3000;

app.use(express.urlencoded({ extended: true }));



const srcPath = __dirname + "/../stylesheets";
const destPath = __dirname + "/../public";
app.use(
    sassMiddleware({
        src: srcPath,
        dest: destPath,
        debug: true,
        outputStyle: 'compressed',
        prefix: '',
    }),
    express.static('public')
);

const PATH_TO_TEMPLATES = "./templates/";
const env = nunjucks.configure(PATH_TO_TEMPLATES, {
    autoescape: true,
    express: app
});

env.addFilter("formatDate", (sqlDate : string)=>{
    return moment(sqlDate).format("Do MMM YYYY")})

app.get("/", (req, res) => {
    const model = {
        message: "Book Master"
    }
    res.render('index.html', model);
});

app.get("/book_list", async (req, res) => {
    const bookThing = await book_list()
    const model = {
        books: bookThing
    }
    res.render('bookTemplate.html', model);
});

app.get("/books/:name", async (request, response) => {
    const name = request.params.name
    const sqlResult = await book_name(name)
    response.json(sqlResult)


});

// app.put("/books/update", async(request, response) => {
//     const changeBook = request.body;
//     const sqlResult = await update_book(changeBook)
//     response.send('book updated')
// });
//
// app.get("/books/remove", (request, response) => {
//     response.render('removalPage.html')
// });
// //dont work
// app.post("/books/remove", async (request, response) => {
//     const removal = request.body;
//     await delete_book(removal.id)
//     await book_removal(removal.id);
//     response.send('book removed');
// });

app.delete("/books/remove", async (request, response) => {
    const deleteBook = request.body
    await book_removal(deleteBook)
    response.render('addBook.html')
});

//add books
app.get("/book/addbook", (request, response) => {
    response.render('addBook.html')
});
app.post("/book/addbook", async (request, response) => {
    const book = request.body
    await new_book(book)
    response.redirect('/book/addbook')
});

//checkout book
app.get("/book/checkout_book", async (request, response) => {
    const checkoutModel = await CheckoutHistory()
    const model = {
        checkout_history : checkoutModel
    }
    response.render('checkoutBook.html', model)
})

app.post("/book/checkout_book", async (request, response) => {
    const checkOutBookUserId = request.body.user_id;
    const checkOutCopyId = request.body.copy_id
        await userCheckOutBook(checkOutBookUserId, checkOutCopyId)
    response.redirect('/book/checkout_book')

});





//updating books

// app.get("/book/update", (request, response) => {
//     response.render('updateBook.html')
// });

// app.put("/book/update", (request, response)) => {
//     const updateBook = request.body
//     await update_book(updateBook)
//     response.send("book updated")
// });ß




app.get("/book/copies", async (request, response) => {
    const bookList = await book_list()
    const bookCopies = [];
    for (const book of bookList) {
        // Knex makes a count query return an array like this
        // [
        //    { count: 0}
        // ]
        const quantity = await get_quantity(book.id);
        bookCopies.push(
            {
                id: book.id,
                title: book.title,
                quantity: quantity[0]
            }
        )
    }

    response.render('bookCopies.html', {
        bookCopies
    });

    /*
        bookList: [
            {
                id: 1,
                name: 'Harry Plopper',
                Author: 'K.J Rawlings'
            }
        ]

        bookCopies: [
            {
                id: 1,
                quantity: 3
            }
        ]
    */
    /*
        [
            1, harry potter, author ....
            2, lord of the rings author , realease date ...
        ]
    */

    /*
        for each book in book list
        do get quanity 
    */

    // const bookCount = get_quantity() // Gets the number of copies, for any ONE book.
});

app.get("/members", async (request, response) => {
    const userThing = await UserDisplay()
    const model = {
        member : userThing
    }
        return(
        response.render('members.html', model)
    )
})

app.get("/books/edit-book", async(request, response)=>{
    return(
        response.render('editBook.html')
    )
})
app.post("/books/edit-book", async(request,response)=>{
    // const bookname = [];
    // bookname.book(
    //     {newtitle: book.title}
    // )
    const changeBook = request.body;
        await editBook(changeBook)
    response.send('book updated')
})


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
});


﻿import "dotenv/config";
import express from "express";
import nunjucks from "nunjucks";
import sassMiddleware from "node-sass-middleware";
import {book_name, book_list, new_book} from "./querySelector"

const app = express();

const port = process.env['PORT'] || 3000;

app.use (express.urlencoded({extended: true}));



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
nunjucks.configure(PATH_TO_TEMPLATES, { 
    autoescape: true,
    express: app
});

app.get("/", (req, res) => {
    const model = {
        message: "World"
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

app.get("/book/addbook", (request, response) => {
    response.render('addBook.html')
})
app.post("/book/addbook", async (request, response) =>{
    const book = request.body
    await new_book(book)
    response.send("string")
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
});


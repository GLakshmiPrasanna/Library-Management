import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.set('view engine', 'ejs');

const url="mongodb://127.0.0.1:27017/book";

mongoose.connect(url);

const bookSchema = new mongoose.Schema({
    id : {
        type : String, 
        required : true
    },
    name: {
        type : String,
        required: true
    }
});

const bookModel = mongoose.model('BookList',bookSchema);

app.get('/',(req,res)=>{
    res.render('inputPage');
});
app.post('/',(req,res)=>{
    res.render('inputPage');
});

app.get('/post',(req,res)=>{
    res.render('post');
})
app.get('/put',(req,res)=>{
    res.render('put');
})

app.get('/api/books',(req,res)=>{
    bookModel.find().then((found)=>{
        if(found.length==0)
        {
            res.send("Number of books are 0. Add atleast one book before retrieving");
        }
        else
        {
            console.log("Books retrieved successfully!");
            res.render('show',{books:found});
        }
    }).catch((err)=>{
        console.log(err);
    })
});

app.patch('/api/books/:id',(req,res)=>{
    console.log("patch api    req.body: ",req.get('Content-Type'));
    if(req.get('Content-Type') == 'application/json')
    {
        console.log("Request body is in JSON format");
        const id = req.params.id;
        bookModel.findOne({id:id}).then((found)=>{
            if(found)
            {
                bookModel.updateOne({id: id},{$set:{name:req.body.name}}).then(()=>{
                    console.log("Book updated successfully");
                    res.render('inputPage');
                }).catch((err)=>{
                    console.error("Error while updating the book",err);
                })
            }
            else
            {
                console.log("Book you are trying to update does not exist. Please add a valid book id");
                res.send("Book you are trying to update does not exist. Please add a valid book id");
            }
        }).catch((err)=>{
            console.error(err);
        })
    }
    else
    {
        console.log("Request body is in not in JSON format!");
        res.send("Request body is in not in JSON format!");
    }
});

app.post('/api/books',(req,res)=>{
    console.log("post api    req.body: ",req.get('Content-Type'));
    if(req.get('Content-Type') == 'application/x-www-form-urlencoded')
    {
        console.log(`Request body is in not in ${req.get('Content-Type')} format!`);
        req.headers['content-type'] = 'application/json';
        console.log("post api    req.body: ",req.get('Content-Type'),req.body);
    }
    if(req.get('Content-Type') == 'application/json')
    {
        console.log("Request body is now in JSON format");
        const id = req.body.id;
        const name = req.body.name;
        bookModel.findOne({id: id}).then((found)=>{
            if(!found)
            {
                const newBook = new bookModel({
                    id: id,
                    name: name
                });
                newBook.save().then(()=>{
                    console.log("New Book saved successfully");
                    res.render('inputPage');
                }).catch((err)=>{
                    console.log("Error saving the book");
                });
            }
            else{
                res.send(`Book with id ${id} already exists`);
            }
        }).catch((err)=>{
            console.log("Error while saving new book \n",err);
        });
    }
    else
    {
        console.log("Request body is in not in JSON format!");
        res.send("Request body is in not in JSON format!")
    }
});

app.listen(3000,()=>{
    console.log("Server Started !");
})

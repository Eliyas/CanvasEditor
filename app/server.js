'use strict'

const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs');
const junk = require('junk');
const uuidGenerator = require('./uuid-generator-service');
let app = express();

app.use(express.static('./'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// temp draggable db
let draggableList = [];

// define file name and destination to save
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '/images')
    },
    filename: (req, file, cb) => {
        let ext = file.originalname.split('.');
        ext = ext[ext.length - 1];
        cb(null, 'uploads-' + Date.now() + '.' + ext);
    }
});

// define what file type to accept
let filter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb('Failed: format not supported');
    }
}

// set multer config
let upload = multer({
    storage: storage,
    fileFilter: filter
}).single('upload');

/* ===============================
 ROUTE
 ============================== */

// route for file upload
app.post('/uploads', (req, res) => {
    upload(req, res, err => {
        if (err) {
            console.log(err)
            res.status(400).json({message: err});
        } else {
            res.status(200).json({
                src: req.protocol + '://' + req.get('host') + '/app/images/' + req.file.filename
            })
        }
    })
})

app.post('/save/draggable', (req, res) => {
    let body = req.body;
    if (!body) {
        res.status(400).json({message: "no data in body"});
    } else {
        let draggableInfoList = [];
        body.draggableList.forEach((draggable) => {
            draggable.id = uuidGenerator();
            draggableInfoList.push(draggable)
        });
        draggableList = draggableInfoList;
        res.status(200).json({message: "draggable saved"})
    }
})

app.get('/list/draggable', (req, res) => {
    res.status(200).json({draggableList})
})

app.get('/delete/image/:id', (req, res) => {
    let id = req.params.id;
    if (!id) {
        res.status(400).json({message: "no image id"});
    } else {
        let index = draggableList.findIndex(function (graggable) {
            return graggable.id == id;
        });
        let draggable = draggableList[index];
        try {
            let parts = draggable.src.split('/');
            let fileName = parts[parts.length - 1];
            var filePath = __dirname + '\/images\/'+ fileName;
            fs.unlinkSync(filePath);
            draggableList.splice(index, 1);
        }
        catch (err) {
            res.status(400).json({message: err});
        }
        res.status(200).json("Draggable deleted successfully");
    }
})

app.get('/delete/text/:id', (req, res) => {
    let id = req.params.id;
    if (!id) {
        res.status(400).json({message: "no id present "});
    } else {
        let index = draggableList.findIndex(function (graggable) {
            return graggable.id == id;
        });
        draggableList.splice(index, 1);
        res.status(200).json("Draggable deleted successfully");
    }
})

app.get('/images', (req, res) => {
    let file_path = req.protocol + '://' + req.get('host') + '/app/images/';
    let files = fs.readdirSync('./app/images/');
    files = files
        .filter(junk.not) // remove .DS_STORE etc
        .map(f => file_path + f); // map with url path
    res.json(files);
});

// general route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

var server = app.listen(8000, _ => {
    console.log('server started. listening to 8000');
})


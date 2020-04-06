const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

//model
class Question {
    constructor(question, answers, rightAns, uid) {
        this.question = question;
        this.answers = answers;
        this.rightAns = rightAns;
        this.qid = uid;
    }
}

//interpret JSON body of requests
app.use(express.json());

//interpret url-encoded queries
app.use(express.urlencoded({extended: false}));

//static
app.use('/css', express.static('css'));
app.use('/scripts', express.static('scripts'));
app.use('/image', express.static('image'));

//router
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.get('/questionPool', (req, res) => {
    res.sendFile(__dirname + '/questionPool.html');
});
app.get('/addQuestion', (req, res) => {
    res.sendFile(__dirname + '/addQuestion.html');
});

app.post('/questionList', (req, res) => {
    res.send(fs.readFileSync('./scripts/questionList.txt').toString());
});
app.post('/add', (req, res) => {
    let arr = JSON.parse(fs.readFileSync('./scripts/questionList.txt').toString());
    arr.push(new Question(req.body.question, req.body.answers, req.body.rightAns, req.body.uid));
    fs.writeFileSync('./scripts/questionList.txt', JSON.stringify(arr));
    res.send("ok");
})

//listen
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

//class from model.js
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

//get
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.get('/questionPool', (req, res) => {
    res.sendFile(__dirname + '/pages/questionPool.html');
});
app.get('/addQuestion', (req, res) => {
    res.sendFile(__dirname + '/pages/addQuestion.html');
});
app.get('/prepareQuiz', (req, res) => {
    res.sendFile(__dirname + '/pages/prepareQuiz.html');
});
app.get('/previewQuiz/:quizId', (req, res) => {
    res.sendFile(__dirname + '/pages/previewQuiz.html');
});
app.get('/password', (req, res) => {
    res.sendFile(__dirname + '/pages/password.html');
});
app.get('/chooseQuizToEdit', (req, res) => {
    res.sendFile(__dirname + '/pages/select_quiz/select_edit.html');
});
app.get('/chooseQuizToStart', (req, res) => {
    res.sendFile(__dirname + '/pages/select_quiz/select_start.html');
});

//post
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

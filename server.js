const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

class Quiz {
  constructor() {
    this.questions = [];
    this.participants = 0;
    this.timetaken = [];
    this.q = 0; // question tracker
  }

  // Returns next question by incrementing q(question tracker)
  getNextQuestion(){
    this.q += 1;
    return this.questions[this.q];
  }

  // Use this to get the next available questionID for any questions added.
  getNextID(){
    let count = 1;
    this.questions.forEach((question, index) => {
      if (question.getQuestionID() === count){
        count += 1;
      }
    });
    return count;
  }

  // q set to 0 number of participants incremented
  startQuiz() {
    this.q = 0;
    this.participants += 1;
    return this.questions[this.q];
  }

  // Push question object into array holding questions
  addQuestion(question) {
    this.questions.push(question);
  }

  // Removes question via index
  removeQuestion(index) {
    prev = index - 1;               // Splice requires 2 numbers
    this.questions.splice(prev, index);  // Removes anything between prev and index
  }

  // At the end of the quiz particpant time is taken
  endQuiz(participantTime) {
    timeTaken.push(participantTime);
  }

  // If a file exists containing questions setup here
  // prepareQuiz() {
  //
  // }
}

class Question {
  constructor(question, answers, rightAns, uid) {
    this.question = question;
    this.answers = answers;
    this.rightAns = rightAns;
    this.qid = uid; // TODO: randomly gen id on construct

    this.numRestarts = 0;
    this.numRight = 0;
    this.numWrong = 0;
    this.numParticipants = 0;
    this.timeTaken = 0;
  };

  amendQuestion(question, answers, rightAns) {
    this.question = question;
    this.answers = answers;
    this.rightAns = rightAns;
  };

  restart() {
    this.numRestarts += 1;
  }

  answer(correctornot) {
    if (correctornot) {
      this.numRight += 1;
    } else {
      this.numWrong += 1;
    }

    this.numParticipants += 1;
  }

  getQuestionID() {
    return this.qid;
  };

  getAnswers() {
    this.answers.forEach(function myFunction(item) {
      console.log(item);
    });
  }

  getQuestion() {
    return this.question;
  }

  getEverythingElse() {
    return "Number correct answers: " + this.numRight + ", Number wrong answers: " + this.numWrong + ", Participants: " + this.numParticipants;
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
app.get('/questionPool/:quizId', (req, res) => {
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
app.get('/editor/:quizId', (req, res) => {
    res.sendFile(__dirname + '/pages/editor_options.html');
});
app.get('/preview/:quizId', (req, res) => {
    res.sendFile(__dirname + '/pages/preview_quiz.html');
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
app.post('/pool1', (req, res) => {
    res.send(fs.readFileSync('./assets/questions/pool_1.csv').toString());
});
app.post('/pool2', (req, res) => {
    res.send(fs.readFileSync('./assets/questions/pool_2.csv').toString());
});

app.post('/add', (req, res) => {
    let arr = JSON.parse(fs.readFileSync('./scripts/questionList.txt').toString());
    arr.push(new Question(req.body.question, req.body.answers, req.body.rightAns));
    fs.writeFileSync('./scripts/questionList.txt', JSON.stringify(arr));
    res.send("ok");
})

// TODO: Rework to add a custom question
// app.post('/addcustom', (req, res) => {
//     let arr = JSON.parse(fs.readFileSync('./scripts/questionList.txt').toString());
//     arr.push(new Question(req.body.question, req.body.answers, req.body.rightAns));
//     fs.writeFileSync('./scripts/questionList.txt', JSON.stringify(arr));
//     res.send("ok");
// })

// TODO: Rework to remove a question
// app.post('/remove', (req, res) => {
//     let arr = JSON.parse(fs.readFileSync('./scripts/questionList.txt').toString());
//     arr.push(new Question(req.body.question, req.body.answers, req.body.rightAns));
//     fs.writeFileSync('./scripts/questionList.txt', JSON.stringify(arr));
//     res.send("ok");
// })

//listen
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

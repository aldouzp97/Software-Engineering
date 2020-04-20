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

// RETURN HOME
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// PASSWORD SCREEN
app.get('/password', (req, res) => {
  res.sendFile(__dirname + '/pages/password.html');
});

// OPENING EDITOR
// choose the quiz editor you'd like to open
app.get('/chooseQuizToEdit', (req, res) => {
  res.sendFile(__dirname + '/pages/select_quiz/select_edit.html');
});
// editor options screen
app.get('/editor/:quizId', (req, res) => {
  res.sendFile(__dirname + '/pages/editor_options.html');
});

// CHOOSING WHAT TO EDIT
// preview current quiz questions
app.get('/preview/:quizId', (req, res) => {
  res.sendFile(__dirname + '/pages/preview_quiz.html');
});
// prepare the quiz
app.get('/prepareQuiz/:quizId', (req, res) => {
  res.sendFile(__dirname + '/pages/prepare_quiz.html');
});
// confirm the quiz changes
app.get('/confirmQuiz/:quizId', (req, res) => {
  res.sendFile(__dirname + '/pages/confirm_quiz.html');
});
// add a question from pool
app.get('/addQuestion/:quizId', (req, res) => {
  res.sendFile(__dirname + '/pages/add_question.html');
});
// add a custom question to the pool (and quiz at the same time at the moment)
app.get('/addCustomQuestion/:quizId', (req, res) => {
  res.sendFile(__dirname + '/pages/add_custom_question.html');
});
// remove question from current quiz
app.get('/removeQuestion/:quizId', (req, res) => {
  res.sendFile(__dirname + '/pages/remove_question.html');
});
// add a custom question to the pool (and quiz at the same time at the moment)
app.get('/getStatistics/:quizId', (req, res) => {
  res.sendFile(__dirname + '/pages/statistics.html');
});

// choose quiz to start
app.get('/chooseQuizToStart', (req, res) => {
  res.sendFile(__dirname + '/pages/select_quiz/select_start.html');
});

// start a quiz
app.get('/startQuizOne', (req, res) => {
  res.sendFile(__dirname + '/pages/quiz_page.html');
});
app.get('/startQuizTwo', (req, res) => {
  res.sendFile(__dirname + '/pages/guess_quiz_page.html');
});

// finish quiz
app.get('/finishQuiz', (req, res) => {
  res.sendFile(__dirname + '/pages/finish_quiz.html');
});

//post
app.post('/notinpool1', (req, res) => {
  let pool_url = "./assets/questions/pool_1.csv";
  let quiz_url = "./assets/questions/quiz1.json";
  res.send(getQuestionsNotInQuiz(pool_url, quiz_url));
});
app.post('/notinpool2', (req, res) => {
  let pool_url = "./assets/questions/pool_2.csv";
  let quiz_url = "./assets/questions/quiz2.json";
  res.send(getQuestionsNotInQuiz(pool_url, quiz_url));
});

app.post('/inpool1', (req, res) => {
  let pool_url = "./assets/questions/pool_1.csv";
  let quiz_url = "./assets/questions/quiz1.json";
  res.send(getQuestionsInQuiz(pool_url, quiz_url));
});
app.post('/inpool2', (req, res) => {
  let pool_url = "./assets/questions/pool_2.csv";
  let quiz_url = "./assets/questions/quiz2.json";
  res.send(getQuestionsInQuiz(pool_url, quiz_url));
});

// Get all the questions from the pool for that quiz.
app.post('/pool1', (req, res) => {
  res.send(fs.readFileSync('./assets/questions/quiz_pool1.json').toString());
});
app.post('/pool2', (req, res) => {
  res.send(fs.readFileSync('./assets/questions/quiz_pool2.json').toString());
});

// Get all the questions from the quiz currently.
app.post('/quiz1', (req, res) => {
  res.send(fs.readFileSync('./assets/questions/quiz1.json').toString());
});
app.post('/quiz2', (req, res) => {
  res.send(fs.readFileSync('./assets/questions/quiz2.json').toString());
});

//add questions to temp pool before committing them
app.post('/addToTempPool', (req, res) => {
  addToTempPool(req.body);
  res.send("ok");
});

//get temp pool
app.post('/getTempPool', (req, res) => {
  res.send(fs.readFileSync('./assets/questions/temporary.json').toString());
});

//commit the temp pool questions and make them the current quiz
app.post('/commitTempPool1', (req, res) => {
  commitTempToQuiz(req.body, 1);
  res.send("ok");
});

//commit the temp pool questions and make them the current quiz
app.post('/commitTempPool2', (req, res) => {
  commitTempToQuiz(req.body, 2);
  res.send("ok");
});






app.post('/saveQuiz1', (req, res) => {
  let str = fs.readFileSync('./assets/questions/pool_1.csv').toString();
  saveQuiz(str,req.body,1);
  res.send("ok")
});
app.post('/saveQuiz2', (req, res) => {
  let str = fs.readFileSync('./assets/questions/pool_2.csv').toString();
  saveQuiz(str,req.body,2);
  res.send("ok");
});

app.post('/saveResult1', (req, res) => {
  saveResult(req.body,1);
  res.send("ok");
});
app.post('/saveResult2', (req, res) => {
  saveResult(req.body,2);
  res.send("ok");
});

app.post('/addCustom1', (req, res) => {
  addCustomQuestionToPool(req.body,1);
  addQuestionToQuiz(req.body, 1);
  res.send("ok");
});
app.post('/addCustom2', (req, res) => {
  addCustomQuestionToPool(req.body,2);
  addQuestionToQuiz(req.body, 2);
  res.send("ok");
});

app.post('/add1', (req, res) => {
  addQuestionToQuiz(req.body, 1);
  res.send("ok");
});
app.post('/add2', (req, res) => {
  addQuestionToQuiz(req.body, 2);
  res.send("ok");
});

app.post('/remove1', (req, res) => {
  removeQuestionFromQuiz(req.body, 1);
  res.send("ok");
});
app.post('/remove2', (req, res) => {
  removeQuestionFromQuiz(req.body, 2);
  res.send("ok");
});

//listen
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

function commitTempToQuiz(body, quizNumber){
  let str = fs.readFileSync('./assets/questions/temporary.json').toString();
  let parsed = JSON.parse(str);
  fs.writeFileSync('./assets/questions/quiz' + quizNumber + '.json', JSON.stringify(parsed));
}

function addToTempPool(questions) {
  tempquiz = new Quiz();
  for(var i=0;i<questions.length;i++){
    let q = questions[i];
    tempquiz.addQuestion(q);
  }
  fs.writeFileSync('./assets/questions/temporary.json', JSON.stringify(tempquiz));
}

function getQuestionsNotInQuiz(pool_url, quiz_url) {
  let newpool = "";

  let pool = fs.readFileSync(pool_url).toString();
  let quiz = JSON.parse(fs.readFileSync(quiz_url).toString());
  let pool_split = pool.split("\r\n");

  pool_split.forEach((question, index) => {
    let current_pool_question = question.split(",")[0];
    let contains = false;
    for (var i=0; i<quiz.questions.length; i++) {
      if (current_pool_question === quiz.questions[i].question) {
        contains = true;
      }
    }
    if (!contains) {
      if (index === pool_split.length-1) {
        newpool += pool_split[index];
      } else {
        newpool += pool_split[index] + "\r\n";
      }
    }
  });
  return newpool;
}

function getQuestionsInQuiz(pool_url, quiz_url) {
  let newpool = "";

  let pool = fs.readFileSync(pool_url).toString();
  let quiz = JSON.parse(fs.readFileSync(quiz_url).toString());
  let pool_split = pool.split("\r\n");

  pool_split.forEach((question, index) => {
    let current_pool_question = question.split(",")[0];
    let contains = false;
    for (var i=0; i<quiz.questions.length; i++) {
      if (current_pool_question === quiz.questions[i].question) {
        if (i === quiz.questions.length-1) {
          newpool += pool_split[index];
        } else {
          newpool += pool_split[index] + "\r\n";
        }
      }
    }
  });
  return newpool;
}

function getQuizURL(index) {
  let url;
  if (index == 1) {
    url = './assets/questions/pool_1.csv'
  } else {
    url = './assets/questions/pool_2.csv'
  }
  return url;
}

function addCustomQuestionToPool(req, index) {
  let pool_url = getQuizURL(index);
  let str = fs.readFileSync(pool_url).toString();
  let qid = str.split("\r\n").length + 1;
  str += "\r\n" + req[0] + "," + req[1][0] + "," + req[1][1] + "," + req[1][2] + "," + req[2] + "," + qid;
  fs.writeFileSync(pool_url, str);
}

function addQuestionToQuiz(req, index) {
  let qid;
  if (req.length < 4) {
    qid = str.split("\r\n").length + 1;
  } else {
    qid = req[3];
  }

  let quiz_url;
  if (index == 1) {
    url = './assets/questions/quiz1.json'
  } else {
    url = './assets/questions/quiz2.json'
  }
  let quiz = JSON.parse(fs.readFileSync(url).toString());
  quiz.questions.push(new Question(req[0], [req[1][0], req[1][1], req[1][2]], req[2], qid));
  fs.writeFileSync(url, JSON.stringify(quiz));
}

function removeQuestionFromQuiz(qid, index) {
  let url;
  if (index == 1) {
    url = './assets/questions/quiz1.json'
  } else {
    url = './assets/questions/quiz2.json'
  }
  let quiz = JSON.parse(fs.readFileSync(url).toString());
  console.log(quiz);
  for(var i = 0; i < quiz.questions.length; i++){
    console.log(quiz.questions[i].qid);
    console.log(parseInt(qid[0]));
    if (parseInt(quiz.questions[i].qid) === parseInt(qid[0])) {
      quiz.questions.splice(i, 1);
      console.log("true");
    }
  }
  console.log(quiz);
  fs.writeFileSync(url, JSON.stringify(quiz));
}

function saveQuiz(str, indexes, quizId) {
  let quiz = new Quiz();
  let split = str.split('\r\n');
  split.forEach(function (line, index) {
    let items = line.split(',');
    if (indexes.includes(items[5])) {
      quiz.addQuestion(new Question(items[0], [items[1], items[2], items[3]], items[4], items[5]));
    }
  });
  if (quizId == 1) {
    fs.writeFileSync('./assets/questions/quiz1.json', JSON.stringify(quiz));
  } else {
    fs.writeFileSync('./assets/questions/quiz2.json', JSON.stringify(quiz));
  }
}

function saveResult(body,quizId) {
  let url = './assets/questions/result_quiz'+quizId+'.json';
  let str=fs.readFileSync(url).toString();
  let arr = JSON.parse(str);
  arr.push(body);
  fs.writeFileSync(url,JSON.stringify(arr));
}
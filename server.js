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
  res.sendFile(__dirname + '/pages/editor_menu.html');
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
  res.sendFile(__dirname + '/pages/confirmation/confirm_quiz.html');
});
// confirm the quiz changes
app.get('/confirmCustomQuiz/:quizId', (req, res) => {
  res.sendFile(__dirname + '/pages/confirmation/confirm_custom_quiz.html');
});
// choose what type of question you want to add
app.get('/addChoice/:quizId', (req, res) => {
  res.sendFile(__dirname + '/pages/add_question/add_choice.html');
});
// preview questions in pool for pool question
app.get('/previewAdd/:quizId', (req, res) => {
  res.sendFile(__dirname + '/pages/add_question/add_preview.html');
});
// preview questions in pool for custom question
app.get('/previewAddCustom/:quizId', (req, res) => {
  res.sendFile(__dirname + '/pages/add_question/add_custom_preview.html');
});
// add a question from pool
app.get('/addQuestion/:quizId', (req, res) => {
  res.sendFile(__dirname + '/pages/add_question/add_question.html');
});
// add a custom question to the pool (and quiz at the same time at the moment)
app.get('/addCustomQuestion/:quizId', (req, res) => {
  res.sendFile(__dirname + '/pages/add_question/add_custom_question.html');
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

//return in question format
app.post('/getNextID', (req, res) => {
  res.send(getNextID());
});

// ADDDDDDDDDD CUSTOM
app.post('/addCustom1', (req, res) => {
  addCustomQuestionTemp(req.body, 1);
  res.send("ok");
});
app.post('/addCustom2', (req, res) => {
  addCustomQuestionTemp(req.body, 2);
  res.send("ok");
});

// REMOOOOOVEEE
app.post('/remove1', (req, res) => {
  removeQuestionFromQuiz(req.body, 1);
  res.send("ok");
});
app.post('/remove2', (req, res) => {
  removeQuestionFromQuiz(req.body, 2);
  res.send("ok");
});

//add questions to temp pool before committing them
app.post('/addToTempPool', (req, res) => {
  addToTempPool(req.body);
  res.send("ok");
});

// WORKING WITH TEMPORARY POOL
// get temp pool
app.post('/getTempPool', (req, res) => {
  res.send(fs.readFileSync('./assets/questions/temporary.json').toString());
});
// commit the temp pool questions and make them the current quiz
app.post('/commitTempPool1', (req, res) => {
  commitTempToQuiz(req.body, 1, false);
  res.send("ok");
});
// commit the temp pool questions and make them the current quiz
app.post('/commitTempPool2', (req, res) => {
  commitTempToQuiz(req.body, 2, false);
  res.send("ok");
});
// commit the temp pool questions and make them the current quiz
app.post('/commitCustomTempPool1', (req, res) => {
  commitTempToQuiz(req.body, 1, true);
  res.send("ok");
});
// commit the temp pool questions and make them the current quiz
app.post('/commitCustomTempPool2', (req, res) => {
  commitTempToQuiz(req.body, 2, true);
  res.send("ok");
});

//listen
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

function getNextID(){
  let current_questions = fs.readFileSync('./assets/questions/quiz_pool1.json').toString();
  let parsed_questions = JSON.parse(current_questions);
  return parsed_questions.length + 1;
}

function commitTempToQuiz(body, quizNumber, custom){
  let str = fs.readFileSync('./assets/questions/temporary.json').toString();
  let parsed = JSON.parse(str);
  fs.writeFileSync('./assets/questions/quiz' + quizNumber + '.json', JSON.stringify(parsed));

  if (custom) {
     let quiz_pool = JSON.parse(fs.readFileSync('./assets/questions/quiz_pool' + quizNumber + '.json').toString());
     let last_question = parsed.questions.pop();
     quiz_pool.push(last_question);
     fs.writeFileSync('./assets/questions/quiz_pool' + quizNumber + '.json', JSON.stringify(quiz_pool));
  }
}

function addToTempPool(questions) {
  tempquiz = new Quiz();
  for(var i=0;i<questions.length;i++){
    let q = questions[i];
    tempquiz.addQuestion(q);
  }
  fs.writeFileSync('./assets/questions/temporary.json', JSON.stringify(tempquiz));
}

function createCurrentTempQuiz(url) {
  let quiz = JSON.parse(fs.readFileSync(url).toString());
  let temp_quiz = new Quiz();
  quiz.questions.forEach((question, index) => {
    temp_quiz.addQuestion(question);
  });
  return temp_quiz;
}

function addCustomQuestionTemp(req, index) {
  let quiz_url;
  if (index == 1) {
    quiz_url = './assets/questions/quiz1.json'
  } else {
    quiz_url = './assets/questions/quiz2.json'
  }
  let temp_quiz = createCurrentTempQuiz(quiz_url);
  temp_quiz.addQuestion(new Question(req[0], [req[1][0], req[1][1], req[1][2]], req[2], getNextID()));
  fs.writeFileSync('./assets/questions/temporary.json', JSON.stringify(temp_quiz));
}

function removeQuestionFromQuiz(qid, index) {
  let quiz_url;
  if (index == 1) {
    quiz_url = './assets/questions/quiz1.json'
  } else {
    quiz_url = './assets/questions/quiz2.json'
  }
  let temp_quiz = createCurrentTempQuiz(quiz_url);
  for(var i = 0; i < temp_quiz.questions.length; i++){
    if (parseInt(temp_quiz.questions[i].qid) === parseInt(qid[0])) {
      temp_quiz.questions.splice(i, 1);
    }
  }
  fs.writeFileSync('./assets/questions/temporary.json', JSON.stringify(temp_quiz));
}
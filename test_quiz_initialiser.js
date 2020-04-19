var fs = require('fs');

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

//TRY ADDING SOME QUESTIONS AND STRINGIFY THEM.
//quiz 1
question11 = new Question("What instrument is used to measure angles?", ["Protractor", "Pair Of Compasses", "Ruler"], "Protractor", 1);
question12 = new Question("Who stole Christmas in a Dr Seuss story?", ["Harry Potter", "Grinch", "Frank Sinatra"], "Grinch", 2);
question13 = new Question("What's the capital of Norway?", ["Oslo", "Beanstaple", "Coruscant"], "Oslo", 3);
question14 = new Question("Who does Mark jilt in an episode of the peep show?", ["Mike wazowski", "Sophie", "Jane"], "Sophie", 4);

//quiz 2
question21 = new Question("Who does Mario save?", ["Sonic", "Princess Peach", "John Cena"], "Princess Peach", 1);
question22 = new Question("What is arachnophobia?", ["Fear of spiders", "Fear of bears", "Fear of your parents"], "Fear of spiders", 2);
question23 = new Question("When was the battle of hastings?", ["1914", "1066", "2020"], "1066", 3);

quiz_pool1 = [];
quiz_pool2 = [];
quiz1 = new Quiz();
quiz2 = new Quiz();
temp_quiz = new Quiz();

quiz1.addQuestion(question11);
quiz1.addQuestion(question12);
quiz1.addQuestion(question13);
quiz1.addQuestion(question14);

quiz2.addQuestion(question21);
quiz2.addQuestion(question22);
quiz2.addQuestion(question23);

var first_pool = fs.readFileSync('../assets/questions/pool_1.csv').toString();
first_pool = first_pool.split("\r\n");
first_pool.forEach((question, index) => {
  let q = question.split(",");
  quiz_pool1.push(new Question(q[0], [q[1], q[2], q[3]], q[4], q[5]));
});

var second_pool = fs.readFileSync('../assets/questions/pool_2.csv').toString();
second_pool = second_pool.split("\r\n");
second_pool.forEach((question, index) => {
  let q = question.split(",");
  quiz_pool2.push(new Question(q[0], [q[1], q[2], q[3]], q[4], q[5]));
});

var json_stringified_pool1 = JSON.stringify(quiz_pool1);
var json_stringified_pool2 = JSON.stringify(quiz_pool2);
var json_stringified_quiz1 = JSON.stringify(quiz1);
var json_stringified_quiz2 = JSON.stringify(quiz2);
var json_stringified_temp = JSON.stringify(temp_quiz);

fs.writeFile("../assets/questions/quiz_pool1.json", json_stringified_pool1, function(err, result) {
    if(err) console.log('error', err);
});

fs.writeFile("../assets/questions/quiz_pool2.json", json_stringified_pool2, function(err, result) {
    if(err) console.log('error', err);
});

fs.writeFile("../assets/questions/quiz1.json", json_stringified_quiz1, function(err, result) {
    if(err) console.log('error', err);
});

fs.writeFile("../assets/questions/quiz2.json", json_stringified_quiz2, function(err, result) {
    if(err) console.log('error', err);
});

fs.writeFile("../assets/questions/temporary.json", json_stringified_temp, function(err, result) {
    if(err) console.log('error', err);
});
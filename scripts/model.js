// Question model
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

    // Reset stats when amended?
    // this.numRestarts = 0;
    // this.numRight = 0;
    // this.numWrong = 0;
    // this.numParticipants = 0;
    // this.timeTaken = 0;
  };

  restart() {
    this.numRestarts += 1;
  }

  // wrong() {
  //   this.numWrong += 1;
  // }
  //
  // correct() {
  //   this.numRight += 1;
  // }

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

thisisaquestion = new Question("Who does Mario save?", ["Sonic", "Princess Peach", "John Cena"], "Princess Peach", 1);
console.log(thisisaquestion.getQuestionID());
console.log(thisisaquestion.getQuestion());
thisisaquestion.getAnswers();
thisisaquestion.answer("correct");
console.log(thisisaquestion.getEverythingElse());


//  Quiz model
class Quiz {
  currentQuizArray = [];
  quiz1QuestionsArray = [];
  quiz2QuestionsArray = [];

  quizData;
  statistics;

  constructor() {
    this.currentQuizArray = []; // Current pool of questions
    this.quiz1QuestionsArray = []; // Question pool for quiz 1
    this.quiz2QuestionsArray = []; // Question pool for quiz 2
    this.totalparticipants = 0;
  }

  // Adds question pools for each type of quiz to respective arrays
  populateQuizpools() {
    var fs = require('fs');
    var questionArray = [];

    var split_data = fs.readFileSync('./questions.txt').toString().split("\n");
    for (var i = 0; i < split_data.length; i++) {
      var question_parts = split_data[i].split(",");
      var answers = question_parts.slice(1, 4);

      var aquestion = new Question(question_parts[0], answers, question_parts[4], i);
      questionArray.push(aquestion);
    }

    for (var i = 0; i < questionArray.length; i++) {
      this.currentQuizArray.push(questionArray[i]);
    }
  }

  addQuestionToPool(questionPool, questionIndex, desiredPool) {
    if (desiredPool.length < 5) {
      desiredPool.push(questionPool[questionIndex]); //Taking an existing question and putting it in desired pool

    } else {
      return false
    }
  }

  // Remove for quiz1 or quiz 2 pool
  removeQuestionFromPool(desiredPool, questionIndex) {
    delete desiredPool[questionIndex];
  }

  // Permanent removal from question Pool
  deleteQuestion(questionPool, questionIndex) {
    delete questionPool[questionIndex];
  }

  // Create
  createQuestion(questionPool, newQuestion) {
    questionPool.push(question);
  }

  // Randomise currentPool of questions before the quiz is restarted.
  randomizeQuizpool(desiredPool) {

  }

  answerQuestion(question) {

  }
}

var aquiz = new Quiz();

// Statistics
class Statistics {
  // quizDataArray: [];
  question: [];

  // Obtain statistics for a chosen question
  // Get statistics for the current quiz questions array
  // “Percentage regarding how often a question is answered correctly”
  // “The percentage of people who gave up at that question”
  // “The question most often answered incorrectly”

  givePerformanceSummary() {

  }

  giveImmediateFeedback() {

  }

  selectSpecificStatistics() {

  }

  getNumberOfParticipants() {

  }

  addQuizRecord() {

  }
}

// User Stats
class QuizData {

  idOfQuestionAnswered;
  wereTheyCorrect;
  timeTakenToCompeleteQuestion;
  didTheyRestart;

  constructor() {

  }

  resetWhenRestarted() {

  }

  getQuizRecord() {

  }
}

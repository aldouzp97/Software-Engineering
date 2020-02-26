class Question {
  question = '';
  answers = [];
  rightAns;
  uid = '';
  numRestarts;
  numRight;
  numWrong;
  totalPart;
  timeTaken;

  constructor(question, answers, rightAns, uid) {
    this.question = question;
    this.answers = answers;
    this.rightAns = rightAns;
    this.uid = uid; // TODO: randomly gen id on construct
  }

  amendQuestion(question, answers, rightAns) {
    this.question = question;
    this.answers = answers;
    this.rightAns = rightAns;
  }
}

class Quiz {
  currentQuizArray = [];
  //
  quiz1QuestionsArray = [];
  quiz2QuestionsArray = [];
  // Restart quiz after 5 minutes of incativity
  restartTimer;
  quizData;
  statistics;

  constructor(currentQuizArray) {
    this.currentQuizArray = currentQuizArray;
  }

  // prepareQuizzes() {
  //
  // }

  // changeCurrentQuiz() {
  //
  // }



  addQuestion(quizQuestionsArray, input) {
    quizQuestionsArray = input;
  }

  removeQuestion() {

  }

  createQuestion() {

  }

  startQuiz() {

  }

  // showRandomQuestion() {
  //
  // }

  answerQuestion() {

  }

  timeOut() {

  }

  resetTime() {

  }

  restartQuiz() {

  }

  genUid() {

  }
}



class Statistics {
  quizDataArray: [];
  question: [];

  // Obtain statistics for a chosen question
  // Get statistics for the current quiz questions array
  // “Percentage regarding how often a question is answered correctly”
  // “The percentage of people who gave up at that question”
  // “The question most often answered incorrectly”

  displayStatisticsInterface() {

  }

  displayLeaderboard() {

  }

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

class QuizData {

  idOfQuesttionAnswered;
  wereTheyCorrect;
  timeTakenToCompeleteQuestion;
  didTheyRestart;

  construct() {

  }

  resetWhenRestarted() {

  }

  getQuizRecord() {

  }
}
  //
  quiz1QuestionsArray = []

//
// Who does Mario save?
// Sonic
// Princess Peach - A
// John Cena
//
// What is archnaphobia?
// fear of spiders - A
// fear of bears
// fear of your parents
//
// When was the battle of hastings?
// 1914
// 1066 - A
// 2020
//
// Which is a dance in the game fortnite?
// the waltz
// the floss - A
// the duggy
//
// How many pairs of ribs would the normal human have?
// 10
// 12 - A
// 14
//
// If you subtract the number of sides on a heptagon from the number of sides on a dodecagon what answer do you get?
// 3
// 4
// 5 - A
//
// Which is the fighter created in Uk?
// Bf109
// Spitfire - A
// P-51
//
// Which medium does sound travel faster？
// Air
// Water
// Solid - A
//
// The French number ‘neuf’ is what in English?
// 9 - A
//
// Which number lies directly opposite the number three on a standard die?
// 4 - A
// 5
// 2
//
// What is the largest US state by size?
// Texas - A
// Californa
// New Mexico
//
// Who created Facebook?
// Mark Zuckerberg - A
// Peter Jones
// Tom Anderson
//
// What colour to do you get when you mix red and white?
// Red
// Pink - A
// White

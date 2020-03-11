class Quiz {
  questions = [];
  q = 0;            // Question tracker
  participants = 0;
  timeTaken = [];

  constructor() {
    this.questions = [];
    this.participants = 0;
    this.timetaken = [];
  }

  // Returns next question by incrementing q(question tracker)
  getNextQuestion(){
    this.q += 1;
    return this.questions[this.q];
  }

  // q set to 0 number of participants incremented
  startQuiz() {
    this.q = 0;
    this.participants += 1;
    return this.questions[this.q];
  }

  // Push question object into array holding questions
  addQuestion(question) {
    questions.push(question);
  }

  // Removes question via index
  removeQuestion(index) {
    prev = index - 1;               // Splice requires 2 numbers
    questions.splice(prev, index);  // Removes anything between prev and index
  }

  // At the end of the quiz particpant time is taken
  endQuiz(participantTime) {
    timeTaken.push(participantTime);
  }

  // If a file exists containg questions setup here
  prepareQuiz() {

  }

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

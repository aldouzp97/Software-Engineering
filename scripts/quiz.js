class Quiz {
  questions = [];
  participants;
  timetaken = [];

  constructor() {
    this.questions = [];
    this.participants = 0;
    this.timetaken = [];
  }

  populateQuiz(quizNumber) {
    var fs = require('fs');
    var questionArray = [];

    var split_data = fs.readFileSync('./questions' + quizNumber + '.txt').toString().split("\n");
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
}

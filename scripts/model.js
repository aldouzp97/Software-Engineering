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

  // amendQuestion(question, answers, rightAns) {
  //   this.question = question;
  //   this.answers = answers;
  //   this.rightAns = rightAns;
  //   this.qid = 0;
  //
  //   this.numRestarts = 0;
  //   this.numRight = 0;
  //   this.numWrong = 0;
  //   this.numParticipants = 0;
  //   this.timeTaken = 0;
  // };

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
    if (correctornot == "correct") {
      this.numRight += 1;
    }

    if (this.numWrong == "wrong") {
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

class Quiz {
  // quiz1QuestionsArray = [];
  // quiz2QuestionsArray = [];
  //
  // restartTimer;
  // quizData;
  // statistics;

  constructor() {
    this.currentQuizArray = [];
  }

  populateQuiz() {
    var fs = require('fs');
    var questionArray = [];

    var split_data = fs.readFileSync('./questions.txt').toString().split("\n");
    for (var i=0; i<split_data.length; i++) {
      var question_parts = split_data[i].split(",");
      var answers = question_parts.slice(1, 4);

      var aquestion = new Question(question_parts[0], answers, question_parts[4], i);
      questionArray.push(aquestion);
    }

    return questionArray;
  }

  getAQuestion() {
    var aquiz = this.populateQuiz();
    for (var i=0; i<aquiz.length; i++) {
      this.currentQuizArray.push(aquiz[i]);
    }
    console.log(this.currentQuizArray);
  }

  // constructor(currentQuizArray) {
  //   this.currentQuizArray = currentQuizArray;
  // }

  // prepareQuizzes() {
  //
  // }

  // changeCurrentQuiz() {
  //
  // }

  // addQuestion(quizQuestionsArray, input) {
  //   quizQuestionsArray = input;
  // }

  // removeQuestion() {
  //
  // }
  //
  // createQuestion() {
  //
  // }
  //
  // startQuiz() {
  //
  // }

  // showRandomQuestion() {
  //
  // }

  // answerQuestion() {
  //
  // }
  //
  // timeOut() {
  //
  // }
  //
  // resetTime() {
  //
  // }
  //
  // restartQuiz() {
  //
  // }
}

var aquiz = new Quiz();
aquiz.populateQuiz();
aquiz.getAQuestion();

// class Statistics {
//   quizDataArray: [];
//   question: [];
//
//   // Obtain statistics for a chosen question
//   // Get statistics for the current quiz questions array
//   // “Percentage regarding how often a question is answered correctly”
//   // “The percentage of people who gave up at that question”
//   // “The question most often answered incorrectly”
//
//   displayStatisticsInterface() {
//
//   }
//
//   displayLeaderboard() {
//
//   }
//
//   givePerformanceSummary() {
//
//   }
//
//   giveImmediateFeedback() {
//
//   }
//
//   selectSpecificStatistics() {
//
//   }
//
//   getNumberOfParticipants() {
//
//   }
//
//   addQuizRecord() {
//
//   }
// }

// class QuizData {
//
//   idOfQuesttionAnswered;
//   wereTheyCorrect;
//   timeTakenToCompeleteQuestion;
//   didTheyRestart;
//
//   construct() {
//
//   }
//
//   resetWhenRestarted() {
//
//   }
//
//   getQuizRecord() {
//
//   }
// }

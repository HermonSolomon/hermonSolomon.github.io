const totalQuestions = 7;
let currentQuestion = 1;
let dataVals;
let ANS;
let questions;
let options;
let feedbacks;
let userStats = {};
let botAnswer;
let botCorrectCount = 0;
let userCorrectCount = 0;

startQuiz = () => {
  $(".btn-scoreBoard").fadeOut();
  if (currentQuestion !== void 0) {
    challengerRandomSelection();
    startQuestion();
  }
};

startQuestion = () => {
  dataVals = QuestionBanks[currentQuestion];
  questions = dataVals.question;
  options = dataVals.option;
  feedback = dataVals.feedback;
  ANS = dataVals.correct;
  $(".question").html(dataVals.question);
  $(".opt1").html(dataVals.option[1]);
  $(".opt2").html(dataVals.option[2]);
  $(".opt3").html(dataVals.option[3]);
  $(".answerIcon").css({ left: "-80px" });
};

nextQuestion = () => {
  goToSlide(4);
  currentQuestion++;
  startQuestion();
  $(".feedback-wrapper").fadeOut();
  $(".btn-scoreBoard").fadeOut();
};

submitAns = selected => {
  ANS = dataVals.correct;
  console.log("The right ANS is " + ANS);

  setTimeout(() => {
    $(".defaultFeedback").html(dataVals.feedback[1]);
  }, 1500);

  setTimeout(() => {
    $(".defaultFeedback").fadeIn(500, function() {
      $(".optionDiv .feedback-wrapper")
        .fadeIn()
        .html(feedbackIcons.incorrect);
      $(".optDiv" + ANS + " .feedback-wrapper")
        .fadeIn()
        .html(feedbackIcons.correct);
    });
    $(".btn-scoreBoard").fadeIn();
  }, 3000);

  setTimeout(() => {
    $(".defaultFeedback").fadeOut(500, function() {
      $(".optionDiv .feedback-wrapper")
        .fadeIn()
        .html(feedbackIcons.incorrect);
      $(".optDiv" + ANS + " .feedback-wrapper").html(feedbackIcons.correct);
    });
    $(".btn-scoreBoard").fadeIn();
  }, 5000);

  userStats.selected = selected;
  console.log("users has selected " + selected);
  characterMove();
};

characterMove = () => {
  let target = ANS;
  botCorrectCount++;
  if (!dataVals.isOpponentCorrect) {
    botCorrectCount--;
    while (target === ANS) {
      target = Math.ceil(Math.random() * Object.size(dataVals.option));
    }
  }

  console.log(dataVals.isOpponentCorrect);
  console.log($(".optDiv" + target).position());
  console.log(ANS);

  // console.log(botCorrectCount);

  botAnswer = target;
  let leftPos = $(".optDiv" + target).position().left;
  let width = $(".optDiv" + target).width();
  let finalPos = leftPos + width / 2;

  console.log(finalPos);

  // leftPos is the starting line of the opt + target
  // finalPos is the totalSum of the opt box + target

  $(".answerIcon").animate(
    {
      left: finalPos
    },
    1000
  );
};

function scoreBoard() {
  botMove();

  if (userStats.selected === ANS) {
    userMove();
  }

  function botMove() {
    console.log(botCorrectCount);
    let botCharacter = $(".botCharacter");
    botCharacter.animate(
      {
        top: $(".progress-block").height() * botCorrectCount
      },
      1500
    );
  }
  function userMove() {
    // userAnimation
    userCorrectCount++;
    $(".block2").animate(
      {
        opacity: 1
      },
      "slow",
      function() {
        $(this)
          .html("")
          .css({
            "background-color": "#AAAAAA"
          })
          .animate(
            {
              opacity: 1
            },
            1000
          );

        $(".block3")
          .html("You are here")
          .css(
            {
              background: "#189cd9"
            },
            1000
          );
      }
    );
  }
}

challengerRandomSelection = () => {
  let sequence = [false]; //sequence[0] = false;

  for (let i = 1; i < Object.size(QuestionBanks); i++) {
    sequence[i] = true;
  }
  shuffle(sequence);

  for (let i = 1; i <= Object.size(QuestionBanks); i++) {
    QuestionBanks[i].isOpponentCorrect = sequence[i - 1];
  }
  console.table(sequence);
  //console.table(QuestionBanks);
};

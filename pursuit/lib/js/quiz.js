const totalQuestions = 7;
let currentQuestion = 1;
let dataVals;
let ANS;
let questions;
let options;
let feedbacks;
let userStats = {};
let botAnswer;

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
  $(".slide5").fadeOut();
  goToSlide(currentSlide + 1);
  currentQuestion++;
  startQuestion();
  $(".feedback-wrapper").fadeOut();
  $(".btn-scoreBoard").fadeOut();

  setTimeout(() => {
    $(".defaultFeedback").fadeIn(500, function() {
      $(".optionDiv .feedback-wrapper")
        .fadeIn()
        .html(feedbackIcons.incorrect);
      $(".optDiv" + ANS + " .feedback-wrapper").html(feedbackIcons.correct);
    });
    $(".btn-scoreBoard").fadeIn();
  }, 3000);
};

submitAns = selected => {
  ANS = dataVals.correct;
  console.log("The right ans is " + ANS);

  setTimeout(() => {
    $(".defaultFeedback").html(dataVals.feedback[1]);
  }, 1500);

  setTimeout(() => {
    $(".defaultFeedback").fadeOut(3500, function() {
      $(".optionDiv .feedback-wrapper")
        .fadeIn()
        .html(feedbackIcons.incorrect);
      $(".optDiv" + ANS + " .feedback-wrapper").html(feedbackIcons.correct);
    });
    $(".btn-scoreBoard").fadeIn();
  }, 3000);

  userStats.selected = selected;
  console.log(selected);

  characterMove();
};

characterMove = () => {
  let target = ANS;
  if (!dataVals.isOpponentCorrect) {
    while (target === ANS) {
      target = Math.ceil(Math.random() * Object.size(dataVals.option));
    }
  }
  botAnswer = target;
  let leftPos = $(".opt" + target).position().left;
  let width = $(".opt" + target).width();
  let finalPos = leftPos + width / 2;

  // leftPos is the starting line of the opt + target
  // finalPos is the totalSum of the opt box + target

  $(".answerIcon").animate(
    {
      left: finalPos
    },
    1000
  );
};

challengerRandomSelection = () => {
  let sequence = [false]; //sequence[0] = false;

  for (let i = 1; i < Object.size(QuestionBanks); i++) {
    sequence[i] = true;
  }
  shuffle(sequence);

  for (let i = 1; i <= Object.size(QuestionBanks); i++) {
    QuestionBanks[i].isOpponentCorrect = sequence[i - 1];
  }
  // console.table(sequence);
  console.table(QuestionBanks);
};

function scoreBoard() {
  if (botAnswer == ANS) {
    botMove();
  }
  if (userStats.selected == ANS) {
    userMove();
  }
  function botMove() {
    // botAnimation
    let botCharacter = $(".botCharacter");
    botCharacter.animate(
      {
        top: "93px"
      },
      1500
    );
  }
  function userMove() {
    // userAnimation
  }
}

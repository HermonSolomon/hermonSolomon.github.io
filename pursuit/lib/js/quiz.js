const totalQuestions = 5;
let currentQuestion = 1;
let dataVals;
let ANS;
let questions;
let options;
let feedbacks;
let userStats = {};
let botAnswer;
let botCorrectCount = -1;
let userCorrectCount = 1;

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
  $(".options").css({
    backgroundColor: "#189cd9"
  });
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
  if (userCorrectCount == botCorrectCount) {
    // fadeInscreen
    setTimeout(() => {
      botCorrectCount -= 1;
      $(".lost-screen").fadeIn();
    }, 2500);
  }

  botMove();

  if (userStats.selected == ANS) {
    userMove();
  }

  function botMove() {
    console.log(botCorrectCount);
    let botCharacter = $(".botCharacter");
    let botCharacterHeight = botCharacter.height();
    let boxHeight = $(".progress-block").height();
    let strokeW = 2;
    let marginBox = 15 + strokeW * 2;
    let posY = boxHeight * botCorrectCount;
    let marginY = marginBox * botCorrectCount;
    let charH = botCharacterHeight / 2;
 
    $(".progress-block").each(function () {
     // check if the current position is not on the last block.
     if (!$(this).hasClass("block6")) {
      $(this).empty();
     }
     $(".block" + (botCorrectCount + 1))
      .css({
       "background-color": "red",
    
      })
    });

    botCharacter.animate(
      {
        top: posY + marginY + boxHeight - charH - marginBox,
      },
      1500
    );
  }

  function userMove() {
    // userAnimation
    userCorrectCount++;
    $(".progress-block").each(function() {
      // check if the current position is not on the last block.
      if (!$(this).hasClass("block6")) {
        $(this).empty();
      }
      $(".block" + (userCorrectCount + 1))
        .html("You are here")
        .css({
            "background-color": "#189cd9",
            'color': "#fff"
        })
        // .animate(
        //   {

        //   },
        //   1000
        // );
    });

    console.log(userCorrectCount);
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

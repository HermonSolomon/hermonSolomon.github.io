$(function() {
  init();
  function init() {
    generateIcons();
    $(".btn-start, .btn-letsGo, .sl3-startBtn, .btn-generalStyle").click(
      function() {
        goToSlide(currentSlide + 1);
      }
    );

    $(".nxt-btn").click(function() {
      nextQuestion();
      // console.log("the current slide is " + currentSlide);
    });

    $(".try-again").click(function() {
      $(".lost-screen").fadeOut(500);
      goToSlide(3);
    });

    $(".btn-scoreBoard").click(function() {
      $(".slide" + currentSlide).fadeOut(500);
      $(".slide5").fadeIn(500);
      scoreBoard();
    });

    $(".options").click(function() {
      selected = $(this).attr("data-answer");
      submitAns(selected);
      $(this).css({
        background: "#b4b4b4"
      });
    });

    startQuiz();
  }
});

goToSlide = num => {
  if (currentSlide < totalSlides) {
    $(".slide").fadeOut(500);
    $(".slide" + num).fadeIn(500);
    currentSlide = num;
    // console.log(currentSlide);
  }
};

//  Gets the size/length of the dataObj at hand

Object.size = function(obj) {
  let size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

function shuffle(a) {
  for (
    var j, x, i = a.length;
    i;
    j = parseInt(Math.random() * i), x = a[--i], a[i] = a[j], a[j] = x
  );
  return a;
}

function generateIcons() {
  $(".optionDiv").each(function(index) {
    var num = index + 1;
    var output = '<div class="feedback-wrapper"></div>';
    $(this).append(output);
    // .addClass("optDiv" + num);
  });
}

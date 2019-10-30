const totalSlides = 11;
let currentSlide = 1;
let slidesDone = [];
let lockDownNav = true;

// let defaultFB = {
//  feedback: `The pursuer has answered, now let's see what the correct answer is... `
// }

let feedbackIcons = {
  correct:
    '<span class="correct feedback-icon"><i class="fas fa-check-circle" style="background-color:#fff;border-radius:50%"></i></span> ',
  incorrect:
    '<span class="incorrect feedback-icon"><i class="fas fa-times-circle" style="background-color:#fff; border-radius:50%"></i></span> '
};
  
let QuestionBanks = {
  1: {
    question: `Which style of management identified by Blake & Mouton can be described as friendly yet unproductive?`,
    option: {
      1: `Country Club`,
      2: `Impoverished`,
      3: `Team`
    },
    feedback: {
      1: `The pursuer has answered, now let's see what the correct answer is...`
    },
    correct: 1
  },
  2: {
    question: `Who identified X and Y behaviours in managers?`,
    option: {
      1: `Hersey and Blanchard`,
      2: `McGregor`,
      3: `Goleman et al`
    },
    feedback: {
      1: `The pursuer has answered, now let's see what the correct answer is...`
    },
    correct: 2
  },
  3: {
    question: `What is an authentic leader?`,
    option: {
      1: `A leader who lives their values they espouse`,
      2: `A leader who conceives an orginial direction`,
      3: `A leader who properly delegates and coaches`
    },
    feedback: {
      1: `The pursuer has answered, now let's see what the correct answer is...`
    },
    correct: 1
  },
  4: {
    question: `Which of the following best describes Goleman et al's 'visionary' leadership style?`,
    option: {
      1: `Encourages participation and delegating responsibility`,
      2: `Places a firm focus on developing others, through encouragement`,
      3: `Strongly believes in a vision and inspires others to follow `
    },
    feedback: {
      1: `The pursuer has answered, now let's see what the correct answer is...`
    },
    correct: 3
  },
  5: {
    question: `Which two characteristics of followers did Hersey & Blanchard say managers needed to take into consideration when adopting a managment style?`,
    option: {
      1: `Competence and commitment `,
      2: `Commitment and confidence`,
      3: `Competence and clarity`
    },
    feedback: {
      1: `The pursuer has answered, now let's see what the correct answer is...`
    },
    correct: 3
  }
};

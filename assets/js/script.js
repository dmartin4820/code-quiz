const startButton = document.getElementById("start-button");
const startButtonContainer = document.getElementById("card-start-container");
const cardQuestion = document.getElementById("card-question");
const cardQuestionHeader = document.getElementById("card-question-header");
const cardQuestionAnswersList = document.getElementById("card-question-answers").children[0];
const cardFinalScore = document.getElementById("card-final-score-container");
const finalScore = document.getElementById("final-score");
const endHeader = document.getElementById("end-header");
const timer = document.getElementById("timeleft-label");
const formEl = document.getElementById("highscore-form");
const answer1 = document.getElementById("answer1");
const answer2 = document.getElementById("answer2");
const answer3 = document.getElementById("answer3");
const answer4 = document.getElementById("answer4");
const answers = [answer1, answer2, answer3, answer4];

var questionIndex = 0;
var timeLeft = 90;
var timerText = "Time Left: " + timeLeft + " s left"
timer.innerHTML = timerText;
var interval;
var endScore = 0;

class question {
	constructor(q,a,b) {
		this._question = q;
		this._answers = a;
		this._answerBools = b;
	}

	get question() {
		return this._question;
	}

	get answers() {
		return this._answers;
	}

	get answerBools() {
		return this._answerBools;
	}
}

const question1 = new question(
	"What characters surround a string?",
	["Parentheses", "Quotation marks", "Exclamation marks", "Commas"],
	[false, true, false, false]
);
const question2 = new question(
	"What HTML tag is used to reference a CSS file?",
	["&ltscript&gt", "&ltbr&gt", "&ltp&gt", "&ltlink&gt"],
	[false, false, false, true]
);

const question3 = new question(
	"Using the flex model, which property allows  the elements of a flexbox to be vertically centered?",
	["align-items", "justify-items", "display", "flex"],
	[true, false, false, false]
)


const questions = [question1, question2, question3];

function startQuiz() {
	startButton.addEventListener("click", function(event) {
		startTimer();
		startButtonContainer.setAttribute("class", "card-start-container hide");
		cardQuestion.setAttribute("class", "card-question show")
		displayNextQuestion(event);
	})
	formEl.addEventListener("submit", function (event) {
		event.preventDefault();
		var highscoreName = document.getElementById("highscore-name").value;
		var highscore = [highscoreName, endScore];
		localStorage.setItem("highScore", JSON.stringify(highscore));

	})

}
function startTimer() {
	interval = setInterval(function() {
		timeLeft--;
		timer.innerHTML = "Time Left: " + timeLeft + " s left";	
		if (timeLeft === 0) {
			endHeader.innerHTML = "Time's up!";
			endQuiz();
		}
	}, 1000);
}

function endQuiz() {
	endScore = calculateScore();
	clearInterval(interval);
	cardQuestion.setAttribute("class", "card-question hide");
	cardFinalScore.setAttribute("class", "card-final-score-container show");
	finalScore.innerHTML = "Your final score is " + Math.round(endScore);
}

function calculateScore() {
	return 100 * timeLeft/90;
}

function displayNextQuestion(event) {
	checkAnswer(event);	
	console.log(questionIndex);
	console.log(questions.length);
	if (questionIndex !== 1 && questionIndex > questions.length - 1) {
		checkAnswer(event);
		endHeader.innerHTML = "Quiz completed!";
		endQuiz();
		return;
	}
	
	answer1.addEventListener("click", displayNextQuestion);
	answer2.addEventListener("click", displayNextQuestion);
	answer3.addEventListener("click", displayNextQuestion);
	answer4.addEventListener("click", displayNextQuestion);

	
	cardQuestionHeader.innerHTML = questions[questionIndex].question;

	for(var i = 0; i < answers.length; i++) {
		answer = questions[questionIndex].answers[i];
		answers[i].innerHTML = (i+1) + ". " + answer;
	}
	questionIndex++;
}
function checkAnswer(event) {
	var selectedAnswerId = event.path[0].getAttribute("data-id");
	var answerBool = false;

	if (questionIndex !== 0) {
		answerBool = questions[questionIndex - 1].answerBools[selectedAnswerId];
	
		if (!answerBool) {
				displayWrong();
				timeLeft -= 10;	
				timer.innerHTML =  "Time Left: " + timeLeft + " s left";
		} else if (answerBool) {
			displayCorrect();
		}
	}
}

function displayWrong() {
	var headerTimer = document.getElementById("header-timer");
	var ulEl = document.getElementById("answer4").parentElement.parentElement;
	
	headerTimer.setAttribute("class", "header-timer-container show");
	ulEl.classList.add("wrong");

	var displayTimer = 1;
	var interval1 = setInterval(function() {
		displayTimer--;
		if (displayTimer === 0) {
			headerTimer.setAttribute("class", "header-timer-container hide");
			ulEl.classList.remove("wrong");
			clearInterval(interval1);
		}
	}, 1000)
	return;
}

function displayCorrect() {
	var ulEl = document.getElementById("answer4").parentElement.parentElement;
	ulEl.classList.add("correct");

	var displayTimer = 1;
	var displayInterval = setInterval(function() {
		displayTimer--;
		if (displayTimer === 0) {
			ulEl.classList.remove("correct");
			clearInterval(displayInterval);
		}
	}, 1000)
	return;
}

startQuiz();
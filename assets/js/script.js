var startButton = document.getElementById("start-button");
var startButtonContainer = document.getElementById("card-start-container");
var cardQuestion = document.getElementById("card-question");
var cardQuestionHeader = document.getElementById("card-question-header");
var timer = document.getElementById("timeleft");
var answer1 = document.getElementById("answer1");
var answer2 = document.getElementById("answer2");
var answer3 = document.getElementById("answer3");
var answer4 = document.getElementById("answer4");
var answers = [answer1, answer2, answer3, answer4];

var questionIndex = 0;
var timeLeft = 90;

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

var question1 = new question(
	"What characters surround a string?",
	["Parentheses", "Quotation marks", "Exclamation marks", "Commas"],
	[false, true, false, false]
);
var question2 = new question(
	"What HTML tag is used to reference a CSS file?",
	["&ltscript&gt", "&ltbr&gt", "&ltp&gt", "&ltlink&gt"],
	[false, false, false, true]
);

var questions = [question1, question2];

function startQuiz() {
	startButton.addEventListener("click", function(event) {
		startTimer();
		startButtonContainer.setAttribute("class", "card-start-container hide");
		cardQuestion.setAttribute("class", "card-question show")
		displayNextQuestion(event);
	})
}
function startTimer() {
	var interval = setInterval(function() {
		timeLeft--;
		timer.innerHTML = timeLeft + " seconds left";	
		if (timeLeft === 0) {
			clearInterval(interval);
		}
	}, 1000);
}

function deductTime() {
	timeLeft -= 10;
}

function displayNextQuestion(event) {
	answer1.addEventListener("click", displayNextQuestion);
	answer2.addEventListener("click", displayNextQuestion);
	answer3.addEventListener("click", displayNextQuestion);
	answer4.addEventListener("click", displayNextQuestion);

	var selectedAnswerId = event.path[0].getAttribute("data-id");
	if (questionIndex !== 0 && 
		!questions[questionIndex - 1].answerBools[selectedAnswerId]) {
			timeLeft -= 10;	
	}
	

	cardQuestionHeader.innerHTML = questions[questionIndex].question;

	for(var i = 0; i < answers.length; i++) {
		answer = questions[questionIndex].answers[i];
		answers[i].innerHTML = answer;
	}
	questionIndex++;
}

startQuiz();
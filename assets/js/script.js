var startButton = document.getElementById("start-button");
var startButtonContainer = document.getElementById("card-start-container");
var cardQuestion = document.getElementById("card-question");
var cardQuestionHeader = document.getElementById("card-question-header");
var answer1 = document.getElementById("answer1");
var answer2 = document.getElementById("answer2");
var answer3 = document.getElementById("answer3");
var answer4 = document.getElementById("answer4");
var answers = [answer1, answer2, answer3, answer4];

var questionIndex = 0;

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
	startButton.addEventListener("click", function() {
		startButtonContainer.setAttribute("class", "card-start-container hide");
		cardQuestion.setAttribute("class", "card-question show")
		displayNextQuestion();
	})
}

function displayNextQuestion() {
	answer1.addEventListener("click", displayNextQuestion);
	answer2.addEventListener("click", displayNextQuestion);
	answer3.addEventListener("click", displayNextQuestion);
	answer4.addEventListener("click", displayNextQuestion);

	cardQuestionHeader.innerHTML = questions[questionIndex].question;

	for(var i = 0; i < answers.length; i++) {
		answer = questions[questionIndex].answers[i];
		answers[i].innerHTML = answer;
	}
	questionIndex++;
}

startQuiz();
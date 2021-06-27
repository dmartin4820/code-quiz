var startButton = document.getElementById("start-button");
var startButtonContainer = document.getElementById("card-start-container");
var cardQuestion = document.getElementById("card-question");
var cardQuestionHeader = document.getElementById("card-question-header");
var answer1 = document.getElementById("answer1");
var answer2 = document.getElementById("answer2");
var answer3 = document.getElementById("answer3");
var answer4 = document.getElementById("answer4");
var answers = [answer1, answer2, answer3, answer4];

var questions = {
	questionsArr: ["What character surrounds a string?"],
	questionAnswers: [["Parentheses", "Quotation marks", "Exclamation marks", "Commas"]]
};

startButton.addEventListener("click", function() {
	startButtonContainer.style.display = "none";
	cardQuestion.style.display = "flex";
	displayNextQuestion();
})


var questionIndex = 0;
answer1.addEventListener("click", displayNextQuestion);
answer2.addEventListener("click", displayNextQuestion);
answer3.addEventListener("click", displayNextQuestion);
answer4.addEventListener("click", displayNextQuestion);

function displayNextQuestion() {
	cardQuestionHeader.innerHTML = questions.questionsArr[questionIndex];

	for (var i = 0; i < answers.length; i++) {
		answers[i].innerHTML = questions.questionAnswers[questionIndex][i];	
	}

}



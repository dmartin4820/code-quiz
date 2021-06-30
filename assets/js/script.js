const startButton = document.getElementById("start-button");
const startButtonContainer = document.getElementById("card-start-container");
const cardQuestion = document.getElementById("card-question");
const cardQuestionHeader = document.getElementById("card-question-header");
const cardQuestionAnswersList = document.getElementById("card-question-answers").children[0];
const cardFinalScore = document.getElementById("card-final-score-container");
const finalScore = document.getElementById("final-score");
const goBack = document.getElementById("go-back");
const clearHighscores = document.getElementById("clear-highscores");
const highScoreList = document.getElementById("highscore-list");
const viewHighscores = document.getElementById("view-highscores");
const quiz = document.getElementById("quiz");
const highScoresPage = document.getElementById("highscores-page");
const submitBtn = document.getElementById("submit-btn");
const playAgain = document.getElementById("play-again");
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

//Create question objs containing their answers and their associated correct boolean
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

const question4 = new question(
	"How do you write 24 in binary?",
	["2" + "24".sup(), "0011000", "1111", "0110"],
	[false, true, false, false]
)

const question5 = new question(
	"What is the largest decimal that can be represented by 8 bits?",
	["2", "8", "255", "16"],
	[false, false, true, false]
)

const question6 = new question(
	"What's the first thing every programmer must program?",
	["variable declaration", "Hello, World!", "nothing", "if statement"],
	[false, true, false, false]
)
const questions = [question1, question2, question3, question4, question5, question6];

/* This function handles the first page that is loaded when the site is opened. 
 * The start button listener clears the greeting card and displays the next question.
 * The highscores button listener will clear the page and display sorted highscores.
 * the go back listener has no functionality on the opening page, but instead on the 
 * highscores page.
 */
function startQuiz() {
	startButton.addEventListener("click", function(event) {
		startTimer();
		//These two lines are the same structure used throughout to flip between questions
		//by hiding and displaying content while filling them in with DOM manipulation.
		//This line hides the opening text
		startButtonContainer.setAttribute("class", "card-start-container hide");
		//This line will display the first question
		cardQuestion.setAttribute("class", "card-question show")
		displayNextQuestion(event);
	})
	viewHighscores.addEventListener("click", function(event) {
		quiz.setAttribute("class", "quiz hide");
		highScoresPage.setAttribute("class", "highscores-page");
		populateHighscores(event);
	})
	goBack.addEventListener("click", function() {
		highScoresPage.setAttribute("class", "highscores-page hide");
		quiz.setAttribute("class", "quiz");
	})
}

/* This function sets up the timer that runs when the start button is pressed.
 * When time is up, the endQuiz function will immediately switch to the scores page.
 */
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

/* This function performs the end of quiz routine. When called it will swap to the 
 * final page with the current score and a form to submit to highscores. Once the score
 * is submitted, the player name and score are sorted and stored within the domain's local storage.
 * The play again button is also handled here.
 */
function endQuiz() {
	endScore = calculateScore();
	clearInterval(interval);//stops the timer
	cardQuestion.setAttribute("class", "card-question hide");
	cardFinalScore.setAttribute("class", "card-final-score-container show");
	finalScore.innerHTML = "Your final score is " + endScore;

	formEl.addEventListener("submit", function (event) {
		event.preventDefault();
		var submitted = submitBtn.dataset.submitted;
		if (submitted === "false") {
			var highScoreName = document.getElementById("highscore-name").value;


			var storedScores = JSON.parse(localStorage.getItem("highScores"));
		
			if (storedScores === null) {
				localStorage.setItem("highScores", JSON.stringify([{name: highScoreName, score: endScore}]));
			} else {
				storedScores.push({name: highScoreName, score: endScore});
				localStorage.setItem("highScores", JSON.stringify(storedScores));
			}
			submitBtn.dataset.submitted = "true";

			storedScores = JSON.parse(localStorage.getItem("highScores"));

			storedScores.sort(function(a,b){return b.score - a.score});
			localStorage.setItem("highScores", JSON.stringify(storedScores));
		}
		populateHighscores(event)
	})



	playAgain.addEventListener("click", function(){
		location.reload();
	})


}

/* Calculate the score using some arbitrary fraction of the time left*/
function calculateScore() {
	return Math.round(100 * timeLeft/90);
}

/* This function handles the displaying of the highscores. First the highscore page is shown
 * then highscores are taken from local storage and displayed on the page by appending the scores
 * within a list element to a newly created ordered list. THe clear highscore listener will 
 * run a function to clear scores and deletes items in the local storage.
 */
function populateHighscores(event) {
	quiz.setAttribute("class", "quiz hide");
	highScoresPage.setAttribute("class", "highscores-page");
	
	var highscoresSection = document.getElementById("highscores-section");
	var orderedList = document.createElement("ol");
	var highScores = localStorage.getItem("highScores");	
	
	if (highScores !== null) {
		clearScores(highscoresSection);
		highScores = JSON.parse(highScores);	
		for (var i = 0; i < highScores.length; i++) {
			var listItem = document.createElement("li");		
			listItem.innerHTML = highScores[i].name + " - " + highScores[i].score;
			highscoresSection.appendChild(orderedList);
			orderedList.appendChild(listItem);
		}
	}

	clearHighscores.addEventListener("click", function() {
		clearScores(highscoresSection);
		localStorage.clear()	
	})
}

/* The clearScores function takes the pointer to the element containing the 
 * ordered list of scores and uses it to remove the ordered list to clear the 
 * highscores page.
 */
function clearScores(highscoresSection) {
	var child = highscoresSection.firstChild;
	if (child !== null) {
		highscoresSection.removeChild(child);
	}
	return;
}

/* The displayNextQuestion function does the majority of the work when switching questions.
 * The function first does some checks: one on whether the last question answered was correct or
 * wrong; the other on whether there are anymore questions. Until there is a click detected,
 * The new question is display and the questionIndex increments to track of the place withing the 
 * questions list
 */
function displayNextQuestion(event) {
	checkAnswer(event);	
	//console.log(questionIndex);
	//console.log(questions.length);
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

/* Checks a selected answer to the correct answer. If not right, deduct time and display that
 * as the user progresses to the next question. If right, then display correct and don't deduct time.
 */
function checkAnswer(event) {
	console.log(event);	
	var selectedAnswerId = event.target.getAttribute("data-id");
	
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

/* The following two functions handle the displaying of the correct and wrong text that appears
 * after every question.
 */
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
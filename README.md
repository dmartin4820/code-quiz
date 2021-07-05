# Code-Quiz


# What does it do?
This coding quiz project was an idea provided by the UC Berkeley Bootcamp and the basic idea is to present the user with 6 questions that they should answer within the given 90 seconds. Each incorrect answers deducts 10 seconds from the timer. A score is calculated based on the time left (plenty of better ways to calculate but I chose to base it on speed). Shown in the GIF below is an example of a run through. The questions don't differ each run or randomize, but can be easily added to or modified. 

<p align="center">
	<img src="https://media.giphy.com/media/z5whdZSmQe464yvXhS/giphy.gif">
<p>

Starting from scratch, the HTML, CSS, and Javascript were built to complete this project.
## How does it do it?
Creating this mini coding quiz site required DOM manipulation, creating event listeners for user click input, and local storage. 

### Storing questions
A concept I've known for a while but have little practice implementing is a class which I chose to use in this case to create new objects storing all the relevant information to a single question. The three properties are simply the question itself, the four possible answers, and a length of four boolean list with the true answer at the same index as the answer. The `question` objects are then stored in a list, `questions`, that is interated through using a global increment (note on this in [Improvements](#improvements)).
### Displaying new questions
The first page shown when viewing the site will be the opening card which briefly explains the rules and shows the start button. By using id attributes, pointers to the start button element were used to create event listeners in Javascript. When the start button is clicked the event listener triggers and pointers to the opening card are used to modify the class attribute to hide the card. The class attribute is associated with a CSS class selector that sets the element's display property to none. This is done similarly for the question card  but to show instead. The questions are actually displayed to the screen when `displayNextQuestion` is called. Part of what `displayNextQuestion` does is the job of checking the that there are still questions in the `questions` list, checking the previous selected answer, and taking the possible answers from `questions` and displaying them. 
### Sorting and storing highscores
Once the user is completed with the quiz the `endQuiz` routine. The important part is the storing of the scores which occurs when the user enters their initials and presses submit. The information from the input element and the score are stored within an object; then the object stored within a list. The list of objects are then stored on the domain's local storage using `localStorage`, so that other visiting users may view the score. Any user has the option to obliterate prievous scores and claim first place as they choose because that's fair, of course. The scores are then parsed and sorted using the information found [here](https://www.w3schools.com/js/js_array_sort.asp) then stored again (inefficient as opposed to sorting and storing immediately).



# Improvements
One major and very clear improvement I learned I could make has to do with declaring variables within the appropriate scope to add more clarity and avoid potential referencing issues. My implementation features global variables of pointers to HTML elements within the DOM, but I could consider defining some variables within the functions and passing them as arguments at necessary points in the script. In place of changing the entire implementation I used `const` on pointers within the global scope which is only partially satisfying. 

 

# Visit the site!

 [Code Quiz](https://dmartin4820.github.io/code-quiz/)

# Author
**Denzal Martin**

# Credits
Thank you to the UC Berkeley Bootcamp teaching staff for providing starter code and introducing me to web design.

**References**
* [HTML](https://www.w3schools.com/html/default.asp)
* [CSS](https://www.w3schools.com/css/default.asp)
* [Markdown reference](https://guides.github.com/features/mastering-markdown/)
* [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
* [Art of the web](https://www.the-art-of-web.com/javascript/escape/)
* [W3 Schools: Sort array of objects](https://www.w3schools.com/js/js_array_sort.asp)
* [Example on how to center images in markdown on Github](https://github.com/dmartin4820/sublime-installer)

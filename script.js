var questions = [
    {
        id: "1",
        question: "1.)Two satellites in space, each with a mass of 1723 kg, are 890 m apart from each other. G=6.67x10−11m3/kg s2What is the force of gravity between them? ",
        options: ["a. 4.5X10^-23N", "b. 2.5X10^-10N", "c. 0.5X10^-10N", "d. 2X10^-10N"],
        correct: "b. 2.5X10^-10N",
    },
    {
        id: "2",
        question: " 2. Find the magnitude and direction of an electric field that exertsa 4.80×10−17 N westward force on an electron.Charge of electron e= -1.6x10-19C",
        options: ["a. 300N/C Westward direction", "b. 300N/C eastward direction", "c. 200N/C eastward direction", "d. 200N/C eastward direction"],
        correct: "b. 300N/C eastward direction",
    },
    {
        id: "3",
        question: "3. A body of mass 12 kg is moved through a distance of 150 m from the ground to the top of a house. Acceleration due to gravity g=9.8 m/s2 Calculate the potential energy of the body",
        options: ["a.  17 640J", "b.  630J", "c. 7 340J", "d. 2740J"],
        correct: "a.  17 640J",
    },
    {
        id: "4",
        question: ". If a body remains in its new position when disturbed from its previous position, it is said to be in a state of",
        options: ["a. Unstable equilibrium", "b. Neutral equilibrium", "c. Stable equilibrium", "d. None of these "],
        correct: "b. Neutral equilibrium",
    },
    {
        id: "5",
        question: "5.  measuring the diameter of a wire or measuring the thickness of paper we use", 
        options: ["a.  vernier calipers ", "b. Micrometer screw gauge ", "c. galvanometer", "d. ammeter"],
        correct: "b. Micrometer screw gauge ",
    },
    {
        id: "6",
        question: "6. If the area of A1= 0.001m^2 and the area of A2= 0.1m^2 , external input force F1 = 100N , then find the external output force F2",
        options: ["a. 32N", "b. 3083N", "c. 10000N", "d. 0.02N"],
        correct: "c. 10000N",
    },
    {
        id: "7",
        question: "7. A block and tackle pulley system has a velocity ratio of 4. If its efficiency is 75%. Find th (a) mechanical advantage. (b) load that can be lifted with an effort of 500 N. (c) work done if the load is lifted through a vertical distance of 4.0  (d) average rate of working if the work is done in 2 minutes. ",
        options: ["i. a=3,b=150N ,c=70N, d=50W", "ii. a=3,b=1500N,c=600N, d=50W", "iii. a=3,b=1500N,c=600j, d=50W", "iv. a=3,b=100N,c=600N, d=50"],
        correct: "iii. a=3,b=1500N,c=600j, d=50W",
    },
    {
        id: "8",
        question: "8. A body weighs 450 g in air and 310 g when completely immersed in  (i) the loss in weight of the body (ii) the upthrust on the body (iii) the volume of the body",
        options: ["a. 1.4N, 1.2N, 933N", "b. 1.4N, 1.4N, 0.000143m^3", "c.b. 1.4N, 1N, 0.000143m^2", "d. b. 0.4N, 1.4N, 0.00143m^3"],
        correct: "b. 1.4N, 1.4N, 0.000143m^3",
    },
    {
        id: "9",
        question: "9. A motor has to move a fully load at a steady speed of 3 m/s. The load has a mass of 1850kg (ignore friction). What is the minimum power of the motor to raise the load at a steady speed?",
        options: ["a. 10000W", "b. 55000W", "c. 55500W", "d. 230W"],
        correct: "c. 55500W",
    },
    {
        id: "10",
        question: "10. State boyle`s law",
        options: ["a. V ∝ 1/P", "b. V ∝T", "c. V ∝ P", "d. PV=nRT"],
        correct: "a. V ∝ 1/P",
    }
];


var currentQuestionIndex = 0;
var userAnswers = {}; // Store user answers
var totalMarks = 0;

var examDurationMinutes = 30; // Set the desired duration in minutes
var examEndTime; // To store the end time of the exam
window.addEventListener('beforeunload', function (e) {
    var confirmationMessage = 'Are you sure you want to leave?';

    (e || window.event).returnValue = confirmationMessage; // Standard
    return confirmationMessage; // IE, Firefox
});

function startExam() {
    userName = document.getElementById("userName").value;

    if (!userName) {
        alert("Please enter your name before starting the quiz.");
        return;}
    // Set the end time of the exam
    var now = new Date();
    examEndTime = new Date(now.getTime() + examDurationMinutes * 60000);

    // Hide the start screen
    document.getElementById("start-screen").style.display = "none";

    // Display the first question
    displayCurrentQuestion();

    // Display and start the countdown timer
    displayTimer();
}


function displayTimer() {
    // Update the timer every second
    var timerInterval = setInterval(function () {
        var now = new Date();
        var timeRemaining = Math.max(0, Math.floor((examEndTime - now) / 1000));

        // Format the time as mm:ss
        var minutes = Math.floor(timeRemaining / 60);
        var seconds = timeRemaining % 60;
        var formattedTime = (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

        // Display the formatted time on the screen
        document.getElementById("timer").textContent = "Time remaining: " + formattedTime;

        // Check if the time has run out
        if (timeRemaining === 0) {
            clearInterval(timerInterval); // Stop the timer
            endExam(); // End the exam
        }
    }, 1000); // Update every second
}

function displayCurrentQuestion() {
    var questionContainer = document.getElementById("question-container");

    // Display the current question
    var questionObject = questions[currentQuestionIndex];
    questionContainer.innerHTML = "<p>" + questionObject.question + "</p>";

    // Add radio buttons for options
    var optionsHTML = "";
    for (var i = 0; i < questionObject.options.length; i++) {
        optionsHTML += '<input type="radio" name="answer" value="' + questionObject.options[i] + '"> ' + questionObject.options[i] + '<br>';
    }
    function reviewAnswers(event) {
        event.preventDefault(); // Prevent page refresh
    
        // Display the previous question for review
        currentQuestionIndex = Math.max(0, currentQuestionIndex - 1);
        displayCurrentQuestion();
    }
    questionContainer.style.backgroundColor = "grey";
    // Add a submit button
    optionsHTML += '<br><input type="button" value="Submit" onclick="submitAnswer()">';

    // Append the options to the question-container
    questionContainer.innerHTML += optionsHTML;
}

function submitAnswer() {
    var selectedAnswer = document.querySelector('input[name="answer"]:checked');

    if (selectedAnswer) {
        var userAnswer = selectedAnswer.value;

        // Store the user's answer
        userAnswers[currentQuestionIndex] = userAnswer;

        // Check if the answer is correct and update total marks
        if (userAnswer === questions[currentQuestionIndex].correct) {
            totalMarks += 5; // Each question is worth 5 marks
        }

        // Move to the next question (if available)
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            // Display the next question
            displayCurrentQuestion();
        } else {
            // End of the exam
            endExam();
        }
    } else {
        alert("Please select an answer before submitting.");
    }
}

// script.js

// ... (existing code remains the same)

function endExam() {
   
    // Display the result screen
    displayResultScreen(totalMarks);

    
}
// summaryScript.js content
document.addEventListener("DOMContentLoaded", function () {
    displaySummary();
});






function displayResultScreen(totalMarks) {
    var questionContainer = document.getElementById("question-container");
    
    // Calculate the percentage of correct answers
    var percentage = (totalMarks / (questions.length * 5)) * 100;

    // Display the result and a personalized message
    var resultMessage =  "<p>Hi " + userName + ", Your quiz has ended. You scored " + totalMarks + " out of " + (questions.length * 5) + " (" + percentage.toFixed(2) + "%). Coach-Jeff Observation:</p>";

    if (percentage < 50) {
        resultMessage += "<p style='color: black;'>Improvement needed. Keep practicing!</p>";
    } else if (percentage === 100) {
        resultMessage += "<p style='color: black;'>Excellent! You got a perfect score!</p>";
    } else {
        resultMessage += "<p style='color: black;'>Good job! You performed well. Keep it up!</p>";
    }

    questionContainer.style.backgroundColor = "skyblue";
    questionContainer.innerHTML = resultMessage;
}


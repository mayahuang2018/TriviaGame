$(document).ready(function() {

    //Questions and Answers

var questions = [
  
{ question:"When was William Shakespeare born? ",
     choices:["23rd April 1564","23rd April 1654","23rd April 1456","23rd April 1645"],
     correctAnswer:"23rd April 1564"
        },

{ question:  "Who was Henry VIll's first wife? ",
    choices: ["Catherine of Aragon", "Anne Boleyn", "Elizabeth I of England", "Anne of Cleves"],
    correctAnswer: "Catherine of Aragon"
},

 { question:  "What was the name of the research ship Charles Darwin travelled with?",
    choices: ["Turtle", "Beagle", "Mermaid", "Eagle"],
    correctAnswer: "Beagle"
},

{ question:  "Who became the British Prime Minister after Winston Churchill in 1955? ",
choices: ["Robert Anthony Eden", "Clement Richard Attlee", "Arthur Neville Chamberlain", "Maurice Harold Macmillan"],
correctAnswer: "Robert Anthony Eden"
},
    

{ question:  "When did Margaret Thatcher become Prime Minister?",
choices: ["1974", "1976", "1978", "1979"],
correctAnswer: "1979"
},

{ question:  "When did the Cold War end?",
choices: ["1991", "1990", "1989", "1987"],
correctAnswer: "1989"
},


{ question:  "When did the Eurostar train service between Britain and France start running?",
choices: ["14th November 1993", "14th November 1994", "14th November 1995", "14th November 1996"],
correctAnswer: "14th November 1994"
},



]

//

var losses = 0;
var wins = 0;
var noAnswer =0;
var seconds = 16;
var questionNumber = 0;
var userGuess = "";
var t;

// start the game

function showQuestions(){

    $("#start").hide();
    $("#resultPage").empty();
    $("#finish").empty();
    $(".lead").empty();
  
    seconds = 16;
    countdown();
   
    $("#qZone").html(questions[questionNumber].question);
     for (let i=0; i<4;i++){
       var option = $("<div>"); 
       option.text(questions[questionNumber].choices[i]);
       option.addClass("thisChoice");
       $("#aList").append(option);
    };
 
    //get answer when user clicks option
     
    $(".thisChoice").on("click",function(){
        userGuess =  $(this).text() ;
        nextPage() ;     
    })   

};

//for restart the game

function startGame(){
    losses = 0;
    wins = 0;
    noAnswer =0;
    questionNumber = 0;
showQuestions();

}

$("#start").on("click", startGame);

// go to next page 
function nextPage(){

    var theAnswer = questions[questionNumber].correctAnswer;
   
    if (userGuess == theAnswer){
        correct();
    }else if(userGuess !== theAnswer){
        Nope(); 
    }
    ;
    questionNumber++; 

    if(questionNumber == questions.length){
        setTimeout(finishPage, 5000)
    } else{
        setTimeout(showQuestions, 3000)};
 
}

//set timer

function countdown(){  
   t = setInterval(everySecond,1000);
}

function everySecond(){
    seconds--
    $("#timer").html("<strong>"+"Time remaining: "+"</strong>"+ seconds );
    if (seconds==0){
        timeOut();
        
    }
}

//different results

function correct(){
    wins ++;
    clearInterval(t);
    $("#resultPage").html("Correct!");
    $("#aList").empty();
    $("#qZone").empty(); 
    $("#finish").empty();
    $(".lead").empty();
  
    
}

function Nope(){
    losses++; 
    clearInterval(t);
    $("#aList").empty();
    $("#qZone").empty();
    $(".lead").empty();
    $("#finish").empty();
  
    $("#resultPage").html("Nope!<br>"+"The correct answer was "+questions[questionNumber].correctAnswer);
   
}

function timeOut(){
    noAnswer++;
    clearInterval(t);
    $("#aList").empty();
    $("#qZone").empty();
    $(".lead").empty();
    $("#finish").empty();
 
    $("#resultPage").html("Out of Time!<br>"+"The correct answer was "+questions[questionNumber].correctAnswer);
    
    questionNumber++; 

    if(questionNumber == questions.length){
        setTimeout(finishPage, 5000)
    } else{
        setTimeout(showQuestions, 3000)};
}

// the finish page

function finishPage(){
    $("#finish").html("All done, here's how you did!<br>"+"<li>"+"Correct Answers: "+wins+"</li>"+
   "<li>" + "Incorrext Answers: "+losses+"</li>"+
   "<li>" + "Unanswered: "+noAnswer+ "</li><br>");

   $("#aList").empty();
   $("#qZone").empty();
   $("#resultPage").empty();
   
   $("#start").show();
   $("#start").html("Start over? ")
}


})
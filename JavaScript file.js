// --------------------------Variables--------------------------------------

let play = false;
let x = 60;

let score;
let first_value = 1+Math.round(10*Math.random());
let second_value = 1+Math.round(10*Math.random());
let correctAnswer = first_value * second_value;

//---------------------------Operation-------------------------------

$("#start_reset").click(function (){
    if( play === true){
        location.reload();
    }else{
        score =0;
        $("#start_reset").text("Reset Game");
        $("#time_remaining").css({
            "display": "block"
        })
        play = true;
        QuestionGenerator();



    }
})

// --------------------------Timer-----------------------------------

let startCountdown = setInterval(function(){
    x--;
    $("#time_remaining_value").text(x);
    if(x === 0){
        clearInterval(startCountdown);
        $("#game_over").css("display", "block");
        $("#time_remaining").css("display", "none")

    }
}, 1000);

// -------------------------------Question Generator---------------------------

function QuestionGenerator(){


    $("#question").text(first_value + " x " + second_value + " = ?");

    // let correctAnswer = a * b;

    let randomPosition = 1+Math.round(3*Math.random());

    $("#box"+ randomPosition).text(correctAnswer);
    // alert(option1);

    for(let i = 0; i < 5; i++){
        if(i !== randomPosition) {
            let incorrectAnswer = GenerateIncorrectAnswer();
            $("#box" + i).text(incorrectAnswer);
        }
    }
}





//-------------------Incorrect Question Generator-----------------------

function GenerateIncorrectAnswer(){
    let incorrectAnswer = (1 + Math.round(10*Math.random()))*(1+Math.round(10*Math.random()));
    while (incorrectAnswer === correctAnswer){
        incorrectAnswer = 1 + Math.round(10*Math.random());

    }
    return incorrectAnswer;
}

document.getElementById("final_score").innerHTML = score;



//----------------------------The Game Proses Loop------------------------------------


for(let e=1; e<5; e++){
    document.getElementById("box"+e).onclick = function(){

        //check if we are playing
        if(play){
            if(parseInt(this.innerHTML) === parseInt(correctAnswer)){
                score++;
                document.getElementById("score_value").innerHTML = score;
                document.getElementById("wrong").style.display = "none";
                document.getElementById("correct").style.display = "block";
                document.getElementById("final_score").innerHTML = " "+score;
                setTimeout(function(){
                    document.getElementById("correct").style.display = "none";
                }, 1000);
                //Generate new Question and Answer
                QuestionGenerator();
            }else{
                document.getElementById("correct").style.display = "none";
                document.getElementById("wrong").style.display = "block";
                setTimeout(function(){
                    document.getElementById("wrong").style.display = "none";
                }, 1000);
            }
        }
    }
}


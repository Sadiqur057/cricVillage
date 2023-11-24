class Game {
    userBallCount = 0;
    compBallCount = 0;
    userPlayed = 0;
    compPlayed = 0;
    wicketCount = 0;
    constructor() {
        console.log("Game has started");
        this.userScore = parseInt(document.querySelector('#score-user').innerText)
        this.runs =  document.querySelector('#show-run');
        this.runs.style.display = "none";
        this.tossSelection = document.querySelector('#toss-selection');
        this.statusSelection = document.querySelector('#status-selection');
        this.statusSelection.style.display = "none";
        this.startPlay = document.querySelector('#start-play');
        this.startPlay.style.display = "none";
        this.playGame = document.querySelector('#play-game');
        this.playGame.style.display = "none";
        this.winnerSection = document.querySelector('#winner-section');
        this.winnerSection.style.display = "none";
        this.compScore = parseInt(document.querySelector('#score-comp').innerText);
        this.userScore = parseInt(document.querySelector('#score-user').innerText);
        this.ballNow = document.querySelector('#ball-now');
        this.ballNow.style.display= "none";
        this.ballNow.style.display= "none";
        this.batNow = document.querySelector('#bat-now');
        this.batNow.style.display= "none";
    }
    selection(choice) {
        if (choice === "win") {
            document.querySelector('#message-2').innerText = 'You have won the toss';
            this.statusSelection.style.display = "block";
            this.tossSelection.style.display = "none";
        } else {
            let selectionChoice = Math.floor(Math.random() * 2);
            if (selectionChoice === 1) {
                document.querySelector('#message-3').innerText = 'Computer has won the toss and selected to bat';
                document.querySelector('#start-bat').style.display='none';
            } else {
                document.querySelector('#message-3').innerText = 'Computer has won the toss and selected to ball'
                document.querySelector('#start-ball').style.display='none';
            }
            this.statusSelection.style.display = "none";
            this.tossSelection.style.display = "none";
            this.startPlay.style.display = "block";
        }
    }
    toss(choice) {
        let winningChoice = Math.floor(Math.random() * 2)
        if (winningChoice == choice) {
            this.selection("win");
        } else {
            this.selection("loose")
        }
    }

    startGame(status) {
        this.statusSelection.style.display = "none";
        this.tossSelection.style.display = "none";
        this.startPlay.style.display = "none";
        this.playGame.style.display = "block";
        if (status == 'bat') {
            this.batting();
        } else {
            this.bowling();
        }
    }

    batting() {
        document.querySelector('#bat').style.display = 'block';
        document.querySelector('#ball').style.display = 'none';
    }
    bowling() {
        document.querySelector('#ball').style.display = 'block';
        document.querySelector('#bat').style.display = "none";
        // document.querySelector('#comp-play').style.display='block';
        // document.querySelector('#user-play').style.display='none';
        
    }
    compPlay(ball){
        if(this.userScore<this.compScore && this.userPlayed===1){
            this.gameOver();
        }
        if(this.compBallCount<6){
            let run = Math.floor(Math.random()*8)
            if(run === 7){
                this.wicketCount +=1; 
                this.compScore  += 0;
                document.querySelector('#wicket-counts').innerText= this.wicketCount;
                this.showRun("out");
            }else{
                this.compScore = this.compScore + run;
                document.querySelector('#score-comp').innerText =this.compScore;
                this.showRun(run);
            }
            this.compBallCount+=ball;
            console.log(this.compBallCount);
            document.querySelector('#ball-counts').innerText= this.compBallCount;
        }
        if(this.compBallCount===6){
            this.compPlayed=1;
            if(this.userPlayed===0){
                document.querySelector('#hints-ball').style.display= "none";
                this.batNow.style.display= "block";
            }else{
                this.gameOver()
            }
        }

    }
    userPlay(ball) {
        document.querySelector('#bat').style.display = 'block';
        document.querySelector('#ball').style.display = 'none';
        console.log(this.userBallCount);
        if(this.compScore<this.userScore && this.compPlayed===1){
            this.gameOver();
        }
        if(this.userBallCount<6){
            let run = Math.floor(Math.random()*8);
            if(run == 7){
                this.wicketCount +=1; 
                this.userScore  += 0;
                document.querySelector('#wicket-counts').innerText= this.wicketCount;
                this.showRun("out");
            }else{
                this.userScore = this.userScore + run;
                document.querySelector('#score-user').innerText =this.userScore;
                console.log(this.userScore);
                this.showRun(run);
            }
            this.userBallCount+=ball;
            document.querySelector('#ball-counts').innerText= this.userBallCount
        }
        if(this.userBallCount===6){
            this.userPlayed=1;
            if(this.compPlayed===0){
                this.ballNow.style.display= "block";
                document.querySelector('#hints-bat').style.display= "none";
            }else{
                this.gameOver()
            }
        }
    }
    showRun(run){
        this.runs.style.display = "block";
        document.querySelector('#run').innerText = run;
        setTimeout(()=>{
            this.runs.style.display = "none";
        },3000)
    }
    gameOver(){
        this.playGame.style.display = "none";
        this.winnerSection.style.display = "block";
        document.querySelector('#looser').style.display ='none';
        document.querySelector('#winner').style.display ='none';
        document.querySelector('#draw').style.display ='none';
        console.log("gameOver");
        if(this.compScore<this.userScore){
            document.querySelector('#winning-msg').innerText = 'Congratulations! You have won the game';
            document.querySelector('#winner').style.display ='block';
        }else if(this.compScore>this.userScore){
            document.querySelector('#winning-msg').innerText = 'You lost the game! Better luck next time.';
            document.querySelector('#looser').style.display ='block';
        }else{
            document.querySelector('#winning-msg').innerText = 'It\'s a tie! You fought well.';
            document.querySelector('#winner').style.display ='block';
        }
    }
}
let play = new Game();



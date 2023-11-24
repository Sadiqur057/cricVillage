class Game {
    userBallCount;
    compBallCount;
    userPlayed;
    compPlayed;
    wicketCount;
    userScore;
    runs;
    tossSelection;
    statusSelection;
    startPlay;
    playGame;
    compScore;
    winnerSection;
    ballNow;
    batNow;

    constructor() {
        console.log("Game has started");
        this.userScore = this.getScore('#score-user');
        this.compScore = this.getScore('#score-comp');
        this.runs = document.querySelector('#show-run');
        this.tossSelection = document.querySelector('#toss-selection');
        this.statusSelection = document.querySelector('#status-selection');
        this.startPlay = document.querySelector('#start-play');
        this.playGame = document.querySelector('#play-game');
        this.winnerSection = document.querySelector('#winner-section');
        this.ballNow = document.querySelector('#ball-now');
        this.batNow = document.querySelector('#bat-now');
    }

    initializeGame() {
        this.userBallCount = 0;
        this.compBallCount = 0;
        this.userPlayed = 0;
        this.compPlayed = 0;
        this.wicketCount = 0;
        this.runs.style.display = "none";
        this.statusSelection.style.display = "none";
        this.startPlay.style.display = "none";
        this.playGame.style.display = "none";
        this.winnerSection.style.display = "none";
        this.ballNow.style.display = "none";
        this.ballNow.style.display = "none";
        this.batNow.style.display = "none";
    }
    getScore(selector) {
        return parseInt(document.querySelector(selector).innerText);
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
        
    }
    compPlay(ball){
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
        if(this.userScore<this.compScore && this.userPlayed===1){
            this.gameOver();
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
        if(this.compScore<this.userScore && this.compPlayed===1){
            this.gameOver();
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
        
        const looserMsgContainer = document.querySelector('#looser');
        const winnerMsgContainer = document.querySelector('#winner');
        const drawMsgContainer = document.querySelector('#draw');

        looserMsgContainer.style.display = 'none';
        winnerMsgContainer.style.display = 'none';
        drawMsgContainer.style.display = 'none';
        
        if (this.compScore < this.userScore) {
            this.displayWinnerMsg('Congratulations! You have won the game', winnerMsgContainer);
        } else if (this.compScore > this.userScore) {
            this.displayWinnerMsg('You lost the game! Better luck next time.', looserMsgContainer);
        } else {
            drawMsg.innerText = 'It\'s a tie! You fought well.';
            drawMsgContainer.style.display = 'block';
        }
    }
    displayWinnerMsg(msg, element) {
        document.querySelector('#match-end-msg').innerText = msg;
        element.style.display = 'block';
    }
}
let play = new Game();
play.initializeGame();



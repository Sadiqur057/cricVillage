class Game {
    // Game stats related properties
    userBallCount;
    compBallCount;
    userPlayed;
    compPlayed;
    wicketCount;
    userScore;
    compScore;

     // DOM-related properties
    runs;
    tossSelection;
    statusSelection;
    startPlay;
    playGame;
    winnerSection;
    ballNow;
    batNow;

    // Records showing at the ends
    won;
    lost;
    tie;

    constructor() {
        console.log("Game has started");
        this.initializeGame();
    }
    initializeGame() {
        // Initializing Game stats related properties
        this.won = parseInt(localStorage.getItem('won')) || 0;
        this.lost = parseInt(localStorage.getItem('lost')) || 0;
        this.tie = parseInt(localStorage.getItem('tie')) || 0;
        this.updateRecords();

        this.userPlayed = 0;
        this.compPlayed = 0;
        this.userScore = this.resetScore('#score-user');
        this.compScore = this.resetScore('#score-comp');
        this.userBallCount = this.resetScore('#ball-counts');
        this.compBallCount = this.resetScore('#ball-counts');
        this.wicketCount = this.resetScore('#wicket-counts');

        // Set initial display states
        this.setDisplay("#toss-selection","block");
        this.setDisplay("#show-run","none");
        this.setDisplay('#status-selection',"none");
        this.setDisplay('#start-play',"none");
        this.setDisplay('#play-game',"none");
        this.setDisplay('#winner-section',"none");
        this.setDisplay('#ball-now',"none");
        this.setDisplay('#bat-now',"none");
        
        // Reset scores
        this.resetScore();
    }

    setDisplay(selector, displayType) {
        document.querySelector(selector).style.display = displayType;
    }

    resetScore(selector) {
        let element = document.querySelector(selector);
        if (element) {
            return element.innerText = 0;
        }
    }
    updateRecords(){
        document.querySelector('#won').innerText=this.won;
        document.querySelector('#lost').innerText=this.lost;
        document.querySelector('#tie').innerText=this.tie;
    }
    
    selection(choice) {
        if (choice === "win") {
            document.querySelector('#message-2').innerText = 'You have won the toss';

            this.setDisplay("#toss-selection","none");
            this.setDisplay('#status-selection',"block");
        } else {
            let selectionChoice = Math.floor(Math.random() * 2);
            if (selectionChoice === 1) {
                document.querySelector('#message-3').innerText = 'Computer has won the toss and selected to bat';
                document.querySelector('#start-ball').style.display='block';
                document.querySelector('#start-bat').style.display='none';
            } else {
                document.querySelector('#message-3').innerText = 'Computer has won the toss and selected to ball'
                document.querySelector('#start-bat').style.display='block';
                document.querySelector('#start-ball').style.display='none';
            }
            this.setDisplay("#toss-selection","none");
            this.setDisplay('#status-selection',"none");
            this.setDisplay('#start-play',"block");
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
        this.setDisplay("#toss-selection","none");
        this.setDisplay('#status-selection',"none");
        this.setDisplay('#start-play',"none");
        this.setDisplay('#play-game',"block");
        if (status == 'bat') {
            this.batting();
        } else {
            this.bowling();
        }
    }

    batting() {
        this.setDisplay("#bat","block");
        this.setDisplay("#ball","none");
        this.setDisplay('#hints-bat',"block");
    }

    bowling() {
        this.setDisplay("#bat","none");
        this.setDisplay("#ball","block");
        this.setDisplay('#hints-ball',"block"); 
    }

    compPlay(ball){
        this.compBallCount = parseInt(this.compBallCount);
        this.setDisplay('#hints-ball',"block");
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
            document.querySelector('#ball-counts').innerText= this.compBallCount;
        }
        if(this.userScore<this.compScore && this.userPlayed===1){
            this.gameOver();
        }
        if(this.compBallCount===6){
            this.compPlayed=1;
            if(this.userPlayed===0){
                this.setDisplay('#hints-ball',"none");
                this.setDisplay('#bat-now',"block");
            }else{
                this.gameOver()
            }
        }

    }

    userPlay(ball) {
        this.setDisplay('#ball',"none");
        this.setDisplay('#bat',"block");
        this.setDisplay('#hints-bat',"block");
        this.userBallCount = parseInt(this.userBallCount);

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
                this.setDisplay('#ball-now',"block");
                this.setDisplay('#hints-bat',"none");
            }else{
                this.gameOver()
            }
        }
    }

    showRun(run){
        this.setDisplay("#show-run","block");
        document.querySelector('#run').innerText = run;
        setTimeout(()=>{
            this.setDisplay("#show-run","none");
        },1000)
    }

    gameOver(){
        this.setDisplay('#play-game',"none");
        this.setDisplay('#winner-section',"block");
        
        const looserMsgContainer = document.querySelector('#looser');
        const winnerMsgContainer = document.querySelector('#winner');
        const drawMsgContainer = document.querySelector('#draw');

        looserMsgContainer.style.display = 'none';
        winnerMsgContainer.style.display = 'none';
        drawMsgContainer.style.display = 'none';
        
        if (this.compScore < this.userScore) {
            this.displayWinnerMsg('Congratulations! You have won the game', winnerMsgContainer);
            this.won +=1;
            localStorage.setItem('won', this.won);
            this.updateRecords()
        } else if (this.compScore > this.userScore) {
            this.displayWinnerMsg('You lost the game! Better luck next time.', looserMsgContainer);
            this.lost +=1;
            localStorage.setItem('lost', this.lost);
            this.updateRecords()
        } else {
            this.displayWinnerMsg('It\'s a tie! You fought well.', drawMsgContainer);
            this.tie +=1;
            localStorage.setItem('tie', this.tie);
            this.updateRecords()
        }
    }
    displayWinnerMsg(msg, element) {
        document.querySelector('#match-end-msg').innerText = msg;
        element.style.display = 'block';
    }

    resetGame(){
        localStorage.clear();
        this.initializeGame();
        
    }
}
let play = new Game();



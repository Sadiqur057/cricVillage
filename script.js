class Game {
    constructor() {
        console.log("Game has started");
        this.userScore = parseInt(document.querySelector('#score-user').innerText)
        this.ballCount = 0;
        this.userPlayed = 0;
        this.compPlayed = 0;

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
        document.querySelector('#comp-play').style.display='block';
        document.querySelector('#user-play').style.display='none';
        
    }
    compPlay(){
        for(let i=0;i<6;i++){
            this.compScore += Math.floor(Math.random()*6)
        }
        document.querySelector('#score-comp').innerText=this.compScore;
        this.compPlayed = 1;
        document.querySelector('#comp-play').style.display='none';
        if(this.userPlayed===0){
            document.querySelector('#user-play').style.display='block';
        }else{
            this.gameOver();
            document.querySelector('#user-play').style.display='none';
            document.querySelector('#comp-play').style.display='none';
        }
    }
    userPlay(ball) {
        document.querySelector('#bat').style.display = 'block';
        document.querySelector('#ball').style.display = 'none';
        console.log(this.ballCount);
        if(this.ballCount<6){
            this.userScore = this.userScore + Math.floor(Math.random()*6)
            document.querySelector('#score-user').innerText =this.userScore;
            console.log(this.userScore);
            this.ballCount+=ball;
        }else if(this.ballCount===6){
            this.userPlayed=1;
            if(this.compPlayed===0){
                this.bowling();
            }else{
                this.gameOver()
            }
        }
    }
    gameOver(){
        this.playGame.style.display = "none";
        this.winnerSection.style.display = "block";
        document.querySelector('#looser').style.display ='none';
        document.querySelector('#winner').style.display ='none';
        console.log("gameOver");
        if(this.compScore<this.userScore){
            document.querySelector('#winning-msg').innerText = 'Congratulations! You have won the game';
            document.querySelector('#winner').style.display ='block';
        }else if(this.compScore>this.userScore){
            document.querySelector('#winning-msg').innerText = 'You lost the game! Better luck next time.';
            document.querySelector('#looser').style.display ='block';
        }
    }
}
let play = new Game();



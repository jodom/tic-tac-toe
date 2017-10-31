import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            flag: "pick",
            player: ""
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.players = ["X","O"]
        this.human = "";
        this.scores = [0, 0];

        this.current = []; //tracks moves for AI logic

        this.mapping = {
            1: "one",
            2: "two",
            3: "three",
            4: "four",
            5: "five",
            6: "six",
            7: "seven",
            8: "eight",
            9: "nine"
        }

        this.newGame();
    }

    componentDidUpdate(){

        if (this.checkWin()){
            this.newGame();
            console.log("new game");

            if(this.human && this.state.player !== this.human){
                setTimeout(() => {this.aiMove()}, 1000);
            }else{
                setTimeout( () => {this.forceUpdate()}, 500);
            }
        }else{
            var played = this.played;
            if (
                played["one"] !== "" &&
                played["two"] !== "" &&
                played["three"] !== "" &&
                played["four"] !== "" &&
                played["five"] !== "" &&
                played["six"] !== "" &&
                played["seven"] !== "" &&
                played["eight"] !== "" &&
                played["nine"] !== ""
            ){
                this.newGame();
                console.log("Issa draw");

                if(this.human && this.state.player !== this.human){
                    setTimeout(() => {this.aiMove()}, 1000);
                }else{
                    setTimeout( () => {this.forceUpdate()}, 500);
                }
            }else{
                if(this.human && this.state.player !== this.human){
                    setTimeout(() => {this.aiMove()}, 1000);
                }
            }
        }
    }

    newGame() {
        this.played = {
            "one": "",
            "two": "",
            "three": "",
            "four": "",
            "five": "",
            "six": "",
            "seven": "",
            "eight": "",
            "nine": ""
        }

        this.current = [];
    }

    checkWin(){
        // returns trure when there is a win and false otherwise
        if(
            (this.played["one"] === "O" && this.played["two"] === "O" && this.played["three"] === "O") ||
            (this.played["four"] === "O" && this.played["five"] === "O" && this.played["six"] === "O") ||
            (this.played["seven"] === "O" && this.played["eight"] === "O" && this.played["nine"] === "O") ||
            (this.played["one"] === "O" && this.played["four"] === "O" && this.played["seven"] === "O") ||
            (this.played["two"] === "O" && this.played["five"] === "O" && this.played["eight"] === "O") ||
            (this.played["three"] === "O" && this.played["six"] === "O" && this.played["nine"] === "O") ||
            (this.played["one"] === "O" && this.played["five"] === "O" && this.played["nine"] === "O") ||
            (this.played["three"] === "O" && this.played["five"] === "O" && this.played["seven"] === "O")
        ){
            console.log("player O wins");
            this.scores[1] += 1;
            return true;
        }
        else if(
            (this.played["one"] === "X" && this.played["two"] === "X" && this.played["three"] === "X") ||
            (this.played["four"] === "X" && this.played["five"] === "X" && this.played["six"] === "X") ||
            (this.played["seven"] === "X" && this.played["eight"] === "X" && this.played["nine"] === "X") ||
            (this.played["one"] === "X" && this.played["four"] === "X" && this.played["seven"] === "X") ||
            (this.played["two"] === "X" && this.played["five"] === "X" && this.played["eight"] === "X") ||
            (this.played["three"] === "X" && this.played["six"] === "X" && this.played["nine"] === "X") ||
            (this.played["one"] === "X" && this.played["five"] === "X" && this.played["nine"] === "X") ||
            (this.played["three"] === "X" && this.played["five"] === "X" && this.played["seven"] === "X")
        ){
            console.log("player X wins");
            this.scores[0] += 1;
            return true;
        }
        return false;
    }

    play(btn=""){

        var player = this.state.player;
        var players = this.players;
        
        var reverse_mapping = {
            "one": 1,
            "two": 2,
            "three": 3,
            "four": 4,
            "five": 5,
            "six": 6,
            "seven": 7,
            "eight": 8,
            "nine": 9
        }

        if (this.played[btn] !== ""){
            console.log("already checked, play again")
        }else{
            this.played[btn] = player;

            this.current.push(reverse_mapping[btn]); // track move

            if (player === players[0]){
                this.setState({
                    player: players[1]
                });
            }else{
                this.setState({
                    player: players[0]
                });
            }
        }
    }

    aiMove(){
        // easy mode

        // var guess = this.chance([1,2,3,4,5,6,7,8,9]); // move bebecomes the guess

        //AI mode
        var mapping = this.mapping;

        // game strategy:  attack to win, if fails, then defend, if fails, play random
        var move = this.logic(this.current, 'attack');
        if (move){
            this.play(mapping[move]);
        }else{
            move = this.logic(this.current, 'defend');
            if (move){
                this.play(mapping[move]);
            }else{
                // optima has failed:
                move = this.chance([1,2,3,4,5,6,7,8,9]);;
                this.play(mapping[move]);
            }
        }
    }

    chance(possible){
        var guess = this.random( possible.length );
        var mapping = this.mapping;
        while(this.played[mapping[guess]] !== ""){
            guess = guess = this.random( possible.length );
        }
        return guess;
    }

    // AI logic
    logic(current, type){
        var curr = current;
        var starting = [1,3,5,7,9];
        var corners = [1,3,7,9];
        var board = [1,2,3,4,5,6,7,8,9];


        if (curr.length === 0){ // MOVES :: frist: AI
            return starting[this.random( starting.length )];
        }

        if( curr.length === 1){ // MOVES :: first: human, second: AI
            if(curr[0] !== 5){
                return 5;
            }else{
                return corners[this.random( corners.length )];
            }
        }

        if(curr.length === 2){ // MOVES :: first: AI, second: human, third: AI
            curr.forEach( (i) => {
               board.splice( board.indexOf(i), 1); // remove marked places from board
            });
            // return board[this.random( board.length )]; // check for optimal move here
            console.log(curr.length, this.optima(board));
            return board[this.random( board.length )];
        }

        if( type === "attack"){
            // look for optimum attacking positions
            if (curr.length >= 3 && curr.length <= 7){
                curr.forEach( (i) => {
                    board.splice( board.indexOf(i), 1);
                });
                console.log(curr.length, this.optima(board));
                return this.optima(board, "attack");
            }
        }else{
            // look for optimum defending positions
            if (curr.length >= 3 && curr.length <= 7){
                curr.forEach( (i) => {
                    board.splice( board.indexOf(i), 1);
                });
                console.log(curr.length, this.optima(board));
                return this.optima(board, "defend");
            }
        }

        if (curr.length === 8){ // MOVES :: first: AI, second: human, third: AI, fourth: human, fifth: AI, sixth: human, seventh: AI, eighth: human, ninth: AI
            curr.forEach( (i) => {
                board.splice( board.indexOf(i), 1);
            });
            return board[0]; // a draw
        }

    }

    optima(choices, type){
        // type: the optimization method
        var curr = this.current;
        var played = this.played;
        var mapping = this.mapping;

        console.log(choices);

        if(choices.includes(1)){
            if (curr.includes(2) && curr.includes(3)){
                if (this.strategy(2, 3, type) && played[mapping[1]] === ""){
                    return 1;
                }
            }

            if (curr.includes(4) && curr.includes(7)){
                if (this.strategy(4, 7, type) && played[mapping[1]] === ""){
                    return 1;
                }
            }

            if (curr.includes(5) && curr.includes(9)){
                if (this.strategy(5, 9, type) && played[mapping[1]] === ""){
                    return 1;
                }
            }

        }

        if(choices.includes(2)){
            if (curr.includes(1) && curr.includes(3)){
                if (this.strategy(1, 3, type) && played[mapping[2]] === ""){
                    return 2;
                }
            }

            if (curr.includes(5) && curr.includes(8)){
                if (this.strategy(5, 8, type) && played[mapping[2]] === ""){
                    return 2;
                }
            }

        }

        if(choices.includes(3)){
            if (curr.includes(1) && curr.includes(2)){
                if (this.strategy(1, 2, type) && played[mapping[3]] === ""){
                    return 3;
                }
            }

            if (curr.includes(5) && curr.includes(7)){
                if (this.strategy(5, 7, type) && played[mapping[3]] === ""){
                    return 3;
                }
            }

            if (curr.includes(6) && curr.includes(9)){
                if (this.strategy(6, 9, type) && played[mapping[3]] === ""){
                    return 3;
                }
            }

        }

        if(choices.includes(4)){
            if (curr.includes(1) && curr.includes(7)){
                if (this.strategy(1, 7, type) && played[mapping[4]] === ""){
                    return 4;
                }
            }

            if (curr.includes(5) && curr.includes(6)){
                if (this.strategy(5, 6, type) && played[mapping[4]] === ""){
                    return 4;
                }
            }

        }

        if(choices.includes(5)){
            if (curr.includes(1) && curr.includes(9)){
                if (this.strategy(1, 9, type) && played[mapping[5]] === ""){
                    return 5;
                }
            }

            if (curr.includes(2) && curr.includes(8)){
                if (this.strategy(2, 8, type) && played[mapping[5]] === ""){
                    return 5;
                }
            }

            if (curr.includes(3) && curr.includes(7)){
                if (this.strategy(3, 7, type) && played[mapping[5]] === ""){
                    return 5;
                }
            }

            if (curr.includes(4) && curr.includes(6)){
                if (this.strategy(4, 6, type) && played[mapping[5]] === ""){
                    return 5;
                }
            }

        }

        if(choices.includes(6)){
            if (curr.includes(3) && curr.includes(9)){
                if (this.strategy(3, 9, type) && played[mapping[6]] === ""){
                    return 6;
                }
            }

            if (curr.includes(4) && curr.includes(5)){
                if (this.strategy(4, 5, type) && played[mapping[6]] === ""){
                    return 6;
                }
            }

        }

        if(choices.includes(7)){
            if (curr.includes(1) && curr.includes(4)){
                if (this.strategy(1, 4, type) && played[mapping[7]] === ""){
                    return 7;
                }
            }

            if (curr.includes(3) && curr.includes(5)){
                if (this.strategy(3, 5, type) && played[mapping[7]] === ""){
                    return 7;
                }
            }

            if (curr.includes(8) && curr.includes(9)){
                if (this.strategy(8, 9, type) && played[mapping[7]] === ""){
                    return 7;
                }
            }

        }

        if(choices.includes(8)){
            if (curr.includes(2) && curr.includes(5)){
                if (this.strategy(2, 5, type) && played[mapping[8]] === ""){
                    return 8;
                }
            }

            if (curr.includes(7) && curr.includes(9)){
                if (this.strategy(7, 9, type) && played[mapping[8]] === ""){
                    return 8;
                }
            }

        }

        if(choices.includes(9)){ // 9
            if (curr.includes(1) && curr.includes(5)){
                if (this.strategy(1, 5, type) && played[mapping[9]] === ""){
                    return 9;
                }
            }

            if (curr.includes(3) && curr.includes(6)){
                if (this.strategy(3, 6, type) && played[mapping[9]] === ""){
                    return 9;
                }
            }

            if (curr.includes(7) && curr.includes(8)){
                if (this.strategy(7, 8, type) && played[mapping[9]] === ""){
                    return 9;
                }
            }
        }

    } // end of optima

    strategy(a, b, method){

        var human  = this.human;
        if (human === 'X'){
            var ai = 'O';
        }else{
            ai = 'X';
        }
        var mapping = this.mapping;
        var played = this.played;

        if( method === "attack"){
            if( played[mapping[a]] === ai && played[mapping[b]] === ai ) {
                return true;
            }else{
                return false;
            }
        }else{ // defend
            if( played[mapping[a]] === human && played[mapping[b]] === human ) {
                return true;
            }else{
                return false;
            }
        }
    }

    random(n){
        return Math.floor(Math.random()*(n-0));
    }

    // end of AI logic

    handleClick(e){
        var btn = e.target.getAttribute('id');

        switch(btn){
            case 'O':
                this.setState({
                    flag: "play",
                    player: "O"
                })
                this.human = "O";
                break;
            case 'X':
                this.setState({
                    flag: "play",
                    player: "X"
                })
                this.human = "X";
                break;
            default:
                if (this.state.player){
                    this.play(btn);
                    break;
                }
                this.setState({ flag: "pick"})
        }
    }

    render() {
        return (
            <div className="App">
                <div className="Board">
                    { this.state.flag === "pick"?
                        <div className="picker">
                            <h1 className="msg"> pick a player </h1>
                            <Tile id="X" onClick={this.handleClick} value="X"/>
                            <Tile id="O" onClick={this.handleClick} value="O"/>
                        </div>:
                        <div className="wrapper">
                            <div className="screen">
                                {this.state.player === this.human?
                                    <span className="prompt active"></span>:
                                    <span className="prompt"></span>
                                }
                                <div className="player 1">
                                    <span id="player">You [ {this.human} ]</span>
                                    <span id="score">{this.human === 'X'? this.scores[0] : this.scores[1]}</span>
                                </div>
                                <span className="separator">:</span>
                                {this.human === 'X'?
                                    <div className="player 2">
                                        <span id="score">{this.scores[1]}</span>
                                        <span id="player">Computer [ O ]</span>
                                    </div>:
                                    <div className="player 2">
                                        <span id="score">{this.scores[0]}</span>
                                        <span id="player">Computer [ X ]</span>
                                    </div>
                                }
                                {this.state.player !== this.human?
                                    <span className="prompt active"></span>:
                                    <span className="prompt"></span>
                                }
                            </div>
                            <Tile id="one"
                                onClick={this.handleClick}
                                value={this.played["one"]}
                            />
                            <Tile id="two"
                                onClick={this.handleClick}
                                value={this.played["two"]}
                            />
                            <Tile id="three"
                                onClick={this.handleClick}
                                value={this.played["three"]}
                            />
                            <Tile id="four"
                                onClick={this.handleClick}
                                value={this.played["four"]}
                            />
                            <Tile id="five"
                                onClick={this.handleClick}
                                value={this.played["five"]}
                            />
                            <Tile id="six"
                                onClick={this.handleClick}
                                value={this.played["six"]}
                            />
                            <Tile id="seven"
                                onClick={this.handleClick}
                                value={this.played["seven"]}
                            />
                            <Tile id="eight"
                                onClick={this.handleClick}
                                value={this.played["eight"]}
                            />
                            <Tile id="nine"
                                onClick={this.handleClick}
                                value={this.played["nine"]}
                            />
                        </div>
                    }
                </div>
            </div>
        );
    }
}

class Tile extends Component {
    render() {
        const{id, onClick, value} = this.props;
        return (
            <button className="Tile" id={id} onClick={onClick} >
                {value}
            </button>
        )
    }
}

export default App;

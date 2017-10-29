import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            flag: "pick",
            player: "",
            scores: [0, 0]
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.players = ["X","O"]
        this.human = "";
        this.newGame();
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
    }

    checkWin(){
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
            this.newGame();
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
            this.newGame();
        }

    }

    play(btn){
        var player = this.state.player;
        var players = this.players;

        console.log(player);

        this.played[btn] = player;
        this.checkWin();
        console.log(this.played)

        if (player === players[0]){
            this.setState({
                player: players[1]
            });
        }else if(player === players[1]){
            this.setState({
                player: players[0]
            });
        }

    }

    checkLogic(){
        if (this.state.player !== this.human){
            //computers turn to play
        }
    }

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

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

    play(btn){
        var player = this.state.player;
        var players = this.players;

        console.log(player);

        this.played[btn] = player;

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

    handleClick(e){
        var btn = e.target.getAttribute('id');

        switch(btn){
            case 'O':
                this.setState({
                    flag: "play",
                    player: "O"
                })
                break;
            case 'X':
                this.setState({
                    flag: "play",
                    player: "X"
                })
                break;
            default:
                if (this.state.player){
                    this.play(btn);
                    break;
                }
                this.setState({ flag: "pick"})
        }

    }

    pickSide(){

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

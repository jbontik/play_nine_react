import React, {Component} from "react";
import "./App.css";

class StarsFrame extends Component {
    render() {
        const numberOfStars = Math.floor(Math.random() * 9) + 1;
        const stars = [];
        for (let i = 1; i <= numberOfStars; i++) {
            stars.push(<span className="glyphicon glyphicon-star"/>);
        }

        return (
            <div id="stars-frame">
                <div className="well">
                    {stars}
                </div>
            </div>
        );
    }
}

class ButtonFrame extends Component {
    render() {
        return (
            <div id="button-frame">
                <button className="btn btn-primary btn-lg">=</button>
            </div>
        );
    }
}


class AnswerFrame extends Component {
    render() {
        return (
            <div id="answer-frame">
                <div className="well">...</div>
            </div>
        );
    }
}

class Game extends Component {
    render() {
        return (
            <div id="game">
                <h2>Play Nine</h2>
                <hr/>
                <div className="clearfix">
                    <StarsFrame/>
                    <ButtonFrame/>
                    <AnswerFrame/>
                </div>
            </div>
        );
    }
}

class App extends Component {
    render() {
        return (
            <Game/>
        );
    }
}

export default App;

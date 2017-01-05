import React, {Component} from "react";
import "./App.css";

class StarsFrame extends Component {
    render() {
        return (
            <div id="stars-frame">
                <div className="well">
                    <span className="glyphicon glyphicon-star"/>
                    <span className="glyphicon glyphicon-star"/>
                    <span className="glyphicon glyphicon-star"/>
                    <span className="glyphicon glyphicon-star"/>
                </div>
            </div>
        );
    }
}

class ButtonFrame extends Component {
    render() {
        return (
            <div id="button-frame">
                <button className="btn btn-primary">=</button>
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
                <StarsFrame/>
                <ButtonFrame/>
                <AnswerFrame/>
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

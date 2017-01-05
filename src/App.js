import React, {Component} from "react";
import "./App.css";

class StarsFrame extends Component {
    render() {
        const stars = [];
        for (let i = 1; i <= this.props.randomNumber; i++) {
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
        let button;
        switch (this.props.correct) {
            case true:
                button = (
                    <button className="btn btn-success btn-lg" onClick={this.props.acceptAnswer}><span
                        className="glyphicon glyphicon-ok"/></button>);
                break;
            case false:
                button = (
                    <button className="btn btn-danger btn-lg"><span className="glyphicon glyphicon-remove"/></button>);
                break;
            default:
                const disabled = this.props.selectedNumbers.length === 0;
                button = (
                    <button className="btn btn-primary btn-lg" disabled={disabled} onClick={this.props.checkAnswer}>
                        =</button>);
        }

        return (
            <div id="button-frame">
                {button}
                <br/>
                <br/>
                <button className="btn btn-warning btn-xs"
                        onClick={this.props.redraw}
                        disabled={this.props.redraws === 0}>
                    <span className="glyphicon glyphicon-refresh"></span>
                    &nbsp;
                    {this.props.redraws}
                </button>
            </div>
        );
    }
}


class AnswerFrame extends Component {
    render() {
        const selectedNumbers = this.props.selectedNumbers.map(i => (
            <span onClick={() => this.props.unselectNumber(i)}>{i}</span>));

        return (
            <div id="answer-frame">
                <div className="well">{selectedNumbers}</div>
            </div>
        );
    }
}

class NumbersFrame extends Component {
    render() {
        const numbers = [];
        for (let i = 1; i <= 9; i++) {
            let className = "numbers selected-" + (this.props.selectedNumbers.indexOf(i) >= 0)
                + " used-" + (this.props.usedNumbers.indexOf(i) >= 0)
            numbers.push(<div className={className} onClick={() => this.props.selectNumber(i)}>{i}</div>);
        }

        return (
            <div id="numbers-frame">
                <div className="well">
                    {numbers}
                </div>
            </div>
        );
    }
}

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedNumbers: []
            , usedNumbers: []
            , numberOfStars: this.randomNumber()
            , correct: null
            , redraws: 5
        };
    }

    selectNumber = (clickedNumber) => {
        if (this.state.selectedNumbers.indexOf(clickedNumber) < 0) {
            this.setState({
                selectedNumbers: this.state.selectedNumbers.concat(clickedNumber)
                , correct: null
            });
        }
    };

    unselectNumber = (clickedNumber) => {
        const selectedNumbers = this.state.selectedNumbers;
        const indexOfClickedNumber = selectedNumbers.indexOf(clickedNumber);
        selectedNumbers.splice(indexOfClickedNumber, 1);
        this.setState({
            selectedNumbers: selectedNumbers
            , correct: null
        });
    };

    sumOfSelectedNumbers = () => {
        return this.state.selectedNumbers.reduce((a, b) => a + b, 0);
    };

    checkAnswer = () => {
        const correct = (this.sumOfSelectedNumbers() === this.state.numberOfStars);
        this.setState({correct: correct});
    };

    randomNumber = () => {
        return Math.floor(Math.random() * 9) + 1;
    };

    acceptAnswer = () => {
        const usedNumbers = this.state.usedNumbers.concat(this.state.selectedNumbers);
        this.setState({
            usedNumbers: usedNumbers
            , selectedNumbers: []
            , correct: null
            , numberOfStars: this.randomNumber()
        });
    };

    redraw = () => {
        const redraws = this.state.redraws;
        if (redraws > 0) {
            this.setState(
                {
                    numberOfStars: this.randomNumber()
                    , selectedNumbers: []
                    , correct: null
                    , redraws: redraws - 1
                }
            );
        }
    };

    render() {
        const selectedNumbers = this.state.selectedNumbers;

        return (
            <div id="game">
                <h2>Play Nine</h2>
                <hr/>
                <div className="clearfix">
                    <StarsFrame numberOfStars={this.state.numberOfStars}/>
                    <ButtonFrame selectedNumbers={selectedNumbers} correct={this.state.correct}
                                 checkAnswer={this.checkAnswer}
                                 acceptAnswer={this.acceptAnswer}
                                 redraws={this.state.redraws}
                                 redraw={this.redraw}/>
                    <AnswerFrame selectedNumbers={selectedNumbers}
                                 unselectNumber={this.unselectNumber}/>
                </div>
                <NumbersFrame selectedNumbers={selectedNumbers}
                              usedNumbers={this.state.usedNumbers}
                              selectNumber={this.selectNumber}/>
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

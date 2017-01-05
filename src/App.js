import React, {Component} from "react";
import "./App.css";

class StarsFrame extends Component {
    render() {
        const stars = [];
        for (let i = 1; i <= this.props.numberOfStars; i++) {
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
                    <button className="btn btn-success btn-lg"><span className="glyphicon glyphicon-ok"/></button>);
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
            let className = "numbers selected-" + (this.props.selectedNumbers.indexOf(i) >= 0);
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
            , numberOfStars: Math.floor(Math.random() * 9) + 1
            , correct: null
        };
    }

    selectNumber = (clickedNumber) => {
        if (this.state.selectedNumbers.indexOf(clickedNumber) < 0) {
            this.setState({selectedNumbers: this.state.selectedNumbers.concat(clickedNumber)
            , correct: null});
        }
    };

    unselectNumber = (clickedNumber) => {
        const selectedNumbers = this.state.selectedNumbers;
        const indexOfClickedNumber = selectedNumbers.indexOf(clickedNumber);
        selectedNumbers.splice(indexOfClickedNumber, 1);
        this.setState({selectedNumbers: selectedNumbers
        , correct: null});
    };

    sumOfSelectedNumbers = () => {
        return this.state.selectedNumbers.reduce((a, b) => a + b, 0);
    };

    checkAnswer = () => {
        const correct = (this.sumOfSelectedNumbers() === this.state.numberOfStars);
        this.setState({correct: correct});
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
                                 checkAnswer={this.checkAnswer}/>
                    <AnswerFrame selectedNumbers={selectedNumbers}
                                 unselectNumber={this.unselectNumber}/>
                </div>
                <NumbersFrame selectedNumbers={selectedNumbers}
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

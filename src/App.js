import React, {Component} from "react";
import "./App.css";

const possibleCombinationSum = function (arr, n) {
    if (arr.indexOf(n) >= 0) {
        return true;
    }
    if (arr[0] > n) {
        return false;
    }
    if (arr[arr.length - 1] > n) {
        arr.pop();
        return possibleCombinationSum(arr, n);
    }
    const listSize = arr.length, combinationsCount = (1 << listSize);
    for (let i = 1; i < combinationsCount; i++) {
        let combinationSum = 0;
        for (let j = 0; j < listSize; j++) {
            if (i & (1 << j)) {
                combinationSum += arr[j];
            }
        }
        if (n === combinationSum) {
            return true;
        }
    }
    return false;
};

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

class DoneFrame extends Component {
    render() {
        return (
            <div className="well text-center">
                <h2>{this.props.doneStatus}</h2>
                <button className="btn btn-default" onClick={this.props.resetGame}>Play again</button>
            </div>
        );
    }
}

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => {
        return {
            selectedNumbers: []
            , usedNumbers: []
            , numberOfStars: this.randomNumber()
            , correct: null
            , redraws: 5
            , doneStatus: null
        };
    };

    resetGame = () => {
        this.setState(this.getInitialState());
    };

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
        }, this.updateDoneStatus);
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
            , this.updateDoneStatus);
        }
    };

    possibleCombinations = () => {
      const possibleNumbers = [];
      for (let i = 1; i <= 9; i++) {
          if (this.state.usedNumbers.indexOf(i) < 0) {
              possibleNumbers.push(i);
          }
      }
      return possibleCombinationSum(possibleNumbers, this.state.numberOfStars);
    };

    updateDoneStatus = () => {
      if (this.state.usedNumbers.length === 9) {
          this.setState({doneStatus: "Nice!"});
          return;
      }
      if (this.state.redraws === 0 && !this.possibleCombinations()) {
          this.setState({doneStatus: "Dommage."});
      }
    };

    render() {
        const selectedNumbers = this.state.selectedNumbers;

        let bottomFrame;
        if (this.state.doneStatus) {
            bottomFrame = <DoneFrame doneStatus={this.state.doneStatus} resetGame={this.resetGame}/>;
        }
        else {
            bottomFrame = <NumbersFrame selectedNumbers={selectedNumbers}
                                        usedNumbers={this.state.usedNumbers}
                                        selectNumber={this.selectNumber}/>;
        }

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
                {bottomFrame}
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

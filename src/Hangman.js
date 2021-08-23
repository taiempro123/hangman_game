/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import img08 from "./images/08.png";
import audio_bg from "./music/Advent.mp3";
import img01 from "./images/01.png"
import img02 from "./images/02.png"
import img03 from "./images/03.png"
import img04 from "./images/04.png"
import img05 from "./images/05.png"
import img06 from "./images/06.png"
import img07 from "./images/07.png"
import {randomWord} from "./word"

class Hangman extends Component {

    static defaultProps = {
        maxGuess : 7,
        images : [img01, img02, img03, img04, img05, img06, img07, img08]
    }

    constructor(props) {
        super(props)
        this.state = {
            answer : randomWord().toLocaleUpperCase(),
            guessed : new Set(),
            numWrong: 0
        }
    }


    handleClick = (e) => {
        var value = e.target.value;
        this.setState(oldState => ({
            guessed : oldState.guessed.add(value),
            numWrong: oldState.numWrong + (oldState.answer.includes(value) ? 0 : 1)
        }))
    }

    guesseword = () => {
        return this.state.answer.split("").map(letter => 
                this.state.guessed.has(letter) ? letter :"_"
        );
    }


    resetGame = () => {
        this.setState({
            answer : randomWord().toLocaleUpperCase(),
            guessed : new Set(),
            numWrong: 0
        })
    }



  generator = () => {
    let letters = "qwertyuiopasdfghjklzxcvbnm";
    letters = letters.toLocaleUpperCase().split("");
    return letters.map((letter, index) => {
      return <button 
      key={index} 
      value={letter}
      onClick={this.handleClick}
      disabled = {this.state.guessed.has(letter)}
      >{letter}
      </button>;
    });
  };
  render() {
    var {maxGuess} = this.props;
    var {numWrong, answer} = this.state;
    var isGameOver = numWrong >= maxGuess;
    var isWon = answer === this.guesseword().join("");
    var text = '';
    if(isGameOver) text  = "You Lose";
    if(isWon) text = "You Win";


    return (
      <div className="container">
        <audio autoPlay loop src={audio_bg}></audio>
        <audio autoPlay loop src={isGameOver ? "" :""}></audio>
        <audio autoPlay loop src={isWon ? "" :""}></audio>
        <h1 className="title">Hangman Game</h1>
        <img src={this.props.images[numWrong]} />
        <p className="hangman-word">{isGameOver ? answer : this.guesseword()}</p>
        <p className="result">{text}</p>
        <div className="btn" >
            <div hidden={isGameOver || isWon}>
            {this.generator()}
            </div>
          
          <button className="reset" onClick = {this.resetGame}>Reset</button>
        </div>
      </div>
    );
  }
}

export default Hangman;

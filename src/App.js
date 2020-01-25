import React from 'react';
import './App.css';
import Radium from 'radium'
import Players from './players/players'
import Action from './action/action'
import Model from './model'


class App extends React.Component {
  scoreClassNameA = "red"
  scoreClassNameB = "red"
  state = {
    a: 0,
    b: 5,
    typeA: 0,
    valueA: 0,
    typeB: 0,
    valueB: 0,
    playerList:[
    {
      index: 0,
      name: "batman",
      energy: 20,
      wall: 0,
    },
    {
      index: 1,
      name: "joker",
      energy: 20,
      wall: 0,
    },
    {
      index: 2,
      name: "superman",
      energy: 20,
      wall: 0,
    },
    {
      index: 3,
      name: "wonder women",
      energy: 20,
      wall: 0,
    },
    {
      index: 4,
      name: "flash",
      energy: 20,
      wall: 0,
    },
    {
      index: 5,
      name: "thor",
      energy: 20,
      wall: 0,
    },
    {
      index: 6,
      name: "ironman",
      energy: 20,
      wall: 0,
    },
    {
      index: 7,
      name: "hulk",
      energy: 20,
      wall: 0,
    },
    {
      index: 8,
      name: "captain america",
      energy: 20,
      wall: 0,
    },
    {
      index: 9,
      name: "spiderman",
      energy: 20,
      wall: 0,
    }]
  }

  restPlayer = (lst) => {
    this.setState({
      playerList: lst,
    });
  }
  
  changeState = (energyA, wallA, typeA, valueA, energyB, wallB, typeB, valueB, a, b, nextfun, flag, type) => {
    for(let i=0;i<10;i++){
      if(this.state.playerList[i].index === a){
        let lst = this.state.playerList;
        lst[i].energy = energyA;
        lst[i].wall = wallA;
        this.setState({
          typeA: typeA,
          typeB: typeB,
          valueA: valueA,
          valueB: valueB,
          playerList: lst}, () => {
            if(flag === 0)
            setTimeout(nextfun, 1000);
            this.scoreClassNameB = (typeB? "blue": "red");
        })
      }

      if(this.state.playerList[i].index === b){
        let lst = this.state.playerList;
        lst[i].energy = energyB;
        lst[i].wall = wallB;
        this.setState({
          typeA: typeA,
          typeB: typeB,
          valueA: valueA,
          valueB: valueB,
          playerList: lst
        })
      }
    }
    this.scoreClassNameA = (typeA? "blue": "red");
    this.scoreClassNameB = (typeB? "blue": "red");
  }

  changePlayer = (index) => {
    let lst = this.state.playerList;
    if(index < 5){
      this.setState((prevState) => {
        return({
          a: index,
          playerList: lst,
        })
      })
    }
    else{
      this.setState({
        b: index,
        playerList: lst
      })
    }
  }
  
  winnerCheck = () => {
    let count = 0;
    for(let i=5;i<10;i++){
      if(this.state.playerList[i].energy < 0)
      count++;
    }
    if(count === 5)
    return 0;
    count = 0;
    for(let i=0;i<5;i++){
      if(this.state.playerList[i].energy < 0)
      count++;
    }
    if(count === 5)
    return 1;
    return -1;
  }

  maxEnergyPlayer = (start, end) => {
    let max = 0;
    let index = start;
    for(let i=start;i<end;i++){
      if(this.state.playerList[i].energy >= max){
        max = this.state.playerList[i].energy;
        index = i;
      }
    }
    return index;
  }

  currentPlayerCheck = () => {
    if(this.state.playerList[this.state.a].energy < 0){
      let index = this.maxEnergyPlayer(0, 5);
      this.setState({a: index}); 
    }
    if(this.state.playerList[this.state.b].energy < 0){
      let index = this.maxEnergyPlayer(5, 10);
      this.setState({b: index}); 
    }
  }

  render(){
    let show = 0;
    let winner = "DC";
    let result = this.winnerCheck();
    if(result !== -1){
      show = 1;
      if(result === 1){
        winner = "MARVEL";
      }
    }
    // for(let i=0;i<10;i++){
    //   console.log(this.state.playerList[i].index, this.state.playerList[i].energy);
    // }
    // console.log(this.state.a, this.state.b)
  return (
    <div className="battleArea">
      <Players state={this.state} changePlayer={this.changePlayer}/>
      <Action changeState={this.changeState} state={this.state} currentPlayerCheck={this.currentPlayerCheck}
      restPlayer={this.restPlayer} />
      <Model show={show} winner={winner}/>
      <div className="score-board">
      <span className={"scoreA " + this.scoreClassNameA}>{this.state.valueA}</span>
      <span className={"scoreB " + this.scoreClassNameB}>{this.state.valueB}</span>
      </div>
    </div>
  );
  }
}

export default Radium(App);

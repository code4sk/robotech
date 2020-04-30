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
      energy: 18,
      maxEnergy: 18,
      luck: 0,
      win: 0,
      wall: 0,
    },
    {
      index: 1,
      name: "joker",
      energy: 15,
      maxEnergy: 15,
      luck: 0,
      win: 0,
      wall: 0,
    },
    {
      index: 2,
      name: "superman",
      energy: 20,
      maxEnergy: 20,
      luck: 0,
      win: 0,
      wall: 0,
    },
    {
      index: 3,
      name: "wonder women",
      energy: 18,
      maxEnergy: 18,
      luck: 0,
      win: 0,
      wall: 0,
    },
    {
      index: 4,
      name: "flash",
      energy: 12,
      maxEnergy: 12,
      luck: 0,
      win: 0,
      wall: 0,
    },
    {
      index: 5,
      name: "thor",
      energy: 30,
      maxEnergy: 30,
      luck: 0,
      win: 0,
      wall: 0,
    },
    {
      index: 6,
      name: "spiderman",
      energy: 22,
      maxEnergy: 22,
      luck: 0,
      win: 0,
      wall: 0,
    },
    {
      index: 7,
      name: "hulk",
      energy: 25,
      maxEnergy: 25,
      luck: 0,
      win: 0,
      wall: 0,
    },
    {
      index: 8,
      name: "captain america",
      energy: 28,
      maxEnergy: 28,
      luck: 0,
      win: 0,
      wall: 0,
    },
    {
      index: 9,
      name: "ironman",
      energy: 35,
      maxEnergy: 35,
      luck: 0,
      win: 0,
      wall: 0,
    },
    ]
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
        }, () => {
          if(flag == 1){
            lst[this.state.a].win += (valueA > valueB);
          console.log("win",lst[this.state.a].win);
          }
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
    // else{
    //   this.setState({
    //     b: index,
    //     playerList: lst
    //   })
    // }
  }

  changePlayerWithTab = () => {
    let prev = this.state.a;
    let i;
    for(i=1;i<=6;i++){
    let lst = this.state.playerList[(prev + i)%5];
    if(lst.energy>=0)
    break
    }
    this.setState({
      a: (prev + i)%5,
    })
  }

  changePlayerWithArrow = (val) => {
    let prev = this.state.a;
    this.setState({
      a: (prev + val)%5,
    })
  }

  restartGame = () => {
    let lst = this.state.playerList;
    for(let i=0;i<10;i++){
      lst[i].energy = lst[i].maxEnergy;
      lst[i].wall = 0;
      lst[i].luck = 0;
    }
    this.setState({
      playerList: lst,
      a: 0, 
      b: 5,
      typeA: 0,
      typeB: 0,
      valueA: 0,
      valueB: 0,
    })
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
      let index = (this.state.b + 1)%5 + 5;
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
  return (
    <div className="battleArea">
      <Players state={this.state} changePlayer={this.changePlayer} valueA={this.state.valueA}
      valueB={this.state.valueB} />
      <Action changeState={this.changeState} state={this.state} currentPlayerCheck={this.currentPlayerCheck}
      restPlayer={this.restPlayer} changePlayerWithTab={this.changePlayerWithTab}
      changePlayerWithArrow={this.changePlayerWithArrow} />
      <Model show={show} winner={winner} restartGame={this.restartGame}/>
    </div>
  );
  }
}

export default Radium(App);

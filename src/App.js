import React from 'react';
import './App.css';
import Radium from 'radium'
import Players from './players/players'
import Action from './action/action'
import Model from './model'


class App extends React.Component {
  
  state = {
    batman:{
        name: "batman",
        energy: 20,
        wall: 0,
        type: 0,
        value: 0
    },
    joker:{
        name: "joker",
        energy: 20,
        wall: 0,
        type: 0,
        value: 0
    },
  }
  
  changeState = (energyA, wallA, typeA, valueA, energyB, wallB, typeB, valueB) => {
    this.setState({
        batman:{
            name: "batman",
            energy: energyA,
            wall: wallA,
            type: typeA,
            value: valueA
        },
        joker:{
            name: "joker",
            energy: energyB,
            wall: wallB,
            type: typeB,
            value: valueB
        },
    }
    )
  }
  
  render(){
    let show = 0;
    let winner = "Batman";
    if(this.state.batman.energy<0||this.state.joker.energy<0){
      show = 1;
      if(this.state.batman.energy<0){
        winner = "Joker";
      }
      console.log('ok');
    }
  return (
    <div className="battleArea">
      <Players energyA={this.state.batman.energy} wallA={this.state.batman.wall} typeA={this.state.batman.type}
        valueA={this.state.batman.value} energyB={this.state.joker.energy} wallB={this.state.joker.wall}
         typeB={this.state.joker.type} valueB={this.state.joker.value} />
      <Action changeState={this.changeState} />
      <Model show={show} winner={winner}/>
    </div>
  );
  }
}

export default Radium(App);

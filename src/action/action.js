import React from 'react'

class Action extends React.Component{
    energyA = 20;
    energyB = 20;
    wallA = 0;
    wallB = 0;
    attackTypeA = 0;
    attackTypeB = 0;
    attackValueA = 0;
    attackValueB = 0;
    funAttack = (attack, wall, energy) => {
        if(wall > 0){
          if(wall >= attack){
            wall -= attack;
          }
          else{
            energy -= attack-wall;
            wall = 0;
          }
        }
        else
        energy -= attack;
        return [wall, energy];
      }
    
      funChoiceExecute = (b, c, energyA, wallA, wallB) => {
        if(b===0){
          [wallA, energyA] = this.funAttack(c, wallA, energyA);
        }
        else{
          wallB += c;
        }
        return [energyA, wallA, wallB];
      }
      nextFun = () => {
        let b = Math.floor(Math.random()*2);
        let c = Math.ceil(Math.random()*10);
        this.attackTypeB = b;
        this.attackValueB = c;
        [this.energyA, this.wallA, this.wallB] = this.funChoiceExecute(b, c, this.energyA,
             this.wallA, this.wallB);
        this.props.changeState(this.energyA, this.wallA, this.attackTypeA, this.attackValueA, this.energyB, this.wallB,
             this.attackTypeB, this.attackValueB)
      }
    funClickAttack = () => {
        let a = Math.floor(Math.random()*10);
        [this.wallB, this.energyB] = this.funAttack(a, this.wallB, this.energyB);
        console.log(a);
        this.attackValueA = a;
        this.attackTypeA = 0;
        setTimeout(this.nextFun, 500);
      }
    funClickDefence = () => {
      let a = Math.floor(Math.random()*10);
      this.wallA += a;
      this.attackValueA = a;
      console.log(a);
      this.attackTypeA = 1;
      setTimeout(this.nextFun, 500);
    }
    render(){
        return(
            <div className="action">
                <button onClick={this.funClickDefence} className="btn btn-shield">Defence</button>
                <button onClick= {this.funClickAttack} className="btn btn-fire">Attack</button>
            </div>
        )
    }
}

export default Action

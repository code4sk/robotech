import React from 'react'
import fireAudio from './gun.mp3'
import shieldAudio from './shield.mp3'

class Action extends React.Component{
  audioAttack = new Audio(fireAudio);
  audioDefence = new Audio(shieldAudio);
  energyA = 0;
  energyB = 0;
  wallA = 0;
  wallB = 0;
  attackTypeA = 0;
  attackTypeB = 0;
  attackValueA = 0;
  attackValueB = 0;
  luckA = 0;
  luckB = 0;

    funRestPlayer = () => {
      let lst = this.props.state.playerList;
      for(let i=0;i<5;i++){
        let en = this.props.state.playerList[i].energy;
        let b = Math.floor(Math.random()*2);
        if(en >= 0 && en < this.props.state.playerList[i].maxEnergy && i !== this.props.state.a && i !== this.props.state.b && (this.luckA || b)){
          lst[i].energy += 1;
        }
        lst[i].luck = !lst[i].luck;
      }
      this.props.restPlayer(lst);
    }

    funAttack = (attack, wall, energy) => {
      this.audioAttack.play();
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
          wallB = Math.min(wallB, 20)
          this.audioDefence.play();
        }
        return [energyA, wallA, wallB];
      }
      nextFun = () => {
        let b = Math.floor(Math.random()*2);
        let c = Math.ceil(Math.random()*11);
        let d = Math.ceil(Math.random()*9);
        if(this.wallB >= 20){
          b=0;
        }
        this.attackTypeB = b;
        this.attackValueB = b?d:c;
        [this.energyA, this.wallA, this.wallB] = this.funChoiceExecute(b, this.attackValueB, this.energyA,
             this.wallA, this.wallB);
        this.props.changeState(this.energyA, this.wallA, this.attackTypeA, this.attackValueA, this.energyB,
           this.wallB, this.attackTypeB, this.attackValueB, this.props.state.a, this.props.state.b, this.nextFun,
           1, b);
        this.props.currentPlayerCheck();
      }
    funClickAttack = () => {
        let a = Math.floor(Math.random()*10);
        [this.wallB, this.energyB] = this.funAttack(a, this.wallB, this.energyB);
        console.log(a);
        this.attackValueA = a;
        this.attackTypeA = 0;
        this.props.changeState(this.energyA, this.wallA, this.attackTypeA, this.attackValueA, this.energyB,
          this.wallB, this.attackTypeB, this.attackValueB, this.props.state.a, this.props.state.b, this.nextFun,
          0, 0 );
          this.funRestPlayer();
        //setTimeout(this.nextFun, 4000);
      }
    funClickDefence = () => {
      if(this.wallA >= 20){
        return;
      }
      let a = Math.floor(Math.random()*8); 
      this.wallA += a;
      this.wallA = Math.min(this.wallA, 20)
      this.attackValueA = a;
      console.log(a);
      this.attackTypeA = 1;
      this.audioDefence.play();
      this.props.changeState(this.energyA, this.wallA, this.attackTypeA, this.attackValueA, this.energyB,
        this.wallB, this.attackTypeB, this.attackValueB, this.props.state.a, this.props.state.b, this.nextFun,
        0, 1 );
        this.funRestPlayer();
      //setTimeout(this.nextFun, 1000);
    }
    render(){
      this.energyA = this.props.state.playerList[this.props.state.a].energy;
    this.energyB = this.props.state.playerList[this.props.state.b].energy;
    this.wallA = this.props.state.playerList[this.props.state.a].wall;
    this.wallB = this.props.state.playerList[this.props.state.b].wall;
    this.attackTypeA = this.props.state.typeA;
    this.attackTypeB = this.props.state.typeB;
    this.attackValueA = this.props.state.valueA;
    this.attackValueB = this.props.state.valueB;
    this.luckA = this.props.state.playerList[this.props.state.a].luck;
    this.luckB = this.props.state.playerList[this.props.state.b].luck;
    let btnAttackClassName = "btn btn-fire";
    let btnDefClassName = "btn btn-shield";
    if(this.energyA < 0 || this.energyB < 0){
      btnAttackClassName += " disable";
      btnDefClassName += " disable";
    }
        return(
            <div className="action">
                <button id="defenceBtn" onClick={this.funClickDefence} className={btnDefClassName}>Defence</button>
                <button id="attackBtn" onClick= {this.funClickAttack} className={btnAttackClassName}>Attack</button>
            </div>
        )
    }
    aF = (e) =>{
      e.preventDefault();

      if(e.keyCode === 9 || e.keyCode === 32){
        this.props.changePlayerWithTab();
      } else if(e.keyCode === 38){
        this.props.changePlayerWithArrow(4);
      }
      else if(e.keyCode === 40){
        this.props.changePlayerWithArrow(+1);
      }

      if(this.energyA < 0 || this.energyB < 0)
      return;
      
      if(e.keyCode === 39){
        this.funClickAttack();
      }
      else if(e.keyCode === 37){
        this.funClickDefence();
      }
    }
    componentDidMount(){
      document.addEventListener("keydown", this.aF);
    }
}

export default Action

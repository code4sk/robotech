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
    if(b===0){

    }
    [this.energyA, this.wallA, this.wallB] = this.funChoiceExecute(b, c, this.energyA, this.wallA, this.wallB);
    this.setState({
      player:[{
        name: "JustSk",
        energy: this.energyA,
        wall: this.wallA,
        skill: "Fire"
      },
    {
      name: "Thanos",
      energy: this.energyB,
      wall: this.wallB,
      skill: "Stone"
    }],
    showWallA: this.wallA,
    showWallB: this.wallB
    })
  }

function Gameflow(props) {
    return null
}

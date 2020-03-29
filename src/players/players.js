import React from 'react'
import Player from './player/player';
import Allies from './allies/allies';

class Players extends React.Component{

    changePlayer = (index) => {
        if(index < 5)
        this.props.changePlayer(index);
    }
  
    render(){
        let plrA = this.props.state.playerList[this.props.state.a];
        let plrB = this.props.state.playerList[this.props.state.b];
        let valueA = this.props.state.valueA;
        let typeA = this.props.state.typeA;
        let typeB = this.props.state.typeB;
        let valueB = this.props.state.valueB;
        let classA = (!typeA?"red": "blue");
        let classB = (!typeB?"red": "blue");
          return(
            <div className="mainContainer">
                <Allies main={this.props.state.a} playerList={this.props.state.playerList} flag={0} changePlayer={this.changePlayer}/>
                <Player flag={0} index={plrA.index} energy={plrA.energy} attackValue={valueA}
                    wall={plrA.wall} image="batman" shieldImage="shieldA" attackType={typeA} maxEnergy={plrA.maxEnergy} />
                <div className="score-board">
                    <span className={"scoreA " + classA}>{this.props.valueA}</span>
                    <span className={"scoreB " + classB}>{this.props.valueB}</span>
                </div>
                <Player flag={1} index={plrB.index} energy={plrB.energy} attackValue={valueB}
                wall={plrB.wall} image="joker" shieldImage="shieldB" attackType={typeB} maxEnergy={plrB.maxEnergy} />
                <Allies main={this.props.state.b} playerList={this.props.state.playerList} flag={1} changePlayer={this.changePlayer}/>          
            </div>
        )
    }
}
export default Players

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
          return(
            <div>
                <Player flag={0} index={plrA.index} energy={plrA.energy} attackValue={valueA}
                    wall={plrA.wall} image="batman" shieldImage="shieldA" attackType={typeA} />
                <Allies main={this.props.state.a} playerList={this.props.state.playerList} flag={0} changePlayer={this.changePlayer}/>
                <Player flag={1} index={plrB.index} energy={plrB.energy} attackValue={valueB}
                    wall={plrB.wall} image="joker" shieldImage="shieldB" attackType={typeB} />
                <Allies main={this.props.state.b} playerList={this.props.state.playerList} flag={1} changePlayer={this.changePlayer}/>
            </div>
        )
    }
}
export default Players

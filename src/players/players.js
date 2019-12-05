import React from 'react'
import Player from './player/player';

class Players extends React.Component{
  
    render(){
          return(
            <div>
                <Player name="batman" energy={this.props.energyA} attackValue={this.props.valueA}
                    wall={this.props.wallA} image="batman" shieldImage="shieldA" attackType={this.props.typeA} />
                <Player name="joker" energy={this.props.energyB} attackValue={this.props.valueB}
                    wall={this.props.wallB} image="joker" shieldImage="shieldB" attackType={this.props.typeB} />
            </div>
        )
    }
}
export default Players

import React from 'react'
import close from './close.svg'
import laughAudio from './laugh.mp3'
import winAudio from './win.mp3'


class Model extends React.Component {
    state = {
        a: 0
    }
    audioLaugh = new Audio(laughAudio);
    audioWin = new Audio(winAudio);
    closeModel = 0
    redirectHome = 0
    closeListener = () =>{
        this.setState({a:!this.state.a});
        this.closeModel = 1;
    }
    homeListener = () =>{
        this.setState({a:!this.state.a});
        this.closeModel = 1;
        this.props.restartGame();
    }
    render(){
        let a = this.props.show;
        if(this.closeModel===1||a===0){
            return null
        }
        if(this.props.winner === "DC"){
            this.audioWin.play();
        } else{
            
            this.audioLaugh.play();
        }
        return (<div className="model-back" >
        <div className="model">
            <h4 className="popup-head">Game Over</h4>
            <button className="no close-svg" onClick={this.closeListener}><img src={close} alt="" className="close"/></button>
            <h4 className="popup-result">{this.props.winner} Won</h4>
            <button className="btn-comment" onClick={this.homeListener}>Play again &rarr; </button>
        </div>
    </div>)
    }
}

export default Model

import React from 'react'
import close from './close.svg'

class Model extends React.Component {
    constructor(props){
        super(props)
        this.state = {a:props.show}
    }
    closeModel = 0
    redirectHome = 0
    closeListener = () =>{
        this.setState({a:0})
        this.closeModel = 1
    }
    homeListener = () =>{
        this.setState({a:0})
    }
    render(){
        let a = this.props.show;
        if(this.closeModel===1||a===0){
            return null
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

import React from 'react';
import './allies.css'


class Allies extends React.Component{
    changePlayer = (index) => {
        console.log(this.props)
        this.props.changePlayer(index);
    }
    render(){
        let boxName = "alliesBox " + (!this.props.flag ?"friend":"enemey");
        let allies = this.props.playerList.map((el) => {
            let alliesClassName = "allies";
            let imgName = require('../heroImages/' + el.index + '.jpg');
            if(el.energy < 0)
            alliesClassName += " lost";
            if(el.index === this.props.main || (el.index > 4 && !this.props.flag) || (el.index < 5 && this.props.flag))
            return null;
            return(
            <div className={alliesClassName} key={el.index} onClick={this.changePlayer.bind(this, el.index)}>
                <img src={imgName} alt="sk"></img>
                <span>{el.name}</span>
            </div>);
        })
        return(
            <div className={boxName}>
                {allies}
            </div>
        );
    }
}

export default Allies;

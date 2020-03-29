import React from 'react'
import './player.css'
import Radium from 'radium'
import shieldImageA from './shieldA.jpg'
import shieldImageB from './shieldB.jpg'
// import fire from './fire.jpg'
// import water from './water.jpg'

class Player extends React.Component{
    state = {
        playerBWall: this.props.showWallB,
        wall: this.props.wall,
    }
    styleWall = {
        opacity: this.state.wall,
        fontSize: '16px',
        margin: '8px'
    }

    styleCharacter = {
        height: '250px',
    }
    styleFire = {
        height: '80px'
    }
    styleEnergyBar = {
        position: 'relative',
        top: 0,
        left: 0,
        backgroundColor: 'red',
        width: '100%',
        transformOrigin: '0 0',
        // margin: '20px',
        margin: 0,
        padding: 0,
        height: '30px',
        fontFamily: 'Cute Font'
    }
    render(){
        this.styleWall.opacity = this.props.wall;
        let str = "player"+ this.props.flag + " player"
        let str1 = "playerWall playerWall" + this.props.flag
        let strImage;
        let strChImage = require("../heroImages/" + this.props.index + ".jpg");
        // let value;
        // let type;
        if(this.props.energy == this.props.maxEnergy){
            this.styleEnergyBar.backgroundColor = 'orange'
        } else{
            this.styleEnergyBar.backgroundColor = 'red'
        }
        this.styleEnergyBar.width = ((this.props.energy/this.props.maxEnergy)*100).toString() + "%";
        if((this.props.energy)<0)
        {
            this.styleEnergyBar.width = 0;
        }
        //value = this.props.attackValue;
        if(this.props.flag === 0){
            strImage = shieldImageA;
        }
        else{
            strImage = shieldImageB;
        }
        // if(this.props.attackType === 0){
        //     type = fire;
        // }
        // else
        // type = water
        // <div className="fire"><span>{value}</span><img src={type} style={this.styleFire} alt="type"></img></div>
        return (
            <div className={str}>
                <div style={this.styleEnergyBar}><span className="player__energy attr">{this.props.energy}</span></div>
                <img className="characterImage" style={this.styleCharacter} src={strChImage} alt="character"></img>
                <div style={this.styleWall} className={str1}><img className="shieldImage" src={strImage} alt="SHIELD"></img>
                <span className="shieldValue">{this.props.wall}</span></div>
            </div>
        );
    }
}

export default Radium(Player); 

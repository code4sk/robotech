import React from 'react'
import './player.css'
import Radium from 'radium'
import shieldImageA from './shieldA.jpg'
import shieldImageB from './shieldB.jpg'
import batman_image from './batman.jpg'
import joker_image from './joker.jpg'
import fire from './fire.jpg'
import water from './water.jpg'

class Player extends React.Component{
    state = {
        playerBWall: this.props.showWallB,
        wall: this.props.wall,
    }
    styleWall = {
        opacity: this.state.wall
    }

    styleCharacter = {
        height: '250px'
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
        if(this.props.wall > 0){
            this.styleWall.opacity = this.props.wall;
        }
        else{
            this.styleWall.opacity = this.props.wall;
        }
        let str = this.props.name + " player"
        let str1 = "playerWall playerWall" + this.props.name
        let strImage;
        let strChImage;
        let value;
        let type;
        this.styleEnergyBar.width = ((this.props.energy/20)*100).toString() + "%";
        if((this.props.energy)<0)
        {
            this.styleEnergyBar.width = 0;
        }
        value = this.props.attackValue;
        if(this.props.name === "batman"){
            strImage = shieldImageA;
            strChImage = batman_image;
        }
        else{
            strImage = shieldImageB;
            strChImage = joker_image;
        }
        if(this.props.attackType === 0){
            type = fire;
        }
        else
        type = water
        return (
            <div className={str}>
                <div style={this.styleEnergyBar}><span className="player__energy attr">{this.props.energy}</span></div>
                <img className="characterImage" style={this.styleCharacter} src={strChImage} alt="character"></img>
                <div style={this.styleWall} className={str1}><img className="shieldImage" src={strImage} alt="SHIELD"></img>{this.props.wall}</div>
                <div className="fire"><span>{value}</span><img src={type} style={this.styleFire} alt="type"></img></div>
            </div>
        );
    }
}

export default Radium(Player); 

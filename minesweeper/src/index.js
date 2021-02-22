import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Box extends React.Component{
    constructor(props){
        super(props);
        this.state={
            x:-0,
            y:-59,
            covered:true,
            type:"0",
            //shown: url("https://minesweeperonline.com/sprite150.gif")
            shown: ""
        };
    }
    
    render(){
        let curStyle = {
            //background: 'url("https://minesweeperonline.com/sprite150.gif") -96px -59px' ,
            backgroundPositionX: this.state.x,//'0',
            backgroundPositionY: this.state.y//'-59px'
           // width: '24px',
           // height: '24px'
        };
        return(
            <button className="box"
            style={curStyle}
            onClick={(e) => {this.setState({covered: false})}}
            onContextMenu={(e) => {e.preventDefault(); this.setState({x: -24}); this.setState({y: -59})}}
            >
                
                    {
                    (() => {
                        if(!this.state.covered){
                            if(this.state.type === "0"){
                                //blank
                                this.setState({x: 0});
                                this.setState({y: -35});
                            }
                            else if(this.state.type == -1){
                                //bomb
                                this.setState({x: 96});
                                this.setState({y: -59});
                            }
                            else{
                                this.state.shown = this.state.type;
                            }
                            this.setState({covered: true});
                            //this.state.shown = this.state.type;
                            //Board.getElementsByClassName('box')[0].style.background = "url(https://minesweeperonline.com/sprite150.gif)";
                        }
                    })(),
                    this.state.shown
                    //this.setAttribute("style", "background: " + this.state.shown + ";")
                    //this.style.background = 'red'
                    }
                    
            </button>
        );
    }
}
/**
 * board is 30 boxes across
 * 16 boxes down
 * 
 */
class Board extends React.Component{
    renderBox(){
        return <Box />;
    }
    renderRow(i){
        let props={
            covered:false,
            status:0
        }
        const row = [];
        for(var i = 0; i < 30; ++i){
            row.push(this.renderBox());
        }
        return row;
    }
    render(){
        /*
        let props = {
            covered:false,
            status:0
        }
        */
        return(
            <div>
                <div className="board-row">
                    {this.renderRow()}
                </div>
                <div className="board-row">
                    {this.renderRow()}
                </div>
                <div className="board-row">
                    {this.renderRow()}
                </div>
                <div className="board-row">
                    {this.renderRow()}
                </div>
                <div className="board-row">
                    {this.renderRow()}
                </div>
                <div className="board-row">
                    {this.renderRow()}
                </div>
                <div className="board-row">
                    {this.renderRow()}
                </div>
                <div className="board-row">
                    {this.renderRow()}
                </div>
                <div className="board-row">
                    {this.renderRow()}
                </div>
                <div className="board-row">
                    {this.renderRow()}
                </div>
                <div className="board-row">
                    {this.renderRow()}
                </div>
                <div className="board-row">
                    {this.renderRow()}
                </div>
                <div className="board-row">
                    {this.renderRow()}
                </div>
                <div className="board-row">
                    {this.renderRow()}
                </div>
                <div className="board-row">
                    {this.renderRow()}
                </div>
                <div className="board-row">
                    {this.renderRow()}
                </div>
            </div>  
        );
    }
}
class Game extends React.Component{
    render(){
        return(
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{
                    /**
                     * shit about the game, game status, etc.
                     */
                     }</div>
                </div>
            </div>
        );
    }
}
ReactDOM.render(
    <Game />,
    document.getElementById("root")
);
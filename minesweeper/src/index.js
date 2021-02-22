import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Box extends React.Component{
    constructor(props){
        super(props);
        this.state={
            covered:true,
            type:"0",
            //shown: url("https://minesweeperonline.com/sprite150.gif")
            shown: " "
        };
    }
    
    render(){
        let curStyle = {
            background: 'url("https://minesweeperonline.com/sprite150.gif") -96px -59px' ,
            backgroundpositionx: '-96px',
            backgroundpositiony: '-59px',
            width: '24px',
            height: '24px'
        };
        return(
            <button className="box"
            style={curStyle}
            onClick={(e) => {this.setState({covered: false})}}
            onContextMenu={(e) => {e.preventDefault(); this.setState({shown: '|'})}}
            >
                
                    {
                    (() => {
                        if(!this.state.covered){
                            this.state.shown = this.state.type;
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
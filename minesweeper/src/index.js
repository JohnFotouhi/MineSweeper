import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
let gameOver = false;
let gameOverStopper = false;
class Box extends React.Component{
    constructor(props){
        super(props);
        this.state={
            x:-0,
            y:-59,
            covered:true,
            type:this.props.type,
            //type:"0",
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
                        //this only works on one box becasue after the first box, gameOverStopper = false;
                        if(gameOverStopper){
                            gameOverStopper = false;
                            this.setState({covered: false});
                            // gameOverStopper = false;
                        }
                        if(!this.state.covered){
                            if(this.state.type === "0"){
                                //blank
                                this.setState({x: 0});
                                this.setState({y: -35});
                            }
                            else if(this.state.type === "-1"){
                                //bomb
                                this.setState({x: -96});
                                this.setState({y: -59});
                                if(!gameOver){
                                    gameOver = true;
                                    gameOverStopper = true;
                                }
                                //Array.prototype.forEach.call(document.getElementsByClassName())
                                
                                //below attempts to show all elements but does not work :(
                                Array.from(document.getElementsByClassName("box")).forEach(
                                    function(element, index, array){
                                        console.log(element);
                                        //console.log(element.id);
                                        //this = this.bind(element)
                                        //element.this.setState({covered: false});
                                    }
                                );
                                
                            }
                            else{
                                this.state.shown = this.state.type;
                                this.setState({x: 0});
                                this.setState({y: -35});
                            }
                            //this.state.shown = this.state.type;
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
    /*
    constructor(props){
        super(props);
        
    }
    */
    renderBox(i){
        return <Box type={i.toString()}/>;
    }
    renderRow(arr){
        
        const row = [];
        for(var i = 0; i < 30; ++i){
            row.push(this.renderBox(arr[i]));
        }
        return row;
    }
    
    getRandomInt(min, max){
        return Math.random()*(max-min)+min;
    }

    generateCoordinates(badCol, badRow){
        //TODO: change badRow and badCol based on user input

       var coordinates = []; //[[1, 1], [1, 1]];

        for(var i = 0; i < 16; ++i){
            coordinates[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            //coordinates[i] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        }
        var bombCount = 0;

        while(bombCount < 100){
            var row = Math.trunc(Math.random()*16);
            var col = Math.trunc(Math.random()*30);
            if(coordinates[row][col] !== -1){
                if(row > badRow + 1 || row < badRow - 1 || col > badCol + 1 || col < badCol - 1){
                    coordinates[row][col] = -1;
                    bombCount ++;
                }
            }
        }
        for(var i = 0; i < 16; ++i){
            for(var j = 0; j < 30; ++j){
                bombCount = 0;
                if(coordinates[i][j] !== -1){

                    if(i > 0 && coordinates[i-1][j] === -1){
                        bombCount ++;
                    }
                    if(i < 15 && coordinates[i+1][j] === -1){
                        bombCount++;
                    }
                    if(j > 0 && coordinates[i][j-1] === -1){
                        bombCount++;
                    }
                    if(j < 29 && coordinates[i][j+1] === -1){
                        bombCount++;
                    }
                    if(i > 0 && j > 0 && coordinates[i-1][j-1] === -1){
                        bombCount++;
                    }
                    if(i < 15 && j < 29 && coordinates[i+1][j+1] === -1){
                        bombCount++;
                    }
                    if(i > 0 && j < 29 && coordinates[i-1][j+1] === -1){
                        bombCount++;
                    }
                    if(i < 15 && j > 0 && coordinates[i+1][j-1] === -1){
                        bombCount++;
                    }
                    coordinates[i][j] = bombCount;

                }
            }
        }
        return coordinates;
    }
    render(){
        var coordinates = this.generateCoordinates(15, 8);
        return(
            <div>
                <div className="board-row">
                    {this.renderRow(coordinates[0])}
                </div>
                <div className="board-row">
                    {this.renderRow(coordinates[1])}
                </div>
                <div className="board-row">
                    {this.renderRow(coordinates[2])}
                </div>
                <div className="board-row">
                    {this.renderRow(coordinates[3])}
                </div>
                <div className="board-row">
                    {this.renderRow(coordinates[4])}
                </div>
                <div className="board-row">
                    {this.renderRow(coordinates[5])}
                </div>
                <div className="board-row">
                    {this.renderRow(coordinates[6])}
                </div>
                <div className="board-row">
                    {this.renderRow(coordinates[7])}
                </div>
                <div className="board-row">
                    {this.renderRow(coordinates[8])}
                </div>
                <div className="board-row">
                    {this.renderRow(coordinates[9])}
                </div>
                <div className="board-row">
                    {this.renderRow(coordinates[10])}
                </div>
                <div className="board-row">
                    {this.renderRow(coordinates[11])}
                </div>
                <div className="board-row">
                    {this.renderRow(coordinates[12])}
                </div>
                <div className="board-row">
                    {this.renderRow(coordinates[13])}
                </div>
                <div className="board-row">
                    {this.renderRow(coordinates[14])}
                </div>
                <div className="board-row">
                    {this.renderRow(coordinates[15])}
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
            </div>
        );
    }
}
ReactDOM.render(
    <Game />,
    document.getElementById("root")
);
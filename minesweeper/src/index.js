import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
let gameOver = false;
let gameOverStopper = false;
class Box extends React.Component{
    constructor(props){
        super(props);
        this.clickHandler = () => {
            this.props.clickHandler();
        }
        this.leftClickHandler = (e) => {
            this.props.leftClickHandler(e);
        }
        //this.leftClickHandler = this.leftClickHandler.bind(this);
        //this.clickHandler = this.clickHandler.bind(this);
        this.state={
            x:-0,
            y:-59,
            covered:true,
            type:this.props.type,
            //boxes:this.props.arr,
            //type:"0",
            //shown: url("https://minesweeperonline.com/sprite150.gif")
            shown: ""
        };
    }
    setImage(){
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
            }
            else{
                this.state.shown = this.state.type;
                this.setState({x: 0});
                this.setState({y: -35});
            }
            this.setState({covered: true});
        }
    }
    render(){
        let curStyle = {
            //background: 'url("https://minesweeperonline.com/sprite150.gif") -96px -59px' ,
            backgroundPositionX: this.state.x,//'0',
            backgroundPositionY: this.state.y//'-59px'
        };
        return(
            <button className="box"
            style={curStyle}
            onClick={() => this.clickHandler()}
            onContextMenu={(e) => {
                this.leftClickHandler(e);
            }}
            >
                
                    {
                    (() => {
                        this.setImage();
                    })(),
                    this.state.shown
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
    
    constructor(props){
        super(props);
        this.state={
            gameOver: false
        }
        this.setGameOver = this.setGameOver.bind(this);
        //this.handleClick = this.handleClick.bind(this);
        //this.handleLeftClick = this.handleLeftClick.bind(this);
    }
    handleClick = () => {
        if(this.type == "-1"){
            this.setGameOver();
        }
        this.setState({covered: false});
    }
    handleLeftClick = (e) => {
        e.preventDefault();
        this.setState({x: -24});
        this.setState({y: -59});
    }

    //var boxes = [];
    setGameOver(){
        this.setState({gameOver: true});
    }
    renderBox(i){
        return <Box type={i.toString()} setGameOver={this.setGameOver} 
        clickHandler = {this.handleClick}
        leftClickHandler = {this.handleLeftClick}
        //onContextMenu={(e) => {e.preventDefault(); this.setState({x: -24}); this.setState({y: -59})}}
        />;
    }
    renderRow(arr, num){
        const row = [];
        for(var i = num; num < num + 30; ++i){
            row.push(arr[i]);
        }this.setState({covered: false});this.setState({covered: false});
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

    generateArray(arr){
        var boxes = [];
        for(var i = 0; i < 16; ++i){
            var row = [];
            for(var j = 0; j < 30; ++j){
                row.push(this.renderBox(arr[i][j]));
                //boxes.push(this.renderBox(arr[i][j]));
                //boxes.push(0);
                //boxes.push(this.renderBox(0));
                //boxes.push(arr[i][j]);
            }
            boxes.push(row);
        }
        return boxes;
    }

    uncoverBox(box){
        box.setState({covered: false});
    }
    
    render(){
        var coordinates = this.generateCoordinates(15, 8);
        var boxes = this.generateArray(coordinates);
        return(
            (() => {
                if(this.state.gameOver){
                    for(var i = 0; i < boxes.length; ++i){
                        var box = boxes[i];
                        this.uncoverBox(box);
                        //box.setState({covered: false});
                        //boxes[i] = box;
                        //boxes[i].setState({covered: false});
                    }
                }
            })(),
            <div>
                <div className="board-row">
                    {boxes[0]}
                </div>
                <div className="board-row">
                    {boxes[1]}
                </div>
                <div className="board-row">
                    {boxes[2]}
                </div>
                <div className="board-row">
                    {boxes[3]}
                </div>
                <div className="board-row">
                    {boxes[4]}
                </div>
                <div className="board-row">
                    {boxes[5]}
                </div>
                <div className="board-row">
                    {boxes[6]}
                </div>
                <div className="board-row">
                    {boxes[7]}
                </div>
                <div className="board-row">
                    {boxes[8]}
                </div>
                <div className="board-row">
                    {boxes[9]}
                </div>
                <div className="board-row">
                    {boxes[10]}
                </div>
                <div className="board-row">
                    {boxes[11]}
                </div>
                <div className="board-row">
                    {boxes[12]}
                </div>
                <div className="board-row">
                    {boxes[13]}
                </div>
                <div className="board-row">
                    {boxes[14]}
                </div>
                <div className="board-row">
                    {boxes[15]}
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
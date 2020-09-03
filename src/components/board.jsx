import React from 'react'
import { Link } from 'react-router-dom'
import { Storage } from '../storage/storage'
import Box from './boardBox'
import * as utils from '../utility/functions'

export class Board extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            boxes: Array(9).fill(null),
            history: [],
            xIsNext: true
        }
    }

    storage = new Storage()

    handleBoxClick(index) {
        const boxes = this.state.boxes.slice()
        let history = this.state.history
        if (utils.findWinner(boxes) || boxes[index]) {
            return
        }
        if (utils.areAllBoxesClicked(boxes) === true) {
            return
        }
        boxes[index] = this.state.xIsNext ? 'x' : 'o'
        history.push(this.state.xIsNext ? 'x' : 'o')
        this.setState({
            boxes: boxes,
            history: history,
            xIsNext: !this.state.xIsNext
        })
    }
    handleBoardRestart = () => {
        this.setState({
            boxes: Array(9).fill(null),
            history: [],
            xIsNext: true
        })
    }

    render() {
        // Get winner (if there is any)
        const winner = utils.findWinner(this.state.boxes)

        // Are all boxes checked?
        const isFilled = utils.areAllBoxesClicked(this.state.boxes)

        // Status message
        let status

        if (winner) {
            // If winner exists, create status message
            status = `The winner is: ${winner}!`

            // Push data about the game to storage
            this.storage.update([`${winner} won`])
        } else if (!winner && isFilled) {
            // If game is drawn, create status message
            status = 'Game drawn!'
            this.storage.update(['Game drawn'])
        } else {
            status = `It is ${(this.state.xIsNext ? 'x' : 'o')}'s turn.`
        }

        return (
            <div>
                {/* Link to scoreboard */}
                <Link to="/" className="boardLink">Go back to scoreboard</Link>

                {/* The game board */}
                <div className="boardWrapper">
                    <div className="board">
                        <h2 className="boardHeading">{status}</h2>

                        <div className="boardRow">
                            <Box value={this.state.boxes[0]} onClick={() => this.handleBoxClick(0)} />

                            <Box value={this.state.boxes[1]} onClick={() => this.handleBoxClick(1)} />

                            <Box value={this.state.boxes[2]} onClick={() => this.handleBoxClick(2)} />
                        </div>

                        <div className="boardRow">
                            <Box value={this.state.boxes[3]} onClick={() => this.handleBoxClick(3)} />

                            <Box value={this.state.boxes[4]} onClick={() => this.handleBoxClick(4)} />

                            <Box value={this.state.boxes[5]} onClick={() => this.handleBoxClick(5)} />
                        </div>

                        <div className="boardRow">
                            <Box value={this.state.boxes[6]} onClick={() => this.handleBoxClick(6)} />

                            <Box value={this.state.boxes[7]} onClick={() => this.handleBoxClick(7)} />

                            <Box value={this.state.boxes[8]} onClick={() => this.handleBoxClick(8)} />
                        </div>
                    </div>

                    <div className="boardHistory">
                        <h2 className="boardHeading">Moves history:</h2>

                        <ul className="boardHistoryList">
                            {this.state.history.length === 0 && <span>No moves to show.</span>}

                            {this.state.history.length !== 0 && this.state.history.map((move, index) => {
                                return <li key={index}>Move {index + 1}: <strong>{move}</strong></li>
                            })}
                        </ul>
                    </div>

                    {winner && <div className="boardFooter">
                        <button className="btn" onClick={this.handleBoardRestart}>Start new game</button>
                    </div>}
                </div>
            </div>
        )
    }
}
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
            xIsNext: true,
            endGame: false,
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
            this.setState({ endGame: true })
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
            xIsNext: true,
            endGame: false,
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
                <section className="hero is-black is-fullheight">
                    <div className="hero-head">
                        <header className="navbar">
                            <div className="container">
                                <div className="navbar-brand">
                                    <Link className="navbar-item" to="/">
                                        <h1 className="title is-4">Ting-Tang-Tong</h1>
                                    </Link>
                                    <span className="navbar-burger burger" data-target="navbarMenuHeroC">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </span>
                                </div>
                                <div id="navbarMenuHeroC" className="navbar-menu">
                                    <div className="navbar-end">
                                        <span className="navbar-item">
                                            <a href="https://github.com/roeintheglasses/ting-tang-tong" className="button is-dark is-inverted">
                                                <span className="icon">
                                                    <i className="fab fa-github"></i>
                                                </span>
                                                <span>Fork</span>
                                            </a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </header>
                    </div>

                    <div className="hero-body">
                        <div className="container has-text-centered">
                            <h1 className="title">
                                Ting-Tang-Tong
                        </h1>
                            <h2 className="subtitle is-5 mt-5">
                                Because tic-tac-toe sounds like a basic bitch.
                        </h2>
                            <h2 className="subtitle is-3 mt-5">{status}</h2>
                            {(this.state.endGame || winner) && <div className="boardFooter">
                                <button className="btn" onClick={this.handleBoardRestart}>Start new game</button>
                            </div>}
                            <div className="main">
                                <Link to="/" className="boardLink has-text-white">Go back to scoreboard</Link>

                                <div className="container">
                                    <br /><br />
                                    <div className="boardWrapper">
                                        <div className="board">
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
                                    </div>
                                    <br /><br /> <br />
                                    <div className="container"></div>
                                    <div className="boardHistory box">

                                        <h2 className="boardHeading">Moves history:</h2>

                                        <ul className="boardHistoryList">
                                            {this.state.history.length === 0 && <span>No moves to show.</span>}

                                            {this.state.history.length !== 0 && this.state.history.map((move, index) => {
                                                return <li key={index}>Move {index + 1}: <strong>{move}</strong></li>
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div >

        )
    }
}
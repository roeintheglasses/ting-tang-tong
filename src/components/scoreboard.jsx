import React from 'react'
import { Link } from 'react-router-dom'

import { Storage } from '../storage/storage'

export class Scoreboard extends React.Component {
    state = {
        scoreboard: []
    }
    async componentDidMount() {
        let storage = await new Storage().getData()

        this.setState({
            scoreboard: storage
        })
    }

    render() {
        return (
            <div className="game">
                <h1>Recent games:</h1>
                <ul>
                    {this.state.scoreboard.map((leader, key) => {
                        return <li key={key}>{leader}</li>
                    })}
                </ul>
                <Link to="/board">
                    <button className="btn">Start new game</button>
                </Link>
            </div>
        )
    }
}
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
            <div className="d">
                <section className="hero is-black is-fullheight">
                    <div className="hero-head">
                        <header className="navbar">
                            <div className="container">
                                <div className="navbar-brand">
                                    <a className="navbar-item">
                                        <h1 className="title is-4">Ting-Tang-Tong</h1>
                                    </a>
                                    <span className="navbar-burger burger" data-target="navbarMenuHeroC">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </span>
                                </div>
                                <div id="navbarMenuHeroC" className="navbar-menu">
                                    <div className="navbar-end">
                                        <span className="navbar-item">
                                            <a className="button is-dark is-inverted">
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
                            <Link to="/board">
                                <button className="btn">Start new game</button>
                            </Link>

                            <br /><br /> <br /><br />

                            <div className="game">
                                <h1 className="subtitle is-3" >Recent game stats:</h1>
                                <ul>
                                    {this.state.scoreboard.map((leader, key) => {
                                        return <li key={key}>{leader}</li>
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        )
    }
}
import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"

class StarWarsApp extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Footer />
      </div>
    )
  }
}

const Header = () => {
  return (
    <div>
      <h1>Star Wars Search</h1>
    </div>
  )
}

const Footer = () => {
  return (
    <div>
      <h5>Created by Bree Jackson</h5>
    </div>
  )
}

export default StarWarsApp

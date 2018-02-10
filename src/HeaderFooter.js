import React, { Component } from "react"
import "./App.css"

//This is just a one page app- no reason to have props being passed to it or anything
export const Header = () => {
  return (
    <div>
      <h1>Star Wars Search</h1>
    </div>
  )
}

export const Footer = () => {
  return (
    <div>
      <h5>Created by Bree Jackson</h5>
    </div>
  )
}

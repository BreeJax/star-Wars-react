import React, { Component } from "react"
import "./App.css"

//I'll be 100% honest- I had to ask for a lot of help with this Search.
export const Search = (props) => {
  return (
    <div className="SearchArea">
      <fieldset>
        <input type="text" placeholder="Search" value={props.searchTerm} onChange={props.handleSearch} />
        <button onClick={() => props.submitSearch()}>Search</button>
      </fieldset>
    </div>
  )
}
export const ChosingGenders = (props) => {
  return (
    <div className="Buttons">
      <button onClick={() => props.handleGenders("All")}>All People</button>
      <button onClick={() => props.handleGenders("Male")}>Male</button>
      <button onClick={() => props.handleGenders("Female")}>Female</button>
      <button onClick={() => props.handleGenders("Other")}>Other</button>
    </div>
  )
}

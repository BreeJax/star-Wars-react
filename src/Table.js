import React, { Component } from "react"
import "./App.css"
import { Search, ChosingGenders } from "./SearchParams"

//I decided to put everything in here because I felt like it should. I'm not really sure why beyond that.
export const StarWarsTable = (props) => (
  <div>
    {/* I confuse this and props enough that I just switch them when something doesn't work */}
    <ChosingGenders handleGenders={props.handleGenders} />
    <Search searchTerm={props.searchTerm} submitSearch={props.submitSearch} handleSearch={props.handleSearch} />
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Gender</th>
          <th>Homeworld Name</th>
        </tr>
      </thead>
      <tbody>
        {/* This was weird. I Kept trying to put everything together, until finally I just asked for help. */}
        {props.people.map((person) => (
          //it kept yelling at me for not having a key, and after making the key a name, I realized I made a horrible mistake and added ID to the call.
          <Person key={person.id} name={person.name} gender={person.gender} homeworld={person.homeworld.name} />
        ))}
      </tbody>
    </table>
  </div>
)
export const Person = (props) => (
  <tr>
    <td>{props.name}</td>
    <td>{props.gender}</td>
    <td>{props.homeworld}</td>
  </tr>
)

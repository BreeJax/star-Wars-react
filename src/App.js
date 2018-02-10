import React, { Component } from "react"
import "./App.css"
import { Header, Footer } from "./HeaderFooter"
import { StarWarsTable, Person, Search, ChosingGenders } from "./Table"
//out of everything I've downloaded, this seems to be the only thing that actually works
const { createApolloFetch } = require("apollo-fetch")

const uri = "http://localhost:63578" //this only works on safari, after disabling cross origin restrictions (which I didn't even know was a thing before now.)
// const uri = "http://localhost:63578/graphql" <-- not working
//const uri = "http://graphql.org/swapi-graphql/" <-- why won't this work?
//const uri = "http://graphql.org/swapi-graphql/?query=%7B%0A%20%20allPeople%20%7B%0A%20%20%20%20people%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20gender%0A%20%20%20%20%20%20homeworld%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A&operationName=null" //<-- why won't this work?

const apolloFetch = createApolloFetch({ uri })

class StarWarsApp extends Component {
  constructor(props) {
    super(props)
    //don't be me. Don't forget to bind things. You don't need that in your life.
    this.handleGenders = this.handleGenders.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.submitSearch = this.submitSearch.bind(this)
    this.clearSearchTerm = this.clearSearchTerm.bind(this)
    this.state = {
      people: [],
      filteredPeople: [],
      searchTerm: ""
    }
  }

  //So this works, for the most part, as long as you make sure to disable things in the browser. Why does it need the double query? Weirds me out.
  componentDidMount() {
    apolloFetch({
      query: `query {
    	allPeople{
    		people{
          id
    			name
    			gender
    			homeworld {
    				name
    			}
    		}
    	}
    }`
    }).then((res) => {
      console.log(res.data.allPeople.people)
      const people = res.data.allPeople.people
      this.setState(() => ({ people: people, filteredPeople: people }))
    })
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.filteredPeople.length !== this.state.filteredPeople.length) {
      const json = JSON.stringify(this.state.options)
      localStorage.setItem("options", json)
      console.log("Saving Data")
    }
  }
  //passing up button values up here, then using that to sort through/ filter people and get everyone. I hadn't ever passed up values like this before.
  handleGenders(gender) {
    if (gender === "Female") {
      this.setState(() => ({
        gender: "female",
        filteredPeople: this.state.people.filter((person) => {
          return person.gender === "female"
        })
      }))
    } else if (gender === "Male") {
      this.setState(() => ({
        filteredPeople: this.state.people.filter((person) => {
          return person.gender === "male"
        })
      }))
    } else if (gender === "Other") {
      this.setState(() => ({
        filteredPeople: this.state.people.filter((person) => {
          return !(person.gender == "female" || person.gender == "male")
        })
      }))
    } else {
      this.setState(() => ({
        filteredPeople: this.state.people
      }))
    }
    this.clearSearchTerm()
  }
  clearSearchTerm() {
    this.setState({
      searchTerm: ""
    })
  }
  handleSearch(e) {
    let term = e.target.value
    this.setState(() => ({
      searchTerm: term
    }))
  }
  submitSearch() {
    this.setState(() => ({
      filteredPeople: this.state.filteredPeople.filter((person) => {
        return (
          person.name.toLowerCase() === this.state.searchTerm.trim().toLowerCase() ||
          person.homeworld.name.toLowerCase() === this.state.searchTerm.trim().toLowerCase()
        )
      })
    }))
  }

  render() {
    return (
      <div className="StarWarsApp">
        <Header />
        <StarWarsTable
          searchTerm={this.state.searchTerm}
          people={this.state.filteredPeople}
          handleGenders={this.handleGenders}
          submitSearch={this.submitSearch}
          handleSearch={this.handleSearch}
        />
        <Footer />
      </div>
    )
  }
}

//I felt like having Search and ChosingGenders apart would be easier in the long run for debugging purposes. Not sure if I'm right yet.

export default StarWarsApp

import React, { Component } from "react"
import "./App.css"
//import { ApolloClient, gql, graphql, ApolloProvider } from "react-apollo"
//const client = new ApolloClient()
const { createApolloFetch } = require("apollo-fetch")

const uri = "http://localhost:62159/"
const apolloFetch = createApolloFetch({ uri })

class StarWarsApp extends Component {
  constructor(props) {
    super(props)
    this.handleGenders = this.handleGenders.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.submitSearch = this.submitSearch.bind(this)

    this.state = {
      people: [],
      filteredPeople: [],
      searchTerm: ""
    }
  }

  componentDidMount() {
    apolloFetch({
      query: `query {
    	allPeople{
    		people{
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
  handleGenders(gender) {
    if (gender === "Female") {
      this.setState(() => ({
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
    } else {
      this.setState(() => ({
        filteredPeople: this.state.people
      }))
    }
  }
  handleSearch(e) {
    let term = e.target.value.toLowerCase()
    this.setState(() => ({
      searchTerm: term
    }))
  }
  // handleSearch(e) {
  //   if (this.filteredPeople.person.gender === "Female") {
  //     let term = e.target.value.toLowerCase()
  //     this.setState(() => ({
  //       filteredPeople: this.state.people.filter((person) => {
  //         searchTerm: term
  //       })
  //     }))
  //
  //     //} else if {
  //
  //     //  } else {
  //   }
  // }
  submitSearch() {
    this.setState(() => ({
      filteredPeople: this.state.people.filter((person) => {
        return (
          person.name.toLowerCase() === this.state.searchTerm ||
          person.homeworld.name.toLowerCase() === this.state.searchTerm
        )
      })
    }))
  }
  render() {
    return (
      <div className="StarWarsApp">
        <Header />
        <StarWarsTable
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

const ChosingGenders = (props) => {
  return (
    <div className="Buttons">
      <button onClick={() => props.handleGenders("All")}>All People</button>
      <button onClick={() => props.handleGenders("Male")}>Male</button>
      <button onClick={() => props.handleGenders("Female")}>Female</button>
    </div>
  )
}
const Search = (props) => {
  return (
    <div className="SearchArea">
      <fieldset>
        <input type="text" placeholder="Search" onChange={props.handleSearch} />
        <button onClick={() => props.submitSearch()}>Search</button>
      </fieldset>
    </div>
  )
}

const StarWarsTable = (props) => (
  <div>
    <ChosingGenders handleGenders={props.handleGenders} />
    <Search submitSearch={props.submitSearch} handleSearch={props.handleSearch} />
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Gender</th>
          <th>Homeworld Name</th>
        </tr>
      </thead>
      <tbody>
        {props.people.map((person) => (
          <Person name={person.name} gender={person.gender} homeworld={person.homeworld.name} />
        ))}
      </tbody>
    </table>
  </div>
)
const Person = (props) => (
  <tr>
    <td>{props.name}</td>
    <td>{props.gender}</td>
    <td>{props.homeworld}</td>
  </tr>
)

export default StarWarsApp

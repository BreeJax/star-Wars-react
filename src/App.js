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
    this.state = {
      people: []
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
      this.setState(() => ({ people: people }))
    })
  }
  render() {
    return (
      <div className="StarWarsApp">
        <Header />
        <StarWarsTable people={this.state.people} />
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

const StarWarsTable = (props) => (
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
)
const Person = (props) => (
  <tr>
    <td>{props.name}</td>
    <td>{props.gender}</td>
    <td>{props.homeworld}</td>
  </tr>
)
// class StarWarsPeopleInfo extends React.Component {
//   constructor(props) {
//     super(props)
//   }
//   render() {
//     ;<div />
//   }
// }

export default StarWarsApp

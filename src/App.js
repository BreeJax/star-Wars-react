import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"
import { ApolloClient, gql, graphql, ApolloProvider } from "react-apollo"
const client = new ApolloClient()

const StarWarsTable = () => (
  <table>
    <tr>
      <th>Name</th>
      <th>Gender</th>
      <th>Homeward Name</th>
    </tr>
    <tr>
      <td>Jill</td>
      <td>Smith</td>
      <td>50</td>
    </tr>
    <tr>
      <td>Eve</td>
      <td>Jackson</td>
      <td>94</td>
    </tr>
  </table>
)

// export const typeDefs = `
// type {
//   "data": {
//     "person": {
//       "name": String
//       "gender": String
//       "homeworld": {
//         "name": String
//       }
//     }
//   }
// }
// type Query {
//    data: [person]    # "[]" means this is a list of channels
// }
// `
//
// const StarWarsCharacter = gql`
//   query StarWarsCharacter {
//     person(personID: 4) {
//       name
//       gender
//       homeworld {
//         name
//       }
//     }
//   }
// `
// const StarWarsCharacters = graphql(StarWarsCharacterQuery)(StarWarsCharacter)

class StarWarsApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    }
  }

  componentDidMount() {
    fetch("http://localhost:62159/")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items
          })
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <ul>
          {items.map((item) => (
            <li key={item.name}>
              {item.name} {item.price}
            </li>
          ))}
        </ul>
      )
    }
  }

  render() {
    return (
      <div className="StarWarsApp">
        <Header />
        <StarWarsTable />
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

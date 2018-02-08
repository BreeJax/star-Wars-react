export const typeDefs = `
type person {
   personID: ID! {
     name: String
     gender: String
     homeworld {
       name: String
     }
   }               # "!" denotes a required field


   name: String
}
# This type specifies the entry points into our API. In this case
# there is only one - "channels" - which returns a list of channels.
type Query {
   people: [person]    # "[]" means this is a list of channels
}
`

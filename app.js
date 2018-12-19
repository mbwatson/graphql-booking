const express = require('express')
const bodyParser = require('body-parser')
const graphQlHttp = require('express-graphql')
const { buildSchema } = require('graphql')

const app = express()
const PORT = 3000

app.use(bodyParser.json())

app.use('/graphql', graphQlHttp({
    schema: buildSchema(`
        type RootQuery {
            events: [String!]!
        }

        type RootMutation {
            createEvent(name: String): String
        }

        schema {
            query: RootQuery,
            mutation: RootMutation,
        }
    `),
    rootValue: {
        events: () => {
            return ['Cooking', 'Sailing', 'Coding']
        },
        createEvent: (args) => {
            const eventName = args.name
            return eventName
        }
    },
    graphiql: true,
}))

//
// In GraphiQL interface...
//
// localhost:3000/graphql
//
// query {
//   events
// }
//
// mutation {
//   createEvent(name: "Sports")
// }
//

app.listen(PORT)


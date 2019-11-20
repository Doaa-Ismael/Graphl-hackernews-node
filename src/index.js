const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }]

  const resolvers = {
    Query: {
        feed: (root, args, context, info) => {
            return context.prisma.links()
        }
    },
    Mutation: {
        post: (root, args, context) => {
            return context.prisma.createLink({
                url: args.url,
                description: args.description,
            })
      }
    },
    Link: {
        id: (parent) => parent.id,
        description: (parent) => `h3 ${parent.description}`
    }
  }



// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
    context: { prisma },
})
server.start(() => console.log(`Server is running on http://localhost:4000`))

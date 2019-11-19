const { GraphQLServer } = require('graphql-yoga')

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }]

  const resolvers = {
    Query: {
      feed: () => links
    },
    Mutation: {
        post: (parents, args) => {
          const id = links.length;
          const link = { id, url: args.url, description: args.description };
          links.push(link);
          return link;
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
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
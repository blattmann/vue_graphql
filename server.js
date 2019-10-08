const { ApolloServer, gql } = require('apollo-server');

const todos = [
  { task: 'Wash car', completed: false },
  { task: 'Clean room', completed: true },
  { task: 'Get up', completed: true },
  { task: 'Go to bed', completed: false }
];

const typeDefs = gql`
  type Todo {
    task: String
    completed: Boolean
  }

  type Query {
    getTodos: [Todo]
  }

  type Mutation {
    addTodo(task: String, completed: Boolean): Todo
  }
`;

const resolvers = {
  Query: {
    getTodos: () => todos
  },
  Mutation: {
    addTodo: (_, { task, completed }) => {
      const todo = { task, completed };
      todos.push(todo);
      return todo;
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`Server listening on ${url}`);
});


// GraphQL Playground queries:

/*
query {
  getTodos {
    task
    completed
  }
}

mutation {
  addTodo(task: "Eat lunch", completed: false) {
    task
    completed
  }
}
*/
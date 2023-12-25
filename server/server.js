import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { users, projects, logs, tasks } from "./fakedb.js";
import { generateToken, generateUniqueId } from "./utils.js";

//Graphql schema
const typeDefs = gql`
  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String
  }

  type Project {
    id: ID!
    projectName: String
    description: String
    users: [User]
  }

  type Task {
    id: ID!
    taskName: String
    logs: [ID]
    user: ID
    project:ID
  }


  type Log {
    id: ID!
    date: String
    startTime: String
    endTime: String
    duration: Int
    comment: String
    task: ID
    status: String
    user: ID
  }

  type Query {
    users: [User]
    projects: [Project]
    tasks: [Task]
    logs: [Log]
  }

  type AuthPayload {
    token: String!
    users: User!
  }

  type LogPayload {
    taskName: String
    logs: [Log]
  }

  input LogInput {
    date: String
    startTime: String
    endTime: String
    comment: String
    duration:Int
    status: String
    task: ID
  }

 type Mutation {
  loginUser(email: String!, password: String!): AuthPayload
  getTaskByProjectId(id:ID!): [Task]
  getLogByTaskId(id:ID!): LogPayload
  createLog(logInput: LogInput): Log
  updateLog(id: ID!, LogInput: LogInput!): Log 
}
`;

// Graphql resolver

const resolvers = {
  Query: {
    users: () => users,
    projects: () => projects,
    tasks: () => tasks,
  },

  Mutation: {
    loginUser: (_, { email, password }) => {
      const user = users.find((u) => u.email === email && u.password === password);
      const token = generateToken(user.id);

      return { token, users: { ...user } };
    },

    getTaskByProjectId: (_, { id }) => {
      const task = tasks.filter((ele) => ele.project === id);
      return task;
    },

    getLogByTaskId: (_, { id }) => {
      const task = tasks.find(ele => ele.id === id);
      const taskName = task ? task.taskName : null;

      const log = logs.filter((ele) => ele.task === id);

      return { taskName, logs: [...log] }
    },

    createLog: (_, { logInput }) => {
      const newLog = {
        id: generateUniqueId(),
        ...logInput,
      };

      logs.push(newLog);

      return newLog;
    },

    updateLog: (_, { id, LogInput }) => {
      const logIndex = logs.findIndex((log) => log.id === id);
      if (logIndex !== -1) {
        // Update the log with the provided LogInput
        logs[logIndex] = {
          ...logs[logIndex],
          ...LogInput,
        };
        return logs[logIndex]
      } else {
        throw new Error(`Log with ID ${id} not found`);
      }
    },

  },

  Project: {
    users: (ur) => users.filter((ele) => ur.users.includes(ele.id)),
  },
};


const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`GraphQL Server is running at http://localhost:${PORT}/graphql`);
});


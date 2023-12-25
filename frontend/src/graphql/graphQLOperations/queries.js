import { gql } from "@apollo/client";

export const GET_ALL_PROJECTS = gql`
  query getAllProjects {
    projects {
      id
      projectName
      description
      users {id}
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      users { 
      id
      firstName
      lastName
      email
      }
    }
  }
`;

export const GET_TASKS = gql`
  mutation GetTaskByUserId($id: ID!) {
    getTaskByProjectId(id: $id) {
        id
        taskName
    }
  }
`;

export const GET_LOGS = gql`
  mutation GetLogByTaskId($id: ID!) {
    getLogByTaskId(id: $id) {
      taskName
      logs { 
        id
        date
        startTime
        endTime
        comment
        duration
        status
      }
    }
  }
`;

export const CREATE_LOG = gql`
mutation CreateLog($logInput: LogInput!) {
  createLog(logInput: $logInput) {
    date
    startTime
    endTime
    comment
    status
    duration
    task
  }
}
`;

export const UPDATE_LOG = gql`
mutation UpdateLog($id: ID!, $LogInput: LogInput!) {
  updateLog(id: $id, LogInput: $LogInput) {    
      date
      startTime
      endTime
      comment
      duration
      status
      task
  }
}
`



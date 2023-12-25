export const users = [
  {
    id: "45633",
    firstName: "San",
    lastName: "Johnson",
    email: "san@gmail.com",
    password: "123123",
  },
];

export const tasks = [
  {
    id: "1",
    taskName: "Task-1",
    logs: ["1", "2"],
    user: "45633",
    project: "1",
  },
  {
    id: "2",
    taskName: "Task-2",
    logs: ["3"],
    user: "45633",
    project: "2",
  },
  {
    id: "3",
    taskName: "Task-3",
    logs: ["3"],
    user: "45633",
    project: "2",
  },
];

export const projects = [
  {
    id: "1",
    projectName: "Time Tracking Application",
    description: "To track time-log of each task",
    tasks: ["1"],
    users: ["45633"],
  },
  {
    id: "2",
    projectName: "WowPlex",
    description: "An OTT platform",
    tasks: ["2"],
    users: ["45633"],
  },
];

export const logs = [
  {
    id: "1",
    date: "2023-02-27T18:30:00.000+00:00",
    startTime: "06:30:00",
    endTime: "08:30:00",
    duration: 2,
    comment: "Test",
    task: "1",
    status: "approved",
    user: "45633"

  },
  {
    id: "2",
    date: "2023-02-27T18:30:00.000+00:00",
    startTime: "06:30:00",
    endTime: "09:30:00",
    duration: 3,
    comment: "Test-2",
    task: "1",
    status: "decline",
    user: "45633"

  },
  {
    id: "3",
    date: "2023-02-27T18:30:00.000+00:00",
    startTime: "06:30:00",
    endTime: "10:30:00",
    duration: 4,
    comment: "Test-3",
    task: "2",
    status: "approved",
    user: "45632"

  }
]
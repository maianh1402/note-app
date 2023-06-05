import { Job } from "@/pages/api/Job";

export enum STATUS_TASK {
  TODO = "TODO",
  PROCESS = "PROCESS",
  DONE = "DONE",
}

export const initialJobs: Job[] = [
  {
    id: 1,
    title: "Learn TS",
    status: STATUS_TASK.TODO,
    time: new Date(),
  },
  {
    id: 2,
    title: "Learn NEXTJS",
    status: STATUS_TASK.PROCESS,
    time: new Date(),
  },
  { id: 3, title: "Code TodoApp", status: STATUS_TASK.TODO, time: new Date() },
  { id: 4, title: "FigBug", status: STATUS_TASK.DONE, time: new Date() },
  { id: 5, title: "Code", status: STATUS_TASK.TODO, time: new Date() },
  { id: 6, title: "Code 2", status: STATUS_TASK.TODO, time: new Date() },
];

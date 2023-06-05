import { STATUS_TASK } from "@/constains";

export interface Job {
  id: number;
  title: string;
  status: STATUS_TASK | undefined;
  time: Date;
}
export const OPTION = [
  { label: "Todo", value: STATUS_TASK.TODO },
  { label: "Process", value: STATUS_TASK.PROCESS },
  { label: "Done", value: STATUS_TASK.DONE },
];

export const listJob: Job[] = [
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
export let defaultDate = new Date();
defaultDate.setDate(defaultDate.getDate() + 3);

export async function getServerSideProps() {
  const data = [
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
    {
      id: 3,
      title: "Code TodoApp",
      status: STATUS_TASK.TODO,
      time: new Date(),
    },
    { id: 4, title: "FigBug", status: STATUS_TASK.DONE, time: new Date() },
    { id: 5, title: "Code", status: STATUS_TASK.TODO, time: new Date() },
    { id: 6, title: "Code 2", status: STATUS_TASK.TODO, time: new Date() },
  ];

  return {
    props: {
      data,
    },
  };
}

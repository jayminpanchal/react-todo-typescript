import { IStatuses } from "../types";

type IStatusOptions = {
  [key: string]: IStatuses;
};

export const StatusOptions: IStatusOptions = {
  todo: {
    label: "ToDo",
    value: "todo",
    allowedOptions: [{ label: "InProgress", value: "inprogress" }],
  },
  blocked: {
    label: "Blocked",
    value: "blocked",
    allowedOptions: [
      {
        label: "ToDo",
        value: "todo",
      },
    ],
  },
  inprogress: {
    label: "InProgress",
    value: "inprogress",
    allowedOptions: [
      {
        label: "Blocked",
        value: "blocked",
      },
      { label: "InQA", value: "inqa" },
    ],
  },
  inqa: {
    label: "InQA",
    value: "inqa",
    allowedOptions: [{ label: "Done", value: "done" }],
  },
  done: {
    label: "Done",
    value: "done",
    allowedOptions: [{ label: "Deployed", value: "deployed" }],
  },
  deployed: { label: "Deployed", value: "deployed", allowedOptions: [] },
};

export const InitialFormValues = {
  title: "",
  description: "",
  status: "todo",
};

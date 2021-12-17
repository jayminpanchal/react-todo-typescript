import { Dispatch } from "react";

export type IHistory = {
  message: string;
  timestamp: number;
};

export type ITodo = {
  id: number;
  title: string;
  description: string;
  status: string;
  history: IHistory[];
};

export type ITodosState = {
  todos: ITodo[];
  dispatch?: Dispatch<Action>;
  selectedTodo: ITodo | null;
  setSelectedTodo: (todoItem: ITodo | null) => void;
};

export type IStatusOption = {
  label: string;
  value: string;
};

export type IStatuses = IStatusOption & {
  allowedOptions: IStatusOption[];
};

export type TodoFormState = {
  title: string;
  description: string;
  status: string;
  id?: number;
};

export type Action =
  | {
      type: "ADD";
      title: string;
      description: string;
      status: string;
    }
  | {
      type: "UPDATE";
      id: number;
      title: string;
      description: string;
      status: string;
    }
  | {
      type: "SELECTED_TODO";
      id: number;
      title: string;
      description: string;
      status: string;
      history: IHistory[];
    };

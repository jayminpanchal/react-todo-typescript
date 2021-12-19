import React, { createContext, useReducer, useContext, useState } from "react";
import { Action, ITodo, ITodosState } from "../types";

const TodosStateContext = createContext<ITodosState>({} as ITodosState);

function todosReducer(state: ITodo[], action: Action): ITodo[] {
  switch (action.type) {
    case "ADD":
      return state.concat({
        id: new Date().getTime(),
        title: action.title,
        description: action.description,
        status: action.status,
        history: [],
      });
    case "UPDATE":
      const todoIndex = state.findIndex(
        (todoItem) => todoItem.id === action.id
      );
      if (todoIndex < 0) return [...state];
      const todo = state[todoIndex];

      const history = todo.history;

      if (action.title !== todo.title)
        history.push({
          message: `Changed Title from ${todo.title} to ${action.title}`,
          timestamp: new Date().getTime(),
        });

      if (action.description !== todo.description)
        history.push({
          message: `Changed description from ${todo.description} to ${action.description}`,
          timestamp: new Date().getTime(),
        });

      if (action.status !== todo.status)
        history.push({
          message: `Changed ${todo.status} -> ${action.status}`,
          timestamp: new Date().getTime(),
        });

      const upadtedTodo = {
        id: action.id,
        title: action.title,
        description: action.description,
        status: action.status,
        history,
      };
      return state.map((todoItem) =>
        todoItem.id === action.id ? upadtedTodo : todoItem
      );
    default:
      throw new Error("Unhandled action");
  }
}

export function TodosContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [todos, dispatch] = useReducer(todosReducer, []);
  const [selectedTodo, setSelectedTodo] = useState<ITodo | null>(null);

  return (
    <TodosStateContext.Provider
      value={{ todos, dispatch, selectedTodo, setSelectedTodo }}
    >
      {children}
    </TodosStateContext.Provider>
  );
}

export function useTodosState() {
  const state = useContext(TodosStateContext);
  if (!state) throw new Error("TodosProvider not found");
  return state.todos;
}

export function useTodosDispatch() {
  const state = useContext(TodosStateContext);
  if (!state) throw new Error("TodosProvider not found");
  return state.dispatch;
}

export function useTodoSelected() {
  const state = useContext(TodosStateContext);
  if (!state) throw new Error("TodosProvider not found");
  return state.selectedTodo;
}

export function useTodoSetSelected() {
  const state = useContext(TodosStateContext);
  if (!state) throw new Error("TodosProvider not found");
  return state.setSelectedTodo;
}

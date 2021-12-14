import Container from "@mui/material/Container";

import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoTitle from "./components/TodoTitle";
import { TodosContextProvider } from "./context";

function App() {
  return (
    <TodosContextProvider>
      <Container maxWidth="lg">
        <TodoTitle />
        <TodoForm />
        <TodoList />
      </Container>
    </TodosContextProvider>
  );
}

export default App;

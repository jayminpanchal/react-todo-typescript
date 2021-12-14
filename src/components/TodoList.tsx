import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";

import TodoItem from "./TodoItem";
import { useTodoSelected, useTodosState } from "../context";

const useStyles = makeStyles({
  root: {
    marginTop: "20px",
  },
  titleWrapper: {
    padding: "8px 16px 24px",
    background: "#1875B9",
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
  },
  title: {
    color: "white",
  },
  todosWrapper: {
    display: "flex",
    background: "#A3CEED",
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
    padding: "16px 20px",
    minHeight: "320px",
    marginTop: "-16px",
    flexDirection: "column",
  },
  emptyWrapper: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
});

const TodoList = () => {
  const todos = useTodosState();
  const classes = useStyles();
  const selectedTodo = useTodoSelected();

  if (selectedTodo) return null;

  return (
    <div className={classes.root}>
      <div className={classes.titleWrapper}>
        <Typography
          variant="h5"
          component="p"
          gutterBottom
          className={classes.title}
        >
          Tasks
        </Typography>
      </div>
      <div className={classes.todosWrapper}>
        {todos.length === 0 && (
          <div className={classes.emptyWrapper}>
            <Typography variant="h6" component="p" gutterBottom align="center">
              You have nothing to do. <br />
              Go get some sleep.
            </Typography>
          </div>
        )}
        <Grid container spacing={2}>
          {todos.map((todo) => (
            <Grid item xs={6} sm={6} md={4} lg={3} key={`TODO_${todo.id}`}>
              <TodoItem item={todo} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default TodoList;

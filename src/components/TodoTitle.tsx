import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";

import { useTodoSelected } from "../context";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#1875B9",
    padding: "12px 20px",
    color: "white",
    marginBottom: "24px",
  },
});

const TodoTitle = () => {
  const selectedTodo = useTodoSelected();
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      Task Management &gt; {selectedTodo ? "Edit" : "Home"}
    </Box>
  );
};

export default TodoTitle;

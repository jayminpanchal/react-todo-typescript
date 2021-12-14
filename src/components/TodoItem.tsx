import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Edit from "@mui/icons-material/Edit";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import { IStatusOption, ITodo } from "../types";
import { StatusOptions } from "../utils";

interface ITodoItemProps {
  item: ITodo;
}

const useStyles = makeStyles({
  root: {
    marginTop: "20px",
  },
  statusWrapper: {
    background: "#1875B9",
    borderRadius: "4px",
    padding: "8px 12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  status: {
    color: "white",
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const TodoItem: React.FC<ITodoItemProps> = ({ item }) => {
  const status = StatusOptions[item.status] as IStatusOption;
  const classes = useStyles();

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="p" gutterBottom>
          {item.title}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          {item.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container alignItems="center">
          <Grid item xs={6}>
            <div className={classes.statusWrapper}>
              <Typography
                variant="body1"
                component="p"
                className={classes.status}
              >
                {status.label}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.iconContainer}>
              <IconButton size="small" color="primary">
                <Edit />
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default TodoItem;

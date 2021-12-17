import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Add from "@mui/icons-material/Add";
import Edit from "@mui/icons-material/Edit";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { SelectChangeEvent } from "@mui/material";

import {
  useTodosDispatch,
  useTodoSelected,
  useTodoSetSelected,
} from "../context";
import { InitialFormValues, StatusOptions } from "../utils";
import { TodoFormState } from "../types";

const TodoForm = () => {
  const [formData, setFormData] = useState<TodoFormState>(InitialFormValues);
  const dispatch = useTodosDispatch();
  const selectedTodo = useTodoSelected();
  const setSelectedTodo = useTodoSetSelected();

  useEffect(() => {
    if (selectedTodo) {
      setFormData(selectedTodo);
    }
  }, [selectedTodo]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.id) {
      dispatch &&
        dispatch({
          type: "UPDATE",
          id: formData.id,
          title: formData.title,
          description: formData.description,
          status: formData.status,
        });
      setSelectedTodo(null);
    } else {
      dispatch && dispatch({ type: "ADD", ...formData });
    }
    setFormData(InitialFormValues);
  };

  const onCancel = () => {
    setSelectedTodo(null);
    setFormData(InitialFormValues);
  };

  const onSelectChange = (e: SelectChangeEvent<string>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const statusOptions = selectedTodo
    ? [
        {
          label: StatusOptions[selectedTodo.status].label,
          value: StatusOptions[selectedTodo.status].value,
        },
      ].concat(StatusOptions[selectedTodo.status].allowedOptions)
    : [];
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
      sx={{ flex: 1 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="title"
            value={formData.title}
            onChange={onChange}
            variant="filled"
            label="Title"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="description"
            value={formData.description}
            onChange={onChange}
            multiline
            rows={4}
            variant="filled"
            label="Description"
            fullWidth
          />
        </Grid>
        {formData.id && (
          <Grid item xs={12}>
            <FormControl variant="filled" fullWidth>
              <InputLabel id="select-filled-label">Status</InputLabel>
              <Select
                labelId="select-filled-label"
                id="select-filled"
                value={formData.status}
                onChange={onSelectChange}
                name="status"
              >
                {statusOptions.map((statusOption) => (
                  <MenuItem value={statusOption.value}>
                    {statusOption.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}
        <Grid item xs={formData.id ? 6 : 12}>
          <Button
            type="submit"
            variant="contained"
            startIcon={formData.id ? <Edit /> : <Add />}
            fullWidth
          >
            {formData.id ? "Edit" : "Add"}
          </Button>
        </Grid>
        {formData.id && (
          <Grid item xs={6}>
            <Button
              type="button"
              variant="outlined"
              fullWidth
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default TodoForm;

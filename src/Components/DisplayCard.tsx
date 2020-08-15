import React, { FC, useState, useContext } from "react";
import { ITodo, todos, TodoActions } from "../Context/TodoProvider";
import {
    Card,
    CardContent,
    Typography,
    CardActions,
    Grid,
    Chip,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import TodoModal from "./TodoModal";
import moment from "moment";

interface ICardProps {
    todo: ITodo;
}

const DisplayCard: FC<ICardProps> = (props) => {
    const { title, description, schedule, members, tags } = props.todo;

    const [todoForm, setTodoForm] = useState(false);
    const { dispatch } = useContext(todos);
    const deleteTodo = () => {
        dispatch({ type: TodoActions.DEL_TODO, payload: props.todo });
    };

    return (
        <>
            <Card>
                <CardContent>
                    <Grid container>
                        <Grid item xs={9}>
                            <Typography variant="h6">{title}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <CardActions>
                                <EditIcon onClick={() => setTodoForm(true)} />
                                <DeleteIcon onClick={deleteTodo} />
                            </CardActions>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                {description}
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="body2">{`Scheduled: ${moment(
                                schedule
                            ).format("DD-MM-YYYY, hh:mm a")}`}</Typography>
                        </Grid>
                        {members.length ? (
                            <Grid item xs={12}>
                                <Typography variant="body2">{`Members: ${members
                                    .map((m) => m.name)
                                    .join(", ")}`}</Typography>
                            </Grid>
                        ) : null}
                        <Grid item xs={12}>
                            {tags.map((t) => (
                                <Chip label={t.label} style={{ margin: 1 }} />
                            ))}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            {todoForm ? (
                <TodoModal
                    open={todoForm}
                    handleClose={() => setTodoForm(false)}
                    data={props.todo}
                    mode="edit"
                    title="Edit Todo"
                />
            ) : null}
        </>
    );
};

export default DisplayCard;

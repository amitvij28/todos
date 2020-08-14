import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import Lane from "./Lane";
import { todos, TodoStatus } from "../Context/TodoProvider";

const DisplayPanel = () => {
    const { state } = useContext(todos);

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Lane
                        todoList={state.todos.filter(
                            (t) => t.status === TodoStatus.tbd
                        )}
                        heading="To Be Done"
                    />
                </Grid>
                <Grid item xs={4}>
                    <Lane
                        todoList={state.todos.filter(
                            (t) => t.status === TodoStatus.doing
                        )}
                        heading="Doing"
                    />
                </Grid>
                <Grid item xs={4}>
                    <Lane
                        todoList={state.todos.filter(
                            (t) => t.status === TodoStatus.done
                        )}
                        heading="Done"
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default DisplayPanel;

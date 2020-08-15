import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import Lane from "./Lane";
import { todos, TodoStatus } from "../Context/TodoProvider";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

const DisplayPanel = () => {
    const { state } = useContext(todos);

    return (
        <DndProvider backend={HTML5Backend}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Lane
                        todoList={state.todos.filter(
                            (t) => t.status === TodoStatus.tbd
                        )}
                        heading="To Be Done"
                        type={TodoStatus.tbd}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Lane
                        todoList={state.todos.filter(
                            (t) => t.status === TodoStatus.doing
                        )}
                        heading="Doing"
                        type={TodoStatus.doing}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Lane
                        todoList={state.todos.filter(
                            (t) => t.status === TodoStatus.done
                        )}
                        heading="Done"
                        type={TodoStatus.done}
                    />
                </Grid>
            </Grid>
        </DndProvider>
    );
};

export default DisplayPanel;

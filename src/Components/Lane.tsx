import React, { FC, useContext } from "react";
import { ITodo, todos, TodoActions } from "../Context/TodoProvider";
import { Typography, Grid } from "@material-ui/core";
import { useDrop, DragObjectWithType } from "react-dnd";
import DisplayCard from "./DisplayCard";

interface ILaneProps {
    todoList: ITodo[];
    heading: string;
    type: string;
}

const Lane: FC<ILaneProps> = (props) => {
    const { dispatch } = useContext(todos);

    const [{ isOn }, dropRef] = useDrop({
        accept: "TODO",
        collect: (monitor) => ({
            isOn: monitor.isOver(),
        }),
        drop: (item: { todo: ITodo } & DragObjectWithType) => {
            item.todo.status = props.type;
            dispatch({ type: TodoActions.EDIT_TODO, payload: item.todo });
        },
    });

    return (
        <div ref={dropRef}>
            <Typography variant="h5" style={{ textAlign: "center" }}>
                {props.heading}
            </Typography>
            <br />
            {props.todoList.map((t) => (
                <>
                    <Grid container>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}>
                            <DisplayCard todo={t} />
                        </Grid>
                        <Grid item xs={1}></Grid>
                    </Grid>
                    <br />
                </>
            ))}
        </div>
    );
};

export default Lane;

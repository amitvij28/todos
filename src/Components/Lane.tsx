import React, { FC, useContext } from "react";
import { ITodo, todos } from "../Context/TodoProvider";
import { Typography, Grid } from "@material-ui/core";
import { useDrop, DragObjectWithType } from "react-dnd";
import DisplayCard from "./DisplayCard";

export interface ILaneProps {
    todoList: ITodo[];
    heading: string;
    type: string;
}

const Lane: FC<ILaneProps> = (props) => {
    const { editTodos } = useContext(todos);

    const [{ isOn }, dropRef] = useDrop({
        accept: "TODO",
        collect: (monitor) => ({
            isOn: monitor.isOver(),
        }),
        drop: (item: { todo: ITodo } & DragObjectWithType) => {
            if (item.todo.status === props.type) return;
            item.todo.status = props.type;
            editTodos([item.todo]);
        },
    });

    return (
        <div
            ref={dropRef}
            style={{ height: "100%", background: isOn ? "#d8d3cd" : "" }}
        >
            <Typography variant="h4" style={{ textAlign: "center" }}>
                {props.heading}
            </Typography>
            <br />
            {props.todoList.map((t) => (
                <div key={t.id}>
                    <Grid container>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}>
                            <DisplayCard todo={t} />
                        </Grid>
                        <Grid item xs={1}></Grid>
                    </Grid>
                    <br />
                </div>
            ))}
        </div>
    );
};

export default Lane;

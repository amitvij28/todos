import React, { FC } from "react";
import { ITodo } from "../Context/TodoProvider";
import { Typography, Grid } from "@material-ui/core";

interface ILaneProps {
    todoList: ITodo[];
    heading: string;
}

const Lane: FC<ILaneProps> = (props) => {
    return (
        <>
            <Typography variant="h5" style={{ textAlign: "center" }}>
                {props.heading}
            </Typography>
            <br />
            {props.todoList.map((t) => (
                <>
                    <Grid container>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}>
                            {t.title}
                        </Grid>
                        <Grid item xs={1}></Grid>
                    </Grid>
                    <br />
                </>
            ))}
        </>
    );
};

export default Lane;

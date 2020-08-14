import React from "react";
import Lane from "./Lane";
import { Grid } from "@material-ui/core";

const Home = () => {
    return (
        <Grid container>
            <Grid item xs={12}>
                Todo
            </Grid>
            <Grid item xs={12}>
                <br />
                <hr />
                <br />
            </Grid>
            <Grid item xs={4}>
                <Lane />
            </Grid>
            <Grid item xs={4}>
                <Lane />
            </Grid>
            <Grid item xs={4}>
                <Lane />
            </Grid>
        </Grid>
    );
};

export default Home;

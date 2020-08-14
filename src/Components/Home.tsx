import React from "react";
import { Grid, Divider } from "@material-ui/core";
import OptionPanel from "./OptionPanel";
import DisplayPanel from "./DisplayPanel";

const Home = () => {
    return (
        <>
            <div>
                {" "}
                <Grid container>
                    <Grid item xs={12}>
                        <OptionPanel />
                    </Grid>
                    <Grid item xs={12}>
                        <br />
                        <Divider />
                        <br />
                    </Grid>
                </Grid>
                <DisplayPanel />
            </div>
        </>
    );
};

export default Home;

import React from "react";
import { makeStyles } from "@material-ui/core";
import OptionPanel from "./OptionPanel";
import DisplayPanel from "./DisplayPanel";

const useStyles = makeStyles((theme) => ({
    root: {
        background: "#f7f2e7",
        height: "100vh",
    },
}));

const Home = () => {
    const classes = useStyles();
    return (
        <>
            <div className={classes.root}>
                <OptionPanel />
                <br />
                <div>
                    <DisplayPanel />
                </div>
            </div>
        </>
    );
};

export default Home;

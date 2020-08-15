import React, { useState } from "react";
import {
    Grid,
    Typography,
    Button,
    AppBar,
    Toolbar,
    makeStyles,
} from "@material-ui/core";
import TodoModal from "./TodoModal";
import MembersModal from "./MembersModal";
import TagsModal from "./TagsModal";

const useStyles = makeStyles((theme) => ({
    options: {
        flexGrow: 1,
        width: "100%",
    },
}));

const OptionPanel = () => {
    const classes = useStyles();

    const [todoForm, setTodoForm] = useState(false);
    const [memberForm, setMemberForm] = useState(false);
    const [tagForm, setTagForm] = useState(false);

    return (
        <AppBar position="static" className={classes.options}>
            <Toolbar>
                <Grid container alignItems="center">
                    <Grid item xs={12} md={9}>
                        <Typography variant="h3">TODO</Typography>
                    </Grid>
                    <Grid item xs={12} md={1}>
                        <Button
                            color="inherit"
                            onClick={() => setTodoForm(true)}
                        >
                            Add Todo
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={1}>
                        <Button
                            color="inherit"
                            onClick={() => setMemberForm(true)}
                        >
                            Members
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={1}>
                        <Button
                            color="inherit"
                            onClick={() => setTagForm(true)}
                        >
                            Tags
                        </Button>
                    </Grid>
                </Grid>
                {todoForm ? (
                    <TodoModal
                        open={todoForm}
                        handleClose={() => setTodoForm(false)}
                        data={null}
                        title="Add new Todo"
                        mode="add"
                    />
                ) : null}

                {memberForm ? (
                    <MembersModal
                        open={memberForm}
                        handleClose={() => setMemberForm(false)}
                    />
                ) : null}
                {tagForm ? (
                    <TagsModal
                        open={tagForm}
                        handleClose={() => setTagForm(false)}
                    />
                ) : null}
            </Toolbar>
        </AppBar>
    );
};

export default OptionPanel;

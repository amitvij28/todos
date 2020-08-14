import React, { useState } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import TodoModal from "./TodoModal";
import MembersModal from "./MembersModal";
import TagsModal from "./TagsModal";

const OptionPanel = () => {
    const [todoForm, setTodoForm] = useState(false);
    const [memberForm, setMemberForm] = useState(false);
    const [tagForm, setTagForm] = useState(false);
    return (
        <>
            <Grid container>
                <Grid item xs={12} md={6}>
                    <Typography variant="h3">TODO</Typography>
                </Grid>
                <Grid item xs={12} md={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setTodoForm(true)}
                    >
                        Add Todo
                    </Button>
                </Grid>
                <Grid item xs={12} md={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setMemberForm(true)}
                    >
                        Members
                    </Button>
                </Grid>
                <Grid item xs={12} md={2}>
                    <Button
                        variant="contained"
                        color="primary"
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
        </>
    );
};

export default OptionPanel;

import React, { FC, useState, useContext } from "react";
import {
    Dialog,
    TableContainer,
    Table,
    TableHead,
    TableCell,
    TableRow,
    DialogContent,
    TableBody,
    Grid,
    Button,
    TextField,
    Typography,
    DialogTitle,
    Paper,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import { tagState, ITag, tagActions } from "../Context/TagsProvider";

interface ITMProps {
    open: boolean;
    handleClose: () => void;
}

const TagsModal: FC<ITMProps> = (props) => {
    const { state, dispatch } = useContext(tagState);
    const [tag, setTag] = useState("");

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const submitTag = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (tag === "") {
            setErrors({ tag: "Tag needed" });
            return;
        }

        const newTag: ITag = {
            label: tag,
            id: state.idCount++,
        };
        setTag("");
        dispatch({ type: tagActions.ADD_TAG, payload: newTag });
    };

    const deleteTag = (t: ITag) => {
        dispatch({ type: tagActions.DEL_TAG, payload: t });
    };

    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>
                <Typography variant="h6">Tags</Typography>
            </DialogTitle>
            <DialogContent>
                <form onSubmit={submitTag}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={9}>
                            <TextField
                                margin="dense"
                                label="Tag"
                                fullWidth
                                value={tag}
                                error={errors["tag"] ? true : false}
                                helperText={errors["tag"] ? errors["tag"] : ""}
                                onChange={(e) => setTag(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <hr />
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableCell>Tag</TableCell>
                            <TableCell>Options</TableCell>
                        </TableHead>
                        <TableBody>
                            {state.tags.map((t) => (
                                <TableRow>
                                    <TableCell>{t.label}</TableCell>
                                    <TableCell>
                                        <DeleteIcon
                                            onClick={() => deleteTag(t)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
        </Dialog>
    );
};

export default TagsModal;

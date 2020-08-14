import React, { FC, useContext, useState } from "react";
import {
    Dialog,
    DialogTitle,
    Typography,
    DialogContent,
    Grid,
    TextField,
    Button,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
} from "@material-ui/core";
import {
    memberState,
    IMember,
    MemberActions,
} from "../Context/MembersProvider";

import DeleteIcon from "@material-ui/icons/Delete";

interface IMMProps {
    open: boolean;
    handleClose: () => void;
}

const MembersModal: FC<IMMProps> = (props) => {
    const { state, dispatch } = useContext(memberState);
    const [name, setName] = useState("");

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const submitMember = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (name === "") {
            setErrors({ name: "Name needed" });
            return;
        }

        const newMember: IMember = {
            name,
            id: state.idCount++,
        };
        setName("");
        dispatch({ type: MemberActions.ADD_MEMBER, payload: newMember });
    };

    const deleteMember = (m: IMember) => {
        dispatch({ type: MemberActions.DEL_MEMBER, payload: m });
    };

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            style={{ minWidth: "70%" }}
        >
            <DialogTitle>
                <Typography variant="h6">Members</Typography>
            </DialogTitle>
            <DialogContent>
                <form onSubmit={submitMember}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={9}>
                            <TextField
                                margin="dense"
                                label="Name"
                                fullWidth
                                value={name}
                                error={errors["name"] ? true : false}
                                helperText={
                                    errors["name"] ? errors["name"] : ""
                                }
                                onChange={(e) => setName(e.target.value)}
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
                            <TableCell>Name</TableCell>
                            <TableCell>Id</TableCell>
                            <TableCell>Options</TableCell>
                        </TableHead>
                        <TableBody>
                            {state.members.map((m) => (
                                <TableRow>
                                    <TableCell>{m.name}</TableCell>
                                    <TableCell>{m.id}</TableCell>
                                    <TableCell>
                                        <DeleteIcon
                                            onClick={() => deleteMember(m)}
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

export default MembersModal;

import React, { FC, useState, useEffect, useContext } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    Select,
    MenuItem,
    InputLabel,
    Chip,
    makeStyles,
} from "@material-ui/core";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { ITodo, TodoStatus, todos, TodoActions } from "../Context/TodoProvider";
import { IMember, memberState } from "../Context/MembersProvider";
import { ITag, tagState } from "../Context/TagsProvider";

const useStyle = makeStyles((theme) => ({
    inputs: {
        margin: 10,
    },
}));

const TodoModal: FC<{
    open: boolean;
    handleClose: () => void;
    data: ITodo | null;
    title: string;
    mode: "edit" | "add";
}> = (props) => {
    const allMembers = useContext(memberState);
    const allTags = useContext(tagState);
    const { state: allTodos, dispatch } = useContext(todos);

    const { data, open, handleClose, mode } = props;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [schedule, setSchedule] = useState(new Date());
    const [status, setStatus] = useState(TodoStatus.tbd);
    const [tags, setTags] = useState<ITag[]>([]);
    const [members, setMembers] = useState<IMember[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const classes = useStyle();

    useEffect(() => {
        if (data) {
            setTitle(data.title);
            setDescription(data.description);
            setSchedule(data.schedule);
            setStatus(data.status);
            setTags(data.tags);
            setMembers(data.members);
            console.log("Edit mode");
        } else {
            console.log("Add mode");
        }
    }, [data]);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (title === "") {
            setErrors({ title: "Title required" });
            return;
        }

        const newTodo: ITodo = {
            title,
            description,
            schedule,
            status,
            tags,
            members,
            id: mode === "edit" && data ? data.id : allTodos.idCount++,
        };

        dispatch({
            type:
                props.mode === "add"
                    ? TodoActions.ADD_TODO
                    : TodoActions.EDIT_TODO,
            payload: newTodo,
        });
        handleClose();
    };

    const handleChangeMembers = (
        e: React.ChangeEvent<{
            name?: string | undefined;
            value: any;
        }>
    ) => {
        const { value } = e.target;
        const selMems = allMembers.state.members.filter((m) =>
            value.includes(m.id)
        );
        setMembers(selMems);
    };

    const handleChangeTags = (
        e: React.ChangeEvent<{
            name?: string | undefined;
            value: any;
        }>
    ) => {
        const { value } = e.target;
        const selTags = allTags.state.tags.filter((t) => value.includes(t.id));
        setTags(selTags);
    };

    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <Dialog
                open={open}
                onClose={handleClose}
                style={{ minWidth: "70%" }}
            >
                <DialogTitle>{props.title}</DialogTitle>
                <DialogContent dividers={true}>
                    <form onSubmit={onSubmit}>
                        <TextField
                            margin="dense"
                            label="Title"
                            fullWidth
                            error={errors["title"] ? true : false}
                            helperText={
                                errors["title"] ? errors["title"] : null
                            }
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={classes.inputs}
                        />
                        <TextField
                            multiline
                            label="Description"
                            fullWidth
                            className={classes.inputs}
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <DateTimePicker
                            variant="inline"
                            label="Schedule at"
                            value={schedule}
                            className={classes.inputs}
                            onChange={(d) =>
                                d ? setSchedule(d.toDate()) : null
                            }
                            fullWidth
                            disablePast
                        />
                        <InputLabel
                            id="status-label"
                            className={classes.inputs}
                        >
                            Status
                        </InputLabel>
                        <Select
                            labelId="status-label"
                            className={classes.inputs}
                            value={status}
                            fullWidth
                            onChange={(e) =>
                                setStatus(e.target.value as string)
                            }
                        >
                            <MenuItem value={TodoStatus.tbd}>
                                {TodoStatus.tbd}
                            </MenuItem>
                            <MenuItem value={TodoStatus.doing}>
                                {TodoStatus.doing}
                            </MenuItem>
                            <MenuItem value={TodoStatus.done}>
                                {TodoStatus.done}
                            </MenuItem>
                        </Select>
                        <InputLabel
                            id="members-label"
                            className={classes.inputs}
                        >
                            Members
                        </InputLabel>
                        <Select
                            className={classes.inputs}
                            multiple
                            labelId="members-label"
                            value={members.map((m) => m.id)}
                            renderValue={(mIds: any) => {
                                return members.map((m) => {
                                    if (mIds.includes(m.id)) {
                                        return (
                                            <Chip
                                                label={m.name}
                                                style={{ margin: 2 }}
                                            />
                                        );
                                    }
                                    return null;
                                });
                            }}
                            fullWidth
                            onChange={handleChangeMembers}
                        >
                            {allMembers.state.members.map((m) => (
                                <MenuItem value={m.id}>{m.name}</MenuItem>
                            ))}
                        </Select>

                        <InputLabel id="tags-label" className={classes.inputs}>
                            Tags
                        </InputLabel>
                        <Select
                            className={classes.inputs}
                            multiple
                            labelId="tags-label"
                            value={tags.map((t) => t.id)}
                            renderValue={(tIds: any) => {
                                return tags.map((t) => {
                                    if (tIds.includes(t.id)) {
                                        return (
                                            <Chip
                                                label={t.label}
                                                style={{ margin: 2 }}
                                            />
                                        );
                                    }
                                    return null;
                                });
                            }}
                            fullWidth
                            onChange={handleChangeTags}
                        >
                            {allTags.state.tags.map((t) => (
                                <MenuItem value={t.id}>{t.label}</MenuItem>
                            ))}
                        </Select>

                        <Button
                            className={classes.inputs}
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            {props.mode}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </MuiPickersUtilsProvider>
    );
};

export default TodoModal;

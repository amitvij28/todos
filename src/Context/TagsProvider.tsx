import React, { createContext, useReducer, FC, useContext } from "react";
import { todos, ITodo } from "./TodoProvider";

export interface ITag {
    label: string;
    id: number;
}

interface ITagState {
    tags: ITag[];
    idCount: number;
}

interface ITagContext {
    state: ITagState;
    addTag: (t: ITag) => void;
    deleteTag: (t: ITag) => void;
}

interface ITagAction {
    type: string;
    payload: ITag;
}

export const tagState = createContext<ITagContext>({
    state: { tags: [], idCount: 0 },
    addTag: (t) => null,
    deleteTag: (t) => null,
});

export const tagActions = {
    ADD_TAG: "ADD_TAG",
    DEL_TAG: "DEL_TAG",
};

const tagReducer = (state: ITagState, action: ITagAction) => {
    const { type, payload } = action;

    switch (type) {
        case tagActions.ADD_TAG:
            return {
                tags: [payload, ...state.tags],
                idCount: state.idCount + 1,
            };
        case tagActions.DEL_TAG:
            return {
                tags: state.tags.filter((t) => t.id !== payload.id),
                idCount: state.idCount,
            };

        default:
            return state;
    }
};

const TagsProvider: FC<{ children: React.ReactNode }> = (props) => {
    const [state, dispatch] = useReducer(tagReducer, { tags: [], idCount: 0 });

    const { state: s, editTodos } = useContext(todos);

    const addTag = (tag: ITag) => {
        dispatch({ type: tagActions.ADD_TAG, payload: tag });
    };

    const deleteTag = (tag: ITag) => {
        dispatch({ type: tagActions.DEL_TAG, payload: tag });
        const toEditTodos: ITodo[] = [];

        s.todos.forEach((todo) => {
            const tags = todo.tags.filter((t) => tag.id !== t.id);
            if (tags.length !== todo.tags.length)
                toEditTodos.push({ ...todo, tags });
        });
        editTodos(toEditTodos);
    };

    return (
        <tagState.Provider value={{ state, addTag, deleteTag }}>
            {props.children}
        </tagState.Provider>
    );
};

export default TagsProvider;

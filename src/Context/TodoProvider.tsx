import React, { createContext, FC, useReducer } from "react";
import { IMember } from "./MembersProvider";
import { ITag } from "./TagsProvider";

export const TodoStatus = {
    done: "Done",
    doing: "Doing",
    tbd: "To Be Done",
};

export const TodoActions = {
    ADD_TODO: "ADD_TODO",
    DEL_TODO: "DEL_TODO",
    EDIT_TODO: "EDIT_TODO",
};

export interface ITodo {
    title: string;
    description: string;
    schedule: Date;
    tags: ITag[];
    status: string;
    id: number;
    members: IMember[];
}

interface ITodoState {
    todos: ITodo[];
    idCount: number;
}

export const todos = createContext<{
    state: ITodoState;
    dispatch: React.Dispatch<any>;
}>({ state: { todos: [], idCount: 0 }, dispatch: () => null });

interface ITodoAction {
    type: string;
    payload: ITodo;
}

const todoReducer = (state: ITodoState, action: ITodoAction) => {
    switch (action.type) {
        case TodoActions.ADD_TODO:
            return {
                todos: [...state.todos, action.payload],
                idCount: state.idCount++,
            };
        case TodoActions.DEL_TODO:
            return {
                todos: state.todos.filter((t) => t.id !== action.payload.id),
                idCount: state.idCount,
            };
        case TodoActions.EDIT_TODO:
            return {
                todos: state.todos.map((m) => {
                    if (m.id === action.payload.id) return action.payload;
                    return m;
                }),
                idCount: state.idCount,
            };

        default:
            return state;
    }
};

const TodoProvider: FC<{ children: React.ReactNode }> = (props) => {
    const [state, dispatch] = useReducer(todoReducer, {
        todos: [],
        idCount: 0,
    });

    return (
        <todos.Provider value={{ state, dispatch }}>
            {props.children}
        </todos.Provider>
    );
};

export default TodoProvider;

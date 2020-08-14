import React, { createContext, FC, useReducer } from "react";

export enum TodoStatus {
    done = "Done",
    doing = "Doing",
    tbd = "To Be Done",
}

export enum TodoActions {
    ADD_TODO = "ADD_TODO",
    DEL_TODO = "DEL_TODO",
    EDIT_TODO = "EDIT_TODO",
}

export interface ITodo {
    title: string;
    description: string;
    schedule: Date;
    tags: string[];
    status: TodoStatus;
    id: number;
    members: string[];
}

export const todos = createContext<{
    state: ITodo[];
    dispatch: React.Dispatch<any>;
}>({ state: [], dispatch: () => null });

interface ITodoAction {
    type: string;
    payload: {};
}

const todoReducer = (state: ITodo[], action: ITodoAction) => {
    switch (action.type) {
        default:
            return state;
    }
};

const TodoProvider: FC<{ children: React.ReactNode }> = (props) => {
    const [state, dispatch] = useReducer(todoReducer, []);

    return (
        <todos.Provider value={{ state, dispatch }}>
            {props.children}
        </todos.Provider>
    );
};

export default TodoProvider;

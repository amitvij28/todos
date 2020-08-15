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
    addTodos: (t: ITodo[]) => void;
    delTodos: (t: ITodo[]) => void;
    editTodos: (t: ITodo[]) => void;
}>({
    state: { todos: [], idCount: 0 },
    addTodos: (t) => null,
    delTodos: (t) => null,
    editTodos: (t) => null,
});

interface ITodoAction {
    type: string;
    payload: ITodo[];
}

const todoReducer = (state: ITodoState, action: ITodoAction) => {
    const { type, payload } = action;
    switch (type) {
        case TodoActions.ADD_TODO:
            return {
                todos: [...state.todos, ...payload],
                idCount: state.idCount + payload.length,
            };
        case TodoActions.DEL_TODO:
            const delIds = payload.map((t) => t.id);
            return {
                todos: state.todos.filter((t) => !delIds.includes(t.id)),
                idCount: state.idCount,
            };
        case TodoActions.EDIT_TODO:
            const editIds = payload.map((t) => t.id);
            return {
                todos: state.todos.map((m) => {
                    if (editIds.includes(m.id)) {
                        const i = editIds.indexOf(m.id);
                        return payload[i];
                    }
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

    const addTodos = (todo: ITodo[]) => {
        dispatch({ type: TodoActions.ADD_TODO, payload: todo });
    };

    const delTodos = (todo: ITodo[]) => {
        dispatch({ type: TodoActions.DEL_TODO, payload: todo });
    };
    const editTodos = (todo: ITodo[]) => {
        dispatch({ type: TodoActions.EDIT_TODO, payload: todo });
    };

    return (
        <todos.Provider value={{ state, addTodos, delTodos, editTodos }}>
            {props.children}
        </todos.Provider>
    );
};

export default TodoProvider;

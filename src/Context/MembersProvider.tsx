import React, { createContext, useReducer, FC, useContext } from "react";
import { todos, ITodo } from "./TodoProvider";

export interface IMember {
    name: string;
    id: number;
}

interface IMemberState {
    members: IMember[];
    idCount: number;
}

export const memberState = createContext<{
    state: IMemberState;
    // dispatch: React.Dispatch<IMemberAction>;
    addMember: (m: IMember) => void;
    deleteMember: (m: IMember) => void;
}>({
    state: { members: [], idCount: 0 },
    addMember: (m) => null,
    deleteMember: (m) => null,
});

interface IMemberAction {
    type: string;
    payload: IMember;
}

export const MemberActions = {
    ADD_MEMBER: "ADD_MEMBER",
    DEL_MEMBER: "DEL_MEMBER",
};

const memberReducer = (state: IMemberState, action: IMemberAction) => {
    switch (action.type) {
        case MemberActions.ADD_MEMBER:
            return {
                members: [action.payload, ...state.members],
                idCount: state.idCount + 1,
            };
        case MemberActions.DEL_MEMBER:
            return {
                members: state.members.filter(
                    (m) => m.id !== action.payload.id
                ),
                idCount: state.idCount,
            };
        default:
            return state;
    }
};

const MembersProvider: FC<{ children: React.ReactNode }> = (props) => {
    const [state, dispatch] = useReducer(memberReducer, {
        members: [],
        idCount: 0,
    });

    const { state: s, editTodos } = useContext(todos);

    const addMember = (mem: IMember) => {
        dispatch({ type: MemberActions.ADD_MEMBER, payload: mem });
    };

    const deleteMember = (mem: IMember) => {
        dispatch({ type: MemberActions.DEL_MEMBER, payload: mem });
        const toEditTodos: ITodo[] = [];

        s.todos.forEach((t) => {
            const members = t.members.filter((m) => mem.id !== m.id);
            if (members.length !== t.members.length)
                toEditTodos.push({ ...t, members });
        });
        editTodos(toEditTodos);
    };

    return (
        <memberState.Provider value={{ state, addMember, deleteMember }}>
            {props.children}
        </memberState.Provider>
    );
};

export default MembersProvider;

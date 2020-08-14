import React, { createContext, useReducer, FC } from "react";

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
    dispatch: React.Dispatch<IMemberAction>;
}>({ state: { members: [], idCount: 0 }, dispatch: () => null });

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
                idCount: state.idCount++,
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

    return (
        <memberState.Provider value={{ state, dispatch }}>
            {props.children}
        </memberState.Provider>
    );
};

export default MembersProvider;

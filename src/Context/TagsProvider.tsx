import React, { createContext, useReducer, FC } from "react";

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
    dispatch: React.Dispatch<any>;
}

interface ITagAction {
    type: string;
    payload: ITag;
}

export const tagState = createContext<ITagContext>({
    state: { tags: [], idCount: 0 },
    dispatch: () => null,
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
                idCount: state.idCount++,
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

    return (
        <tagState.Provider value={{ state, dispatch }}>
            {props.children}
        </tagState.Provider>
    );
};

export default TagsProvider;

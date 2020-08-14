import React from "react";
import TodoProvider from "./Context/TodoProvider";
import Home from "./Components/Home";
import MembersProvider from "./Context/MembersProvider";
import TagsProvider from "./Context/TagsProvider";

function App() {
    return (
        <TodoProvider>
            <MembersProvider>
                <TagsProvider>
                    <Home />
                </TagsProvider>
            </MembersProvider>
        </TodoProvider>
    );
}

export default App;

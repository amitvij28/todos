import React, { useContext } from "react";
import { todos } from "../Context/TodoProvider";

const Lane = () => {
    const tds = useContext(todos);

    return <div>Lane</div>;
};

export default Lane;

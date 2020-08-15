import React from "react";
import { shallow } from "enzyme";
import TodoModal from "../Components/TodoModal";

describe("Todo Modal", () => {
    let open = true;
    const handleClose = () => {
        open = false;
    };

    const component = shallow(
        <TodoModal
            open={open}
            handleClose={handleClose}
            data={null}
            mode={"add"}
            title={"Add"}
        />
    );

    it("should render", () => {
        expect(component.exists()).toBe(true);
    });
});

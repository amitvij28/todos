import React from "react";
import { mount } from "enzyme";
import TagsModal from "../Components/TagsModal";
import { Dialog } from "@material-ui/core";

describe("Tags Modal", () => {
    const handleClose = () => {};
    const component = mount(
        <TagsModal open={true} handleClose={handleClose} />
    );
    it("should match snapshot", () => {
        expect(component).toMatchSnapshot();
    });
    it("should render", () => {
        expect(component.find(Dialog).props()["open"]).toBe(true);
    });

    it("modal should be closed", () => {
        component.setProps({ open: false });
        component.update();
        expect(component.find(Dialog).props()["open"]).toBe(false);
    });
});

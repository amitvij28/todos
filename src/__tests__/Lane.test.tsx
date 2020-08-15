import React from "react";
import { mount } from "enzyme";
import Lane, { ILaneProps } from "../Components/Lane";
import { TodoStatus } from "../Context/TodoProvider";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DisplayCard from "../Components/DisplayCard";

const TestLaneProps: ILaneProps = {
    heading: "Test Lane",
    type: TodoStatus.tbd,
    todoList: [
        {
            id: 1,
            title: "todo1",
            description: "testing todo1",
            schedule: new Date(),
            members: [{ name: "tester1", id: 1 }],
            tags: [
                { label: "testlaber1", id: 1 },
                { label: "testlaber2", id: 2 },
            ],
            status: TodoStatus.tbd,
        },
    ],
};

describe("Lane Component", () => {
    const component = mount(
        <DndProvider backend={HTML5Backend}>
            <Lane {...TestLaneProps} />
        </DndProvider>
    );
    it("should render", () => {
        expect(component.exists()).toBe(true);
        expect(component.find(Lane).length).toBe(1);
    });
    it("should render display card", () => {
        const testLane = component.find(Lane);
        expect(testLane.find(DisplayCard).length).toBe(1);
    });
});

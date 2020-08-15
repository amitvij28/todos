import React from "react";
import { mount } from "enzyme";
import { ITodo, TodoStatus } from "../Context/TodoProvider";
import DisplayCard from "../Components/DisplayCard";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const testTodo: ITodo = {
    id: 1,
    title: "todo1",
    description: "testing todo1",
    schedule: new Date("2020-05-05"),
    members: [{ name: "tester1", id: 1 }],
    tags: [
        { label: "testlaber1", id: 1 },
        { label: "testlaber2", id: 2 },
    ],
    status: TodoStatus.tbd,
};

describe("Display Card", () => {
    const component = mount(
        <DndProvider backend={HTML5Backend}>
            <DisplayCard todo={testTodo} />
        </DndProvider>
    );
    it("should render", () => {
        expect(component.exists()).toBe(true);
        expect(component).toMatchSnapshot();
    });
});

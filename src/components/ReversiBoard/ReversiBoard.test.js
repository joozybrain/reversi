import React from "react";
import { shallow } from "enzyme";
import { wrap } from "module";

import ReversiBoard from "./ReversiBoard";

describe("ReversiBoard", () => {
  //Test basic component rendering
  it("should render basic HTML properly", () => {
    const wrapper = shallow(
      <ReversiBoard ctx={{}} G={{ cells: ["0", "1"] }} />
    );

    expect(wrapper.find("table")).toHaveLength(1);
    expect(wrapper.find("img")).toHaveLength(4);
    expect(wrapper.find("img").get(0).props.alt).toEqual("whiteSpy");
    expect(wrapper.find("img").get(1).props.alt).toEqual("white");
  });

  //Test for events
  it("able to delete a title", () => {
    const mockClickCell = jest.fn();
    const mockEndTurn = jest.fn();
    const mockClickShift = jest.fn();
    let e = { shiftKey: true };
    const wrapper = shallow(
      <ReversiBoard
        ctx={{}}
        G={{ cells: [] }}
        isActive
        moves={{ clickCell: mockClickCell, clickShift: mockClickShift }}
        events={{ endTurn: mockEndTurn }}
      />
    );

    wrapper
      .find("td")
      .at(0)
      .simulate("click", e);
    expect(mockClickShift).toBeCalled();

    e = { shiftKey: false}
    wrapper
      .find("td")
      .at(0)
      .simulate("click", e);
    expect(mockClickShift).toBeCalled();
  });

  it("able to simulate a click activating a title", () => {
    const mockClickCell = jest.fn();
    const mockEndTurn = jest.fn();
    const mockClickShift = jest.fn();
    const e = { shiftKey: true };
    const wrapper = shallow(
      <ReversiBoard
        ctx={{}}
        G={{ cells: [] }}
        isActive
        moves={{ clickCell: mockClickCell, clickShift: mockClickShift }}
        events={{ endTurn: mockEndTurn }}
      />
    );

    wrapper
      .find("td")
      .at(0)
      .simulate("click", e);

    expect(mockClickCell).toBeCalledWith(0);
    
  });

  //Test for event handler
  it("able to simulate clicking but does not activate a tile", () => {
    const mockClickCell = jest.fn();
    const mockEndTurn = jest.fn();
    const mockClickShift = jest.fn();
    const e = { shiftKey: true };
    const wrapper = shallow(
      <ReversiBoard
        ctx={{}}
        G={{ cells: [] }}
        isActive={false}
        moves={{ clickCell: mockClickCell, clickShift: mockClickShift }}
        events={{ endTurn: mockEndTurn }}
      />
    );

    wrapper
      .find("td")
      .at(0)
      .simulate("click", e);

    expect(mockClickCell).not.toBeCalled();
  });

  
});

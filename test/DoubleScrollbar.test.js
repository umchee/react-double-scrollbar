jest.unmock("../src/DoubleScrollbar.jsx");

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import DoubleScrollbar from "../src/DoubleScrollbar.jsx";

describe('DoubleScrollbar', () => {

  let doubleScrollbar;
  const wrappedId = "wrappedElement";
  const childWidth = 1500;

  let createComponent = () => {
    let divStyle = { "width" : childWidth + "px" };
    doubleScrollbar = TestUtils.renderIntoDocument(
      <DoubleScrollbar>
        <div id={wrappedId} style={divStyle}><p>this is a wide div</p></div>
      </DoubleScrollbar>);

    return doubleScrollbar;
  };

  it('renders successfully', () => {
    spyOn(window, "addEventListener").and.callThrough();
    let doubleScrollbar = createComponent();
    expect(doubleScrollbar.refs.outerDiv).toBeDefined();
    expect(doubleScrollbar.refs.innerDiv).toBeDefined();
    expect(doubleScrollbar.refs.childrenWrapper).toBeDefined();
    expect(doubleScrollbar.refs.childrenWrapper.firstChild.id).toBe(wrappedId);
    expect(window.addEventListener).toHaveBeenCalledWith("resize", doubleScrollbar.boundCalculateWidth);
  });

  it('cleans up on unmount', () => {
    spyOn(window, "removeEventListener").and.callThrough();
    let doubleScrollbar = createComponent();
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(doubleScrollbar).parentNode);
    expect(window.removeEventListener).toHaveBeenCalledWith("resize", doubleScrollbar.boundCalculateWidth);
  });

  it('handles changes to the inner child width', () => {
    let doubleScrollbar = createComponent();
    // the unit test env does not set scrollWidth on elements
    expect(doubleScrollbar.state.width).toBe("auto");

    // force a value for the element then dispatch a resize event so calculateWidth is called
    doubleScrollbar.refs.childrenWrapper.scrollWidth = childWidth;
    window.dispatchEvent(new Event('resize'));
    expect(doubleScrollbar.state.width).toBe(childWidth + "px");
  });

  it('handles changes to size on re-render', () => {
    let doubleScrollbar = createComponent();
    // the unit test env does not set scrollWidth on elements
    expect(doubleScrollbar.state.width).toBe("auto");

    // new value for the width of the childrenWrapper
    doubleScrollbar.refs.childrenWrapper.scrollWidth = childWidth;

    doubleScrollbar.componentDidUpdate();

    expect(doubleScrollbar.state.width).toBe(childWidth + "px");
  });

  it('does not call setState if the scrollWidth did not change', () => {
    let doubleScrollbar = createComponent();
    const setStateSpy = spyOn(doubleScrollbar, 'setState').and.callThrough();

    // the unit test env does not set scrollWidth on elements, so it is auto to start
    expect(doubleScrollbar.state.width).toBe("auto");

    // new value for the width of the childrenWrapper
    doubleScrollbar.refs.childrenWrapper.scrollWidth = childWidth;

    // should call setState
    doubleScrollbar.componentDidUpdate();
    expect(doubleScrollbar.state.width).toBe(childWidth + "px");

    //should not call setState
    doubleScrollbar.componentDidUpdate();

    expect(setStateSpy.calls.count(), 1);

  });

});

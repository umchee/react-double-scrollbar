import React from "react";

"use strict";

class DoubleScrollbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: "auto"
    };
  }

  componentDidMount() {
    let outerDiv = this.refs.outerDiv;
    let innerDiv = this.refs.innerDiv;
    let childWrapper = this.refs.childrenWrapper;

    // Set initial width
    this.calculateWidth();

    // Update width when window size changes
    window.addEventListener("resize", this.calculateWidth.bind(this));

    // assoc the scrolls
    outerDiv.onscroll = function() {
      childWrapper.scrollLeft = outerDiv.scrollLeft;
    };

    childWrapper.onscroll= function() {
      outerDiv.scrollLeft = childWrapper.scrollLeft;
    };
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.calculateWidth.bind(this));
  }

  calculateWidth() {
    let childWrapper = this.refs.childrenWrapper;

    // Set the width of the inner div to the first child's
    if(childWrapper) {
      this.setState({
        width: childWrapper.scrollWidth + "px"
      });
    }
  }

  render() {
    let outerDivStyle = { overflowX: "auto", overflowY: "hidden" };
    let innerDivStyle = { paddingTop: "1px", width: this.state.width };
    let childDivStyle = { overflow: "auto", overflowY: "hidden" };

    return (
      <div>
        <div ref="outerDiv" style={outerDivStyle}>
          <div ref="innerDiv" style={innerDivStyle}>&nbsp;</div>
        </div>
        <div ref="childrenWrapper" style={childDivStyle} >
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default DoubleScrollbar;

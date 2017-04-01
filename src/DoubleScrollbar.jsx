import React from "react";

"use strict";

class DoubleScrollbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: "auto"
    };

    this.boundCalculateWidth = this.calculateWidth.bind(this);
  }

  componentDidMount() {

    let outerDiv = this.refs.outerDiv;
    let childWrapper = this.refs.childrenWrapper;

    // Set initial width
    this.calculateWidth();

    // Update width when window size changes
    window.addEventListener("resize", this.boundCalculateWidth);

    // assoc the scrolls
    outerDiv.onscroll = function() {
      childWrapper.scrollLeft = outerDiv.scrollLeft;
    };

    childWrapper.onscroll= function() {
      outerDiv.scrollLeft = childWrapper.scrollLeft;
    };
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.boundCalculateWidth);
  }

  calculateWidth() {

    // Set the width of the inner div to the first child's
    if(this.refs.childrenWrapper) {
      this.setState({
        width: this.refs.childrenWrapper.scrollWidth + "px"
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

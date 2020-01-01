/**
 * Author: Kaisar, last modified: 14-11-2019
 * Modified: uttam, last modified: 24-12-2019
 * Description: Class component for taking text Input
 * Mandatory props:  No mandatory props
 * Optional props: onEnterKeyPress(event), onChange(fieldName, fieldValue, fieldType) as function & mandatory as boolean & label, 
                   defaultValue, fieldType, fieldName, fieldValue, placeHolder as string, showLabel as bool
 * Test file: PROJECT_ROOT/src/sgf/testings/fieldTypes/FtText.test.js
 */

import React, { Component } from "react";
import { MDCTextField } from "@material/textfield";
import { MDCFloatingLabel } from "@material/floating-label";
import PropTypes from "prop-types";

class FtText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldValue: this.props.fieldValue || this.props.defaultValue || "",
    };
  }

  componentDidMount = () => {
    if (this.textInputRef) {
      this.textInputRef.addEventListener("keyup", this.onEnterKeyPress);
    }
    [].map.call(document.querySelectorAll(".mdc-text-field"), function (el) {
      return new MDCTextField(el);
    });

    [].map.call(document.querySelectorAll(".mdc-floating-label"), function (el) {
      return new MDCFloatingLabel(el);
    });
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.fieldValue !== this.props.fieldValue) {
      this.setState({
        fieldValue: this.props.fieldValue
      })
    }
  }
  componentWillUnmount = () => {
    if (this.textInputRef) {
      this.textInputRef.removeEventListener("keyup", this.onEnterKeyPress);
    }
  };

  onEnterKeyPress = event => {
    event.preventDefault();
    if (event.keyCode === 13) {
      if (this.props.onEnterKeyPress) {
        this.props.onEnterKeyPress(event);
      }
    }
  };

  getFieldValue = () => {
    return this.state.fieldValue;
  };

  setFieldValue = (value) => {
    this.setState({
      fieldValue: value
    })
  }

  onChange = e => {
    let fieldValue = e.target.value;
    this.setState({
      fieldValue: fieldValue
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.props.fieldName, fieldValue, this.props.fieldType);
      }
    });

  };

  render() {
    let { label, mandatory } = this.props;

    var labelClass = this.props.showLabel === false ? "mdc-text-field--no-label" : ""

    return (
      <div
        className="fw-mb-8"
        ref={node => {
          this.inputContainerRef = node;
        }}
      >
        <div className={"mdc-text-field fw-text-input " + labelClass}>
          <input
            type="text"
            className="mdc-text-field__input fw-typography--body2"
            // name={label || "Text"}
            value={this.state.fieldValue}
            id={label || "Text"}
            placeholder={this.props.placeHolder || ""}
            onChange={this.onChange}
            required={mandatory || false}
            ref={elem => this.textInputRef = elem}
          />
          {this.props.showLabel !== false && (
            //this div is added as the lebel didnot work in browser autofill 
            <div className="mdc-notched-outline__notch">
              <label
                htmlFor={label || "Text"}
                className="fw-typography--body2 mdc-floating-label fw-text-label"
              >
                {label ? label.replace(/_/gi, " ") : "Text"}
              </label>
            </div>
          )}
          <div className="mdc-line-ripple" />
        </div>

      </div>
    );
  }
}

FtText.propTypes = {
  onEnterKeyPress: PropTypes.func,
  onChange: PropTypes.func,
  mandatory: PropTypes.bool,
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  fieldType: PropTypes.string,
  fieldName: PropTypes.string,
  fieldValue: PropTypes.string,
  placeHolder: PropTypes.string,
  showLabel: PropTypes.bool
};

export default FtText;

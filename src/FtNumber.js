/**
 * Author: uttam, last modified: 07-11-2019
 * Modified: Kaisar, last modified: 14-11-2019
 * Modified: uttam, last modified: 12-12-2019 
 * Description: Class component for taking Number Input
 * Mandatory props: No mandatory props
 * Optional props: onEnterKeyPress(event), onChange(fieldName, fieldValue, fieldType) as function,
                   mandatory as bool & fieldValue, fieldName, fieldType, label, placeHolder,
                   defaultValue as string, showLabel as boolean
 * Test file: PROJECT_ROOT/src/sgf/testings/fieldTypes/FtNumber.test.js
 */

import React, { Component } from "react";
import { MDCTextField } from "@material/textfield";
import { MDCFloatingLabel } from "@material/floating-label";
import PropTypes from "prop-types";

class FtNumber extends Component {
  constructor(props) {
    super(props);
    const { fieldValue, defaultValue } = this.props;
    this.state = {
      fieldValue: fieldValue || defaultValue || ""
    };
  }

  componentDidMount = () => {
    if (this.numberRef) {
      this.numberRef.addEventListener("keypress", function (evt) {
        if ((evt.which !== 8 && evt.which !== 0 && evt.which < 48) || evt.which > 57) {
          evt.preventDefault();
        }
      });
      this.numberRef.addEventListener("keyup", this.onEnterKeyPress);
    }

    [].map.call(document.querySelectorAll(".mdc-text-field"), function (el) {
      return new MDCTextField(el);
    });

    [].map.call(document.querySelectorAll(".mdc-floating-label"), function (el) {
      return new MDCFloatingLabel(el);
    });
  };

  componentWillUnmount = () => {
    if (this.numberRef) {
      this.numberRef.removeEventListener("keyup", this.onEnterKeyPress);
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
            type="number"
            className="mdc-text-field__input fw-typography--body2"
            onChange={this.onChange}
            value={this.state.fieldValue}
            name={label ? label : "number"}
            required={mandatory}
            id={label ? label : "number"}
            ref={node => this.numberRef = node}
            placeholder={this.props.placeHolder || ""}
          />
          {this.props.showLabel !== false && (
            <label
              htmlFor={label ? label : "number"}
              className="mdc-floating-label fw-typography--body2 fw-text-label"
            >
              {label ? label.replace(/_/gi, " ") : "Number"}
            </label>
          )}
          <div className="mdc-line-ripple" />
        </div>
      </div>
    );
  }
}

FtNumber.propTypes = {
  onEnterKeyPress: PropTypes.func,
  onChange: PropTypes.func,
  mandatory: PropTypes.bool,
  label: PropTypes.string,
  placeHolder: PropTypes.string,
  fieldName: PropTypes.string,
  fieldType: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  fieldValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  showLabel: PropTypes.bool
};

export default FtNumber;

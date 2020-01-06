import React, { Component } from 'react';
import {MDCDialog} from '@material/dialog';

class Dialog extends Component {
    componentDidMount() {
        const dialog = new MDCDialog(document.querySelector('.mdc-dialog'));
        dialog.open()
    }
    
    render() {
        return (
            <div className="mdc-dialog"
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="my-dialog-title"
                aria-describedby="my-dialog-content">
                <div className="mdc-dialog__container">
                    <div className="mdc-dialog__surface">
   
                        <h2 className="mdc-dialog__title" id="my-dialog-title">
                            {this.props.dialogHeader}
                        </h2>
                        <div className="mdc-dialog__content" id="my-dialog-content">
                           {this.props.children}
                        </div>
                        <footer className="mdc-dialog__actions">
                            <button type="button" className="mdc-button mdc-dialog__button" data-mdc-dialog-action="no" onClick={()=>{this.props.onClick("no")}}>
                                <span className="mdc-button__label">No</span>
                            </button>
                            <button type="button" className="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes" onClick={()=>{this.props.onClick("yes")}}>
                                <span className="mdc-button__label">Yes</span>
                            </button>
                        </footer>
                    </div>
                </div>
                <div className="mdc-dialog__scrim"></div>
            </div>
        );
    }
}

export default Dialog;
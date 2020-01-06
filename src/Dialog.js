import React, { Component } from 'react';
import {MDCDialog} from '@material/dialog';

class Dialog extends Component {
    componentDidMount() {
        const dialog = new MDCDialog(document.querySelector('.mdc-dialog'));
        dialog.open()
    }
    
    render() {
        return (
            <div class="mdc-dialog"
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="my-dialog-title"
                aria-describedby="my-dialog-content">
                <div class="mdc-dialog__container">
                    <div class="mdc-dialog__surface">
   
                        <h2 class="mdc-dialog__title" id="my-dialog-title">
                            Dialog Title
                        </h2>
                        <div class="mdc-dialog__content" id="my-dialog-content">
                            Dialog body text goes here.
                        </div>
                        <footer class="mdc-dialog__actions">
                            <button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="no">
                                <span class="mdc-button__label">No</span>
                            </button>
                            <button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes">
                                <span class="mdc-button__label">Yes</span>
                            </button>
                        </footer>
                    </div>
                </div>
                <div class="mdc-dialog__scrim"></div>
            </div>
        );
    }
}

export default Dialog;
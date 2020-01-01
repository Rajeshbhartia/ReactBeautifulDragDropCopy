import React, { Component } from 'react';

class FtJson extends Component {
    startDrag = (ev) => {
        ev.dataTransfer.setData("drag-item", ev.target.innerHTML);
        ev.target.classList.add("fw-dragging-start")
        
    }
    dragOver = (ev) => {
        ev.preventDefault();
        if (ev.target.classList.contains("fw-background-green")) {
            ev.target.classList.remove("fw-background-green")
        }
        ev.target.classList.add("fw-background-red")
    }
    onDragLeave = (ev) => {
        if (ev.target.classList.contains("fw-background-red")) {
            ev.target.classList.remove("fw-background-red")
        }
    }

    drop = (ev) => {
        const droppedItem = ev.dataTransfer.getData("drag-item");
        if (ev.target.classList.contains("fw-background-red")) {
            ev.target.classList.remove("fw-background-red")
            ev.target.classList.add("fw-background-green")
        }
        ev.target.innerHTML = droppedItem
    }

    render() {
        return (
            <div className="fw-json-form-wrapper">
                <div className="fw-json-form-title">
                    Form1
                </div>
                <div className="fw-json-form-divider" />
                <div className="fw-json-form-subtitle">
                    CRM > Forms
                </div>
                <div className="fw-box1">
                    <div className="fw-box1-title">
                        Field Types
                    </div>
                    <div className="fw-single-box-wrapper">
                        <div className="fw-single-box fw-mr-12" draggable onDragStart={this.startDrag}>
                            Text
                        </div>
                        <div className="fw-single-box" draggable onDragStart={this.startDrag}>
                            Text Area
                        </div>
                        <div className="fw-single-box fw-mr-12" draggable onDragStart={this.startDrag}>
                            Email
                        </div>
                    </div>
                </div>

                <div className="fw-box2 mdc-elevation--z6" >
                    <div className="fw-box2-title-wrapper">
                        <span className="fw-box2-title">
                            Selected Fields
                        </span>
                        <span className="fw-box2-preview" onClick={() => { console.log("preview") }}>
                            Preview
                        </span>
                    </div>
                    <div className="fw-box2-content-wrapper">
                        <div onDragOver={this.dragOver} onDrop={this.drop} onDragLeave={this.onDragLeave} className="fw-box2-single-content">

                        </div>
                        <div onDragOver={this.dragOver} onDrop={this.drop} onDragLeave={this.onDragLeave} className="fw-box2-single-content">

                        </div>

                        <div onDragOver={this.dragOver} onDrop={this.drop} onDragLeave={this.onDragLeave} className="fw-box2-single-content">

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FtJson;  
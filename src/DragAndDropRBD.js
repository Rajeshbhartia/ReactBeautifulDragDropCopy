// import React from "react";
import React, { Component } from 'react';
import { v4 as uuid } from "uuid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.scss";
import Dialog from './Dialog';
import FtText from './FtText';
import FtNumber from './FtNumber';

const COLLECTION = [
    { id: uuid(), label: "Text" },
    { id: uuid(), label: "Email" },
    { id: uuid(), label: "Number" }
];

const reorder = (list, startIndex, endIndex) => {
    console.log(list, startIndex, endIndex)
    const [removed] = list.splice(startIndex, 1);
    list.splice(endIndex, 0, removed);
    return list;
};

const copy = (source, destination, droppableSource, droppableDestination) => {
    const item = source[droppableSource.index];
    destination.splice(droppableDestination.index, 0, { ...item, id: uuid() });
    return destination;
};

function Copyable(props) {
    return (
        <Droppable droppableId={props.droppableId} isDropDisabled={true} className="">
            {(provided, snapshot) => (
                <div ref={provided.innerRef} className={props.className}>
                    {props.items.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided, snapshot) => (
                                <React.Fragment>
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={provided.draggableProps.style}
                                        className={snapshot.isDragging ? "fw-single-box  dragging" : "fw-single-box "}
                                    >
                                        {item.label}
                                    </div>
                                    {snapshot.isDragging && (
                                        <div className="fw-single-box react-beatiful-dnd-copy fw-dragging">{item.label}</div>
                                    )}
                                </React.Fragment>
                            )}
                        </Draggable>

                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}

function Shop(props) {
    return <Copyable droppableId="SHOP" className="fw-single-box-wrapper" items={props.items} />;
}


function ShoppingBag(props) {
    console.log(props)
    return (
        <Droppable droppableId={props.id}>
            {(provided, snapshot) => {
                console.log(snapshot)
                return (
                    <div ref={provided.innerRef} className="shopping-bag fw-box2-content-wrapper">
                        {props.items.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={provided.draggableProps.style}
                                        className="fw-box2-single-content"
                                    >
                                        <div className="fw-box2-icon-wrapper">
                                            <i className="material-icons">
                                                settings_applications
                                            </i>
                                            <i className="material-icons">
                                                visibility
                                            </i>
                                            <i className="material-icons">
                                                delete
                                            </i>
                                        </div>
                                        <div className="fw-box2-single-content-header">
                                            {/* <FtText label={item.label} /> */}
                                            {item.label}
                                        </div>
                                        <div className="fw-box2-single-content-subheader">
                                            Hello 123
                                        </div>
                                        <div className="fw-box2-line" />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )
            }
            }
        </Droppable>
    );
}


class DragAndDropRBD extends Component {

    state = {
        shoppingBagItems1: [],
        isDialogOpen: false,
        result: {}
    }

    onDragEnd = (result) => {
        const { source, destination } = result;
        console.log(source, destination, result)

        let dest = { ...destination }
        dest.index = this.state.shoppingBagItems1.length

        if (!destination) {
            return;
        }

        switch (source.droppableId) {
            case "BAG1":
                reorder(this.state.shoppingBagItems1, source.index, destination.index)
                break;
            case "SHOP":
                this.setState({ isDialogOpen: true, result })
                break;
            default:
                break;
        }
    }

    handleClick = (name) => {
        if (name === "yes") {
            copy(COLLECTION, this.state.shoppingBagItems1, this.state.result.source, this.state.result.destination)
        }
        this.setState({ isDialogOpen: false })
    }

    render() {
        return (
            <div className="fw-json-form-wrapper">

                <DragDropContext onDragEnd={this.onDragEnd}>
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
                        <Shop items={COLLECTION} />
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

                        <div style={{ display: 'flex', height: "600px", width: "700px", overflow: 'auto', }}>
                            <ShoppingBag items={this.state.shoppingBagItems1} id="BAG1" />
                        </div>
                    </div>
                </DragDropContext>
                {this.state.isDialogOpen && (<Dialog onClick={this.handleClick} dialogHeader="Add Text Field">
                    <FtText label="Label name" defaultValue="Text" />
                    <FtText label="Default Value" />
                    <FtText label="Helper Text" />
                    <FtNumber label="Maximum Character" defaultValue={255} />
                </Dialog>)}
            </div>
        );
    }
}

export default DragAndDropRBD;
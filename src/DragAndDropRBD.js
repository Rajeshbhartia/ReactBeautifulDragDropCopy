// import React from "react";
import React, { Component } from 'react';
import { v4 as uuid } from "uuid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.scss";
import Dialog from './Dialog';
// import FtText from "./FtText";


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
    console.log(source, destination, droppableSource, droppableDestination)
    const item = source[droppableSource.index];
    console.log(item, droppableDestination.index)
    console.log({ ...item, id: uuid() })
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
            {(provided, snapshot) => (
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
                                        <i class="material-icons">
                                            settings_applications
                                        </i>
                                        <i class="material-icons">
                                            visibility
                                        </i>
                                        <i class="material-icons">
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
            )}
        </Droppable>
    );
}


class DragAndDropRBD extends Component {

    state = {
        shoppingBagItems1: [],
        // shoppingBagItems2: [],
        // shoppingBagItems3: [],
        // shoppingBagItems4: [],
        isDialogOpen: false
    }

    onDragEnd = (result) => {
        const { source, destination } = result;
        console.log(source, destination)

        let dest = { ...destination }
        dest.index = this.state.shoppingBagItems1.length

        
        if (!destination) {
            return;
        }
        console.log(destination)
        if (source.droppableId === "SHOP") {
            switch (destination.droppableId) {
                case "BAG1":
                    // if (this.state.shoppingBagItems1.length < 3)
                    copy(COLLECTION, this.state.shoppingBagItems1, source, destination)
                    break;

                // case "BAG2":
                //     if (this.state.shoppingBagItems2.length < 3)
                //         copy(COLLECTION, this.state.shoppingBagItems2, source, destination)
                //     break;

                // case "BAG3":
                //     if (this.state.shoppingBagItems3.length < 3)
                //         copy(COLLECTION, this.state.shoppingBagItems3, source, destination)
                //     break;

                // case "BAG4":
                //     if (this.state.shoppingBagItems4.length < 3)
                //         copy(COLLECTION, this.state.shoppingBagItems4, source, destination)
                //     break;
                default:
                    break;
            }
        } else if (source.droppableId === destination.droppableId) {
            console.log(source.droppableId, destination)
            switch (source.droppableId) {
                case "BAG1":
                    reorder(this.state.shoppingBagItems1, source.index, destination.index)
                    break;

                // case "BAG2":
                //     reorder(this.state.shoppingBagItems2, source.index, destination.index)
                //     break;

                // case "BAG3":
                //     reorder(this.state.shoppingBagItems3, source.index, destination.index)
                //     break;

                // case "BAG4":
                //     reorder(this.state.shoppingBagItems4, source.index, destination.index)
                //     break;
                default:
                    break;
            }
        } else {
            console.log(source, destination)

        }

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
                        {/* <div className="fw-box2-content-wrapper"> */}
                        <div style={{ display: 'flex', height: "600px", width: "700px", overflow: 'auto', }}>
                            <ShoppingBag items={this.state.shoppingBagItems1} id="BAG1" />
                            {/* <ShoppingBag items={this.state.shoppingBagItems2} id="BAG2" /> */}
                            {/* <ShoppingBag items={this.state.shoppingBagItems3} id="BAG3" /> */}
                            {/* <ShoppingBag items={this.state.shoppingBagItems4} id="BAG4" /> */}
                        </div>
                        {/* </div> */}
                    </div>
                </DragDropContext>
                {this.state.isDialogOpen && <Dialog />}
            </div>
        );
    }
}

export default DragAndDropRBD;
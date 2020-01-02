// import React from "react";
import React, { Component } from 'react';
import { v4 as uuid } from "uuid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.scss";
import FtText from "./FtText";


const COLLECTION = [
    { id: uuid(), label: "Text" },
    { id: uuid(), label: "Email" },
    { id: uuid(), label: "Number" }
];

// const reorder = (list, startIndex, endIndex) => {
//   const [removed] = list.splice(startIndex, 1);
//   list.splice(endIndex, 0, removed);
//   return list;
// };

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
        <Droppable droppableId={props.droppableId} isDropDisabled={true}>
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
                                        <div className="fw-single-box react-beatiful-dnd-copy">{item.label}</div>
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
                        <div
                            className="fw-box2-single-content"
                            key={index}
                        >
                            <FtText label={item.label} />
                        </div>
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
        shoppingBagItems2: [],
        shoppingBagItems3: [],
        shoppingBagItems4: [],
    }
    
    onDragEnd = (result) => {
        const { source, destination } = result;
        console.log(this.state.shoppingBagItems1.length, destination)

        let dest = { ...destination }
        dest.index = this.state.shoppingBagItems1.length

        
        if (!destination) {
            return;
        }
        console.log(destination)
        switch (destination.droppableId) {
            case "BAG1":
                if (this.state.shoppingBagItems1.length < 3)
                    copy(COLLECTION, this.state.shoppingBagItems1, source, dest)
                break;

            case "BAG2":
                if (this.state.shoppingBagItems2.length < 3)
                    copy(COLLECTION, this.state.shoppingBagItems2, source, dest)
                break;

            case "BAG3":
                if (this.state.shoppingBagItems3.length < 3)
                    copy(COLLECTION, this.state.shoppingBagItems3, source, dest)
                break;

            case "BAG4":
                if (this.state.shoppingBagItems4.length < 3)
                    copy(COLLECTION, this.state.shoppingBagItems4, source, dest)
                break;
            default:
                break;
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
                        <div style={{ display: 'flex', height: "100%", width: "100%", flexDirection: 'column', }}>
                            <ShoppingBag items={this.state.shoppingBagItems1} id="BAG1" />
                            <ShoppingBag items={this.state.shoppingBagItems2} id="BAG2" />
                            <ShoppingBag items={this.state.shoppingBagItems3} id="BAG3" />
                            <ShoppingBag items={this.state.shoppingBagItems4} id="BAG4" />
                        </div>
                        {/* </div> */}
                    </div>
                </DragDropContext>
            </div>
        );
    }
}

export default DragAndDropRBD;




// function App() {
//     const [shoppingBagItems1, setShoppingBagItems1] = React.useState([]);
//     const [shoppingBagItems2, setShoppingBagItems2] = React.useState([]);
//     const [shoppingBagItems3, setShoppingBagItems3] = React.useState([]);
//     const [shoppingBagItems4, setShoppingBagItems4] = React.useState([]);

//     const onDragEnd = React.useCallback(
//         result => {
//             const { source, destination } = result;

//             if (!destination) {
//                 return;
//             }
//             console.log(destination, shoppingBagItems1)

//             switch (destination.droppableId) {
//                 case "BAG1":
//                     if (shoppingBagItems1.length < 3)
//                         setShoppingBagItems1(state =>
//                             copy(COLLECTION, state, source, destination)
//                         );
//                     break;
//                 case "BAG2":
//                     setShoppingBagItems2(state =>
//                         copy(COLLECTION, state, source, destination)
//                     );
//                     break;
//                 case "BAG3":
//                     setShoppingBagItems3(state =>
//                         copy(COLLECTION, state, source, destination)
//                     );
//                     break;
//                 case "BAG4":
//                     setShoppingBagItems4(state =>
//                         copy(COLLECTION, state, source, destination)
//                     );
//                     break;
//                 default:
//                     break;
//             }
//         },
//         [setShoppingBagItems1, setShoppingBagItems2, setShoppingBagItems3, setShoppingBagItems4]
//     );

//     console.log(shoppingBagItems1)


//     return (

//         <div className="fw-json-form-wrapper">

//             <DragDropContext onDragEnd={onDragEnd}>
//                 <div className="fw-json-form-title">
//                     Form1
//                 </div>
//                 <div className="fw-json-form-divider" />
//                 <div className="fw-json-form-subtitle">
//                     CRM > Forms
//                 </div>
//                 <div className="fw-box1">
//                     <div className="fw-box1-title">
//                         Field Types
//                 </div>
//                     {/* <div className="fw-single-box-wrapper"> */}
//                     <Shop items={COLLECTION} />
//                     {/* </div> */}
//                 </div>

//                 <div className="fw-box2 mdc-elevation--z6" >
//                     <div className="fw-box2-title-wrapper">
//                         <span className="fw-box2-title">
//                             Selected Fields
//                         </span>
//                         <span className="fw-box2-preview" onClick={() => { console.log("preview") }}>
//                             Preview
//                         </span>
//                     </div>
//                     {/* <div className="fw-box2-content-wrapper"> */}
//                     <div style={{ display: 'flex', height: "100%", width: "100%", flexDirection: 'column', }}>
//                         <ShoppingBag items={[{ id: 123, label: "text" }]} id="BAG1" />
//                         <ShoppingBag items={[{ id: 123, label: "text" }]} id="BAG2" />
//                         <ShoppingBag items={[{ id: 123, label: "text" }]} id="BAG3" />
//                         <ShoppingBag items={[{ id: 123, label: "text" }]} id="BAG4" />
//                     </div>
//                     {/* </div> */}
//                 </div>
//             </DragDropContext>
//         </div>
//     );
// }

// export default App;

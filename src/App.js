import React, { Component } from 'react';
import DragAndDropRBD from './DragAndDropRBD';
import Dialog from './Dialog';
// import DragAndDropHtml from './DragAndDropHtml';

class App extends Component {
  render() {
    return (
      <div>
        <DragAndDropRBD />
        {/* <Dialog /> */}
        {/* <DragAndDropHtml /> */}
      </div>
    );
  }
}

export default App;
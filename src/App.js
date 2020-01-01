import React, { Component } from 'react';
import DragAndDropRBD from './DragAndDropRBD';
// import DragAndDropHtml from './DragAndDropHtml';

class App extends Component {
  render() {
    return (
      <div>
        <DragAndDropRBD />
        {/* <DragAndDropHtml /> */}
      </div>
    );
  }
}

export default App;
import React, { Component } from 'react';
import DragAndDropRBD from './DragAndDropRBD';

class App extends Component {
  // componentDidMount() {
  //   let location = window.location.href
  //   console.log(location)

  //   document.addEventListener('DOMContentLoaded', function() {
  //     // window.location.replace("http://www.google.com");
  //     // window.location.replace("http://localhost:3000/#");
  //  }, false);
  // }

  // componentDidMount() {
  //   var xhttp = new XMLHttpRequest();
  //   xhttp.onreadystatechange = function() {
  //     if (this.readyState == 4 && this.status == 200) {
  //       document.getElementById("demo").innerHTML =
  //       this.responseText;
  //     }
  //   };
  //   xhttp.open("GET", "https://myaccount-dev.synopi.com:13443/signin", true);
  //   xhttp.send();
  // }
  
  
  render() {
    return (
      <div id="demo">
        <DragAndDropRBD />
        {/* hello */}

      </div>
    );
  }
}

export default App;
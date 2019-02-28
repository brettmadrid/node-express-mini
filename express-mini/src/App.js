import React, { Component } from "react";
import Axios from "axios";

import Hobbits from "./Hobbits";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      hobbits: []
    };
  }

  componentDidMount() {
    this.refresh();
  }

  refresh = () => {
    Axios.get("http://localhost:9090/api/users")
      .then(response => this.setState({ hobbits: response.data }))
      .catch(err => console.log(err));
  };

  deleteHobbit = id => {
    Axios.delete(`http://localhost:9090/api/users/${id}`)
      .then(response => {
        console.log(response);
      })
      .then(response => {
        this.refresh();
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="App">
        <h2>Hobbits!</h2>
        <div className="hobbit-container">
          {this.state.hobbits.map(hobbit => (
            <Hobbits
              key={hobbit.id}
              hobbit={hobbit}
              deleteHobbit={this.deleteHobbit}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;

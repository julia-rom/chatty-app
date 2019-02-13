import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currentUser: { name: 'anonymous' },
      message: "",
      messages: [] //msgs coming form server will be stored here
    };
  }

  //send username updates to server
  sendUsername = (name) => {
    // const parsedName = JSON.parse(name.data);
    this.setState({
      currentUser: { name: name },
      messages: this.state.messages.concat({
        content: `${this.state.currentUser.name} changed their name to ${name}`,
        id: (this.state.messages.length + 1),
        type: 'incomingNotification',
        username: this.state.currentUser.name
      })
    })
    this.socket.send(JSON.stringify({ oldUsername: this.state.currentUser.name, newName: name }));

  }

  //sends new msgs to server
  sendMessages = (message) => {
    // this.setState({
    //   messages: this.state.messages.concat({
    // content: message,
    // id: (this.state.messages.length + 1),
    // type: 'incomingMessage',
    // username: this.state.currentUser.name
    //   })
    // })
    this.socket.send(JSON.stringify({ username: this.state.currentUser.name, message: message }));
  }

  componentDidMount() {
    setTimeout(() => {
      // Setup the WebSocket client
      this.socket = new WebSocket("ws://localhost:3001/websocket");

      // Handle when the socket opens (i.e. is connected to the server)
      this.socket.addEventListener("open", e => {
        console.log("Connected to websocket server");
      });

      // Handle messages using `this.receiveMessage`
      // this.socket.addEventListener("message", this.sendMessages)
      this.socket.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        console.log(msg)
        this.sendMessages;
      }

      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ loading: false })
    }, 2000);
  }



  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div>
          < MessageList messages={this.state.messages} />
          < ChatBar sendUsername={this.sendUsername} sendMessages={this.sendMessages} currentUser={this.state.currentUser} />
        </div>
      );
    }
  }
}
export default App;

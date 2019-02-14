import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';
import { endianness } from 'os';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currentUser: { name: 'anonymous' },
      messages: [], //msgs coming form server will be stored here
      onlineUsers: null
    };
  }

  //send username updates to server
  sendUsername = (name) => {
    this.socket.send(JSON.stringify({ oldUsername: this.state.currentUser.name, newName: name, content: `${this.state.currentUser.name} changed their name to ${name}`, type: "incomingNotification" }));

  }

  //sends new msgs to server
  sendMessages = (message, imageURL) => {
    this.socket.send(JSON.stringify({ username: this.state.currentUser.name, content: message, imageURL: imageURL, type: "incomingMessage" }));
  }

  componentDidMount() {
    setTimeout(() => {
      // Setup the WebSocket client
      this.socket = new WebSocket("ws://localhost:3001/websocket");

      // Handle when the socket opens (i.e. is connected to the server)
      this.socket.addEventListener("open", e => {
        console.log("Connected to websocket server");
      });


      // Handle receiving messages and updates state (adds messages to array)
      this.socket.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        switch (msg.type) {
          //adds new messages to chatbox
          case "incomingMessage":
            this.setState(prevState => ({
              ...prevState,
              messages: prevState.messages.concat(msg)
            }));
            break;
          //adds new username updates to chatbox  
          case "incomingNotification":
            this.setState(prevState => ({
              ...prevState,
              messages: prevState.messages.concat(msg),
              currentUser: { name: msg.newName }
            }));
            break;
          //updates counter on client page
          case "userStatusUpdate":
            this.setState({ onlineUsers: msg.content })
            break;
          default:
        }
      }

      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ loading: false })
    }, 2000);
  }


  componentDidUpdate() {
    //autoscrolls to bottom of messages any time new ones come in
    try {
      const elements = document.getElementsByClassName('message');
      elements[elements.length - 1].scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      console.log("write something plz")
    }
  }



  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div>
          < NavBar onlineUsers={this.state.onlineUsers} />
          < MessageList messages={this.state.messages} />
          < ChatBar sendUsername={this.sendUsername} sendMessages={this.sendMessages} currentUser={this.state.currentUser} />
        </div>
      );
    }
  }
}
export default App;

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
      messages: [{
        type: 'incomingMessage',
        content: 'I will not be impressed with technology until I can download food.',
        username: 'Anonymous1',
        id: 1
      },
      {
        type: 'incomingNotification',
        content: 'Anonymous1 changed their name to nomnom',
        username: 'nomnom',
        id: 2
      }]
    };
  }

  updateUsername = (name) => {
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
    this.socket.send(`User ${this.state.currentUser.name} updated their name to ${name}`);
  }

  updateMessages = (message) => {
    // const parsedMsg = JSON.parse(message.data);
    this.setState({
      messages: this.state.messages.concat({
        content: message,
        id: (this.state.messages.length + 1),
        type: 'incomingMessage',
        username: this.state.currentUser.name
      })
    })
    // this.socket.send(JSON.stringify({ message: message, username: this.state.currentUser.name }));
    this.socket.send(`User ${this.state.currentUser.name} said ${message}`);
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
      this.socket.addEventListener("message", this.updateMessages)

      // Handle username changes using `this.receiveMessage`
      this.socket.addEventListener("name change", this.updateUsername)


      console.log('Simulating incoming message');
      // Add a new message to the list of messages in the data store
      const newMessage = { id: 3, username: 'Michelle', content: 'Hello there!' };
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages, loading: false })
    }, 2000);
  }



  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div>
          < MessageList messages={this.state.messages} />
          < ChatBar updateUsername={this.updateUsername} updateMessages={this.updateMessages} currentUser={this.state.currentUser} />
        </div>
      );
    }
  }
}
export default App;

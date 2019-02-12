import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currentUser: { name: 'Bob' },
      messages: [{
        type: 'incomingMessage',
        content: 'I will not be impressed with technology until I can download food.',
        username: 'Anonymous1',
        id: 1
      },
      {
        type: 'incomingNotification',
        content: 'Anonymous1 changed their name to nomnom',
        id: 2
      }]
    };

  }

  // Called after the component was rendered and it was attached to the DOM
  // componentDidMount() {
  //   // After 2 seconds, set `loading` to false in the state.
  //   setTimeout(() => {
  //     this.setState({ loading: false }); // this triggers a re-render!
  //   }, 2000)
  // }

  componentDidMount() {
    setTimeout(() => {
      console.log('Simulating incoming message');
      // Add a new message to the list of messages in the data store
      const newMessage = { id: 3, username: 'Michelle', content: 'Hello there!' };
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages })
    }, 3000);
  }

  render() {
    // if (this.state.loading) {
    //   return <h1>Loading...</h1>
    // } else {
    return (
      <div>
        < MessageList messages={this.state.messages} />
        < ChatBar currentUser={this.state.currentUser} />
      </div>
    );
  }
  // }
}
export default App;

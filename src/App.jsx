import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {
  // Set initial state so the component is initially "loading"
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currentUser: { name: 'Bob' },
      messages: [{
        type: "incomingMessage",
        content: "I won't be impressed with technology until I can download food.",
        username: "Anonymous1",
        id: 1
      },
      {
        type: "incomingNotification",
        content: "Anonymous1 changed their name to nomnom",
        id: 2
      }]
    };

  }

  // Called after the component was rendered and it was attached to the DOM
  componentDidMount() {
    // After 2 seconds, set `loading` to false in the state.
    setTimeout(() => {
      this.setState({ loading: false }); // this triggers a re-render!
    }, 2000)
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div>
          < MessageList messages={this.state.messages} />
          < ChatBar currentUser={this.state.currentUser} />
        </div>
      );
    }
  }
}
export default App;

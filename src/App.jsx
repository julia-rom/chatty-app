import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {
  // Set initial state so the component is initially "loading"
  constructor(props) {
    super(props);
    this.state = { loading: true };
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
          < MessageList />
          < ChatBar />
        </div>
      );
    }
  }
}
export default App;

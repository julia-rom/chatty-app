import React, { Component } from 'react';



class ChatBar extends Component {

    render() {
        return (
            <footer className="chatbar">
                {this.props.currentUser.name}
                <input className="chatbar-username" placeholder="Your Name (Optional)" />
                <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
            </footer>
        );
    }
}

ChatBar.propTypes = {
    currentUser: React.PropTypes.object
}

export default ChatBar;


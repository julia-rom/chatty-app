import React, { Component } from 'react';

class ChatBar extends Component {

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            if (event.target.name === 'incomingNotification') {
                this.props.sendUsername(event.target.value);
            } else if (event.target.name === 'incomingMessage') {
                this.props.sendMessages(event.target.value);
                //reset text field to empty
                event.target.value = "";
            }
        }
    }

    render() {
        return (
            <footer className="chatbar">
                <input className="chatbar-username" placeholder="Your Name (Optional)" name="incomingNotification"
                    onKeyPress={this.handleKeyPress} />
                <input className="chatbar-message" placeholder="Type a message and hit ENTER" name="incomingMessage"
                    onKeyPress={this.handleKeyPress} />
            </footer>
        );
    }
}

ChatBar.propTypes = {
    currentUser: React.PropTypes.object,
    sendUsername: React.PropTypes.func,
    sendMessages: React.PropTypes.func,
}

export default ChatBar;


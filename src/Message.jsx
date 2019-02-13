import React, { Component } from 'react';

//individual messages that are sent out 
class Message extends Component {
    render() {
        return (
            <div className="message">
                <span className="message-username">{this.props.username || 'anonymous'}</span>
                <span className="message-content">{this.props.content}</span>
            </div>
        );
    }
}

Message.propTypes = {
    content: React.PropTypes.string.isRequired,
    username: React.PropTypes.string.isRequired,
}

//includes name change updates
class Notification extends Component {
    render() {
        return (
            <div className="message system">
                {this.props.content}
            </div>
        );
    }
}

Notification.propTypes = {
    content: React.PropTypes.string.isRequired,
}

export { Message, Notification };

import React, { Component } from 'react';
import { Message, Notification } from './Message.jsx';

function MessageListItem({ content, username, type }) {
    //add Notification to message box if type matches
    if (type === 'incomingNotification') {
        return (
            < Notification content={content} />
        );
    }
    //otherwise add regular message item to main message container
    return (
        < Message username={username} content={content} />
    )
}


MessageListItem.propTypes = {
    content: React.PropTypes.string.isRequired,
    username: React.PropTypes.string,
    type: React.PropTypes.string
}

class MessageList extends Component {

    render() {
        //display each unique message item
        const messageListItems = this.props.messages.map(messageItem => {
            return < MessageListItem key={messageItem.id} content={messageItem.content} type={messageItem.type} username={messageItem.username} />
        });

        return (
            <main className="messages">
                {messageListItems}
            </main>
        );
    }
}

MessageList.propTypes = {
    messages: React.PropTypes.array.isRequired
}
export default MessageList;

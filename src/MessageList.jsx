import React, { Component } from 'react';
import { Message, Notification } from './Message.jsx';

function MessageListItem({ content, username, imageURL, userColor, type }) {
    //add Notification to message box if type matches
    if (type === 'incomingNotification') {
        return (
            < Notification content={content} />
        );
    }
    //otherwise add regular message item to main message container
    return (
        < Message username={username} content={content} imageURL={imageURL} userColor={userColor} />
    )
}


MessageListItem.propTypes = {
    content: React.PropTypes.string.isRequired,
    username: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    imageURL: React.PropTypes.string,
    userColor: React.PropTypes.string
}

class MessageList extends Component {
    //display each unique message item
    render() {
        const messageListItems = this.props.messages.map(messageItem => {
            return <MessageListItem key={messageItem.id} content={messageItem.content}
                imageURL={messageItem.imageURL} type={messageItem.type}
                username={messageItem.username} userColor={messageItem.userColor} />
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

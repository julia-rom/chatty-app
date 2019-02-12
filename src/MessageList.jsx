import React, { Component } from 'react';

function MessageListItem({ content, type }) {
    return (
        <p>{content}, {type}</p>
    );
}

class MessageList extends Component {
    constructor() {
        super();

        this.state = {
            messages: [{
                type: "incomingMessage",
                content: "I won't be impressed with technology until I can download food.",
                username: "Anonymous1"
            },
            {
                type: "incomingNotification",
                content: "Anonymous1 changed their name to nomnom"
            }]
        }
    }

    render() {
        //display each unique message item
        const messageListItems = this.state.messages.map(messageItem => {
            return < MessageListItem content={messageItem.content} type={messageItem.type} />
        });

        return (
            <main className="messages">
                <div className="message system">
                    {messageListItems}
                </div>
            </main>
        );
    }
}
export default MessageList;

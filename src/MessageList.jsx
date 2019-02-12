import React, { Component } from 'react';

function MessageListItem({ content, type }) {
    return (
        <p>{content}, {type}</p>
    );
}

MessageListItem.propTypes = {
    content: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired
}

class MessageList extends Component {

    render() {
        //display each unique message item
        const messageListItems = this.props.messages.map(messageItem => {
            return < MessageListItem key={messageItem.id} content={messageItem.content} type={messageItem.type} />
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

MessageList.propTypes = {
    messages: React.PropTypes.array.isRequired
}
export default MessageList;

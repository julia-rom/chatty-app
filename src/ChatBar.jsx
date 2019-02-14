import React, { Component } from 'react';

class ChatBar extends Component {

    //deals with message or namechange after pressing enter
    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            if (event.target.name === 'incomingNotification') {
                this.props.sendUsername(event.target.value);
            } else if (event.target.name === 'incomingMessage') {
                let imageURL = this.containsImageURL(event.target.value);
                let msg = event.target.value;
                //checks if the incoming msg has an img url
                if (imageURL !== null) {
                    msg = this.filterMsg(msg, imageURL)
                };
                //sends msg to server 
                this.props.sendMessages(msg, imageURL);
                //reset text field to empty
                event.target.value = "";
            }
        }
    }

    //checks if msg input contains img url
    containsImageURL = (msgInput) => {
        const regex = /(https?:\/\/.*\.(?:png|jpg|gif))/gi;
        let mediaStartIndex = msgInput.search(regex)
        let imageURL = null;
        //if the index does not equal -1, that means it has an image url
        if (mediaStartIndex !== -1) {
            imageURL = msgInput.match(regex);
        }
        return imageURL;
    }

    //extracts img url out of string and then joins string back together
    filterMsg = (msgInput, imageURL) => {
        return msgInput.replace(imageURL, "")
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


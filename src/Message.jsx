import React, { Component } from 'react';

//individual messages that are sent out 
class Message extends Component {
    render() {
        return (
            <div className="message">
                I won't be impressed with technology until I can download food.
            </div>
        );
    }
}

//includes name change updates
class Notification extends Component {
    render() {
        return (
            <div className="Notification">
                Anonymous1 changed their name to nomnom.
            </div>
        );
    }
}

export default (Message, Notification);

import React from 'react';
import { format } from 'date-fns'
import {TimeMessageData} from '../message-data';
import './time-message.css';

export class TimeMessage extends React.Component<{message: TimeMessageData}> {
    render() {
        return (
            <p className={(this.props.message.direction === 'outgoing' ? 'response-time ' : '') + 'time'}>
                {format(this.props.message.dateTime, 'HH:mm')}
            </p>
        );
    }
}

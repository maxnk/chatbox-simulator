import React from 'react';
import { format } from 'date-fns'
import {DateMessageData} from '../message-data';

export class DateMessage extends React.Component<{message: DateMessageData}> {
    render() {
        return (
            <div className='date'>
                <hr />

                <p>
                    {format(this.props.message.dateTime, 'MMMM d')}
                </p>
            </div>
        );
    }
}

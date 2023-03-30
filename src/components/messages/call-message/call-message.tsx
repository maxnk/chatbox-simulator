import React from 'react';
import {CallMessageData} from '../message-data';
import './call-message.css';
import {TimeMessage} from '../time-message/time-message';

export class CallMessage extends React.Component<{ message: CallMessageData }> {
    render() {
        if (this.props.message.isMissed) {
            return (
                <>
                    <div className='message text-only'>
                        <div className={this.props.message.direction === 'outgoing' ? 'response' : ''}>
                            <div className='text call missed'>
                                <span className='icon material-symbols-outlined'>
                                    {this.props.message.direction === 'outgoing' ? 'call_missed_outgoing' : 'call_missed'}
                                </span>
                                <div className='content'>
                                    <div className='label'>Missed call</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <TimeMessage message={{
                        dateTime: this.props.message.dateTime,
                        direction: this.props.message.direction,
                        type: 'time'
                    }}/>
                </>
            );
        } else {
            return (
                <>
                    <div className='message text-only'>
                        <div className={this.props.message.direction === 'outgoing' ? 'response' : ''}>
                            <div className='text call accepted'>
                                <span className='icon material-symbols-outlined'>
                                    {this.props.message.direction === 'outgoing' ? 'call_made' : 'call_received'}
                                </span>
                                <div className='content'>
                                    <div className='label'>{this.props.message.direction === 'outgoing' ? 'Outgoing' : 'Incoming'} call</div>
                                    <div className='duration'>{this.props.message.duration}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <TimeMessage message={{
                        dateTime: this.props.message.dateTime,
                        direction: this.props.message.direction,
                        type: 'time'
                    }}/>
                </>
            );
        }
    }
}

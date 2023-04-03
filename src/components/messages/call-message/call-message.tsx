import React from 'react';
import './call-message.css';
import {TimeMessage} from '../time-message/time-message';
import {CallMessageData} from '../../../model/message';
import {chatStore} from '../../../stores/chat-store';
import {formatDuration} from 'date-fns';

export class CallMessage extends React.Component<{ message: CallMessageData }> {
    render() {
        const isOutgoing = this.props.message.user.id === chatStore.currentUser?.id;

        if (this.props.message.isMissed) {
            return (
                <>
                    <div className='message text-only'>
                        <div className={isOutgoing ? 'response' : ''}>
                            <div className='text call missed'>
                                <span className='icon material-symbols-outlined'>
                                    {isOutgoing ? 'call_missed_outgoing' : 'call_missed'}
                                </span>
                                <div className='content'>
                                    <div className='label'>Missed call</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <TimeMessage message={{
                        dateTime: this.props.message.dateTime,
                        direction: isOutgoing ? 'outgoing' : 'incoming',
                        type: 'time'
                    }}/>
                </>
            );
        } else {
            return (
                <>
                    <div className='message text-only'>
                        <div className={isOutgoing ? 'response' : ''}>
                            <div className='text call accepted'>
                                <span className='icon material-symbols-outlined'>
                                    {isOutgoing ? 'call_made' : 'call_received'}
                                </span>
                                <div className='content'>
                                    <div className='label'>{isOutgoing ? 'Outgoing' : 'Incoming'} call</div>
                                    {this.props.message.duration && <div className='duration'>{formatDuration({
                                        // pretend that call cannot be longer than 24 hours ;)
                                        hours: Math.floor(this.props.message.duration / 3600),
                                        minutes: Math.floor(this.props.message.duration / 60) % 60,
                                        seconds: this.props.message.duration % 60
                                    })}</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <TimeMessage message={{
                        dateTime: this.props.message.dateTime,
                        direction: isOutgoing ? 'outgoing' : 'incoming',
                        type: 'time'
                    }}/>
                </>
            );
        }
    }
}

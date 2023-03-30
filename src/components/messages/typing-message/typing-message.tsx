import React from 'react';

import './typing-message.css';
import {observer} from 'mobx-react';

@observer
export class TypingMessage extends React.Component {
    render() {
        return (
            <div className='message text-only'>
                <p className='text'>
                    <div className='typing'>
                        <div className='dot'></div>
                        <div className='dot'></div>
                        <div className='dot'></div>
                    </div>
                </p>
            </div>
        );
    }
}

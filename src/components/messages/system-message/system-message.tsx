import React from 'react';
import {observer} from 'mobx-react';
import {SystemMessageData} from '../../../model/message';

@observer
export class SystemMessage extends React.Component<{message: SystemMessageData }> {
    render() {
        return <div className='message system'>
            {this.props.message.text}
        </div>
    }
}

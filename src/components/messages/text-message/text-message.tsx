import React from 'react';
import {observer} from 'mobx-react';
import {chatStore} from '../../../stores/chat-store';
import TextMessageData from '../../../model/message';
import './text-message.css';

export interface TextMessageProps {
    message: TextMessageData;
    textOnly?: boolean;
}

@observer
export class TextMessage extends React.Component<TextMessageProps> {
    render() {
        if (this.props.message.user.id !== chatStore.currentUser!.id) {
            if (this.props.textOnly) {
                return (
                    <>
                        <div className='message text-only'>
                            {this.renderText()}
                        </div>
                    </>
                );
            } else {
                return (
                    <>
                        <div className='message'>
                            <div className='photo'
                                 style={{backgroundImage: `url('${this.props.message.user.avatarUrl}')`}}>
                                {this.props.message.user.online && <div className='online'></div>}
                            </div>
                            {this.renderText()}
                        </div>
                    </>
                );
            }
        } else {
            return (
                <>
                    <div className='message message-response text-only'>
                        <div className='response'>
                            {this.renderText()}
                        </div>
                    </div>
                </>
            );
        }
    }

    renderText() {
        return (<p className='text'>
            {this.props.message.imageUrl &&
                <div className='image'>
                    <img src={this.props.message.imageUrl} alt='screenshot'
                         onClick={() => chatStore.changeUrl(this.props.message.imageUrl!)}/>
                </div>
            }
            <div dangerouslySetInnerHTML={{__html: this.props.message.text}}></div>
        </p>);
    }
}

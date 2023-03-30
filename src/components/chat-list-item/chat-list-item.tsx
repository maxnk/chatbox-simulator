import React from 'react';
import {chatStore} from '../../stores/chat-store';
import {observer} from 'mobx-react';
import TimeAgo from 'timeago-react';
import {Chat} from '../../model/chat';
import {UserMessageData} from '../../model/message';

@observer
export class ChatListItem extends React.Component<{ chat: Chat, isActive: boolean }> {
    render() {
        const lastMessage = this.props.chat.getLastMessage();

        if (!lastMessage) {
            return null;
        }

        return (
            <div
                className={'discussion' + (this.props.isActive ? ' message-active': '')}
                onClick={() => chatStore.selectChat(this.props.chat.id)}>
                <span style={{display: 'none'}}>{chatStore.workaround}</span>
                <div className='photo'
                     style={{backgroundImage: `url('${this.props.chat.avatarUrl}')`}}>
                    {this.props.chat.isOnline() && <div className='online'></div>}

                    {this.props.chat.isGroup() && (lastMessage instanceof UserMessageData) && <div className='online avatar'>
                        <img src={(lastMessage as UserMessageData).user.avatarUrl}/>
                    </div>}
                </div>
                <div className='desc-contact'>
                    <p className='name'>{this.props.chat.title}</p>
                    <p className='message'>{lastMessage?.text ?? ''}</p>
                </div>
                <div className='meta'>
                    <div className='timer'>
                        <TimeAgo datetime={lastMessage.dateTime} locale='custom-locale'  />
                    </div>
                    {
                        this.props.chat.getUnreadMessagesCount() > 0 && <div className='unread'>
                            {this.props.chat.getUnreadMessagesCount()}
                        </div>
                    }
                </div>
            </div>
        );
    }
}

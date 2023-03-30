import React from 'react';
import {chatStore} from '../../stores/chat-store';
import {observer} from 'mobx-react';
import {Chat} from '../../model/chat';
import {ChatListItem} from '../chat-list-item/chat-list-item';

@observer
export class ChatList extends React.Component<{chats: Chat[], activeChat: Chat}> {
    render() {
        return (
            <section className='discussions'>
                <span style={{display: 'none'}}>{chatStore.workaround}</span>
                <div className='discussion search'>
                    <div className='searchbar'>
                        <i className='fa fa-search' aria-hidden='true'></i>
                        <input type='text' placeholder='Search...'></input>
                    </div>
                </div>

                {
                    this.props.chats.map((chat: Chat) => {
                        return <ChatListItem chat={chat} key={chat.id} isActive={chat.id === this.props.activeChat?.id} />;
                    })
                }
            </section>
        );
    }
}

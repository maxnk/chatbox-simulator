import React, {Component} from 'react';
import {DateMessage} from '../messages/date-message/date-message';
import {chatStore} from '../../stores/chat-store';
import {observer} from 'mobx-react';
import {FiUsers} from 'react-icons/fi';
import {FaEllipsisH} from 'react-icons/fa';
import TextMessageData, {CallMessageData, MessageData, SystemMessageData, UserMessageData} from '../../model/message';
import {TimeMessage} from '../messages/time-message/time-message';
import {TypingMessage} from '../messages/typing-message/typing-message';
import {TextMessage} from '../messages/text-message/text-message';
import {MessageForm} from '../message-form/message-form';
import {Chat} from '../../model/chat';
import {User} from '../../model/user';
import {SystemMessage} from '../messages/system-message/system-message';
import {CallMessage} from '../messages/call-message/call-message';

@observer
export class ChatContainer extends Component<{chat: Chat, currentUser: User}> {
    private readonly messagesContainer: React.RefObject<HTMLDivElement>;
    private readonly initialMessagesContainerHeight = 540;

    constructor(props: any) {
        super(props);

        this.messagesContainer = React.createRef();
    }

    render() {
        return (
            <section className='chat'>
                <span style={{display: 'none'}}>{chatStore.workaround}</span>
                <div className='header-chat'>
                    <div className='photo'
                         style={{backgroundImage: `url('${this.props.chat.avatarUrl}')`}}>
                        {this.props.chat.isOnline() && !this.props.chat.isGroup() &&
                            <div className='online'></div>}
                    </div>

                    <div className='title'>
                        <p className='name'>{this.props.chat.title}</p>
                        {this.props.chat.isGroup() &&
                            <p className='subtitle'>
                                <FiUsers/>
                                &nbsp;&nbsp;
                                {this.props.chat.users.length} members
                            </p>}
                    </div>
                    <FaEllipsisH className='icon clickable right'/>
                </div>
                <div className='messages-chat' ref={this.messagesContainer}>
                    {this.props.chat.showTyping && <TypingMessage />}

                    {
                        this.props.chat.messages.map((x, i) => {
                            const messages = this.props.chat.messages;
                            const prevMessage = i === 0 ? null : messages[i - 1];
                            const nextMessage = i === messages.length - 1 ? null : messages[i + 1];
                            const isIncoming = x instanceof UserMessageData && x.user.id !== this.props.currentUser!.id;

                            return <>
                                {x instanceof TextMessageData && this.getIsShowTime(prevMessage, x) &&
                                    <TimeMessage message={{
                                        type: 'time',
                                        direction: isIncoming ? 'incoming' : 'outgoing',
                                        dateTime: x.dateTime,
                                    }} ref={x.id}/>}

                                {x instanceof TextMessageData &&
                                    <TextMessage message={x} ref={x.id}/>}

                                {x instanceof SystemMessageData &&
                                    <SystemMessage message={x} ref={x.id}/>}

                                {x instanceof CallMessageData &&
                                    <CallMessage message={x} ref={x.id}/>}

                                {this.getIsShowDate(i, nextMessage, x) &&
                                    <DateMessage message={{
                                        type: 'date',
                                        dateTime: x.dateTime,
                                    }} ref={x.id}/>}
                            </>;
                        })
                    }
                </div>

                <MessageForm
                    onAutoresize={(delta) => {
                        if (!this.messagesContainer.current) {
                            return;
                        }

                        this.messagesContainer.current.style.height = this.initialMessagesContainerHeight - delta + 'px';
                        this.scrollToBottom();
                    }}
                />
            </section>
        );
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<{}>, snapshot?: any) {
        this.scrollToBottom();
    }

    // also see https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react
    scrollToBottom() {
        setTimeout(() => {
            this.messagesContainer.current?.scroll(0, 10000);
        }, 1);
    }

    private getIsShowDate(i: number, nextMessage: null | MessageData, x: MessageData) {
        return i === this.props.chat.messages.length - 1
            ||
            (
                nextMessage && nextMessage.dateTime.getDate() !== x.dateTime.getDate()
            );
    }

    private getIsShowTime(prevMessage: null | MessageData | TextMessageData, x: TextMessageData) {
        return prevMessage === null
            ||
            (
                prevMessage instanceof TextMessageData
                &&
                x.user.id === prevMessage.user.id
                &&
                ((prevMessage.dateTime.getTime() - x.dateTime.getTime()) > 3 * 60 * 1000)
            )
            ||
            (
                prevMessage instanceof TextMessageData
                &&
                x.user.id !== prevMessage.user.id
            );
    }
}

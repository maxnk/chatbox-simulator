import React from 'react';
import {chatStore} from '../../stores/chat-store';
import {observer} from 'mobx-react';
import {reaction} from 'mobx';

export interface MessageFormProps {
    onAutoresize?: (delta: number) => void;
}

@observer
export class MessageForm extends React.Component<MessageFormProps> {
    private readonly messageBox: React.RefObject<HTMLTextAreaElement>;
    private readonly formContainer: React.RefObject<HTMLDivElement>;
    private readonly initialMessageBoxHeight = 50;
    private readonly initialFormContainerHeight = 70;

    constructor(props: MessageFormProps) {
        super(props);

        this.messageBox = React.createRef();
        this.formContainer = React.createRef();

        reaction(() => chatStore.messageFormText, () => {
            this.messageBox.current?.focus();
        });
    }

    render() {
        return (
            <div className='footer-chat' ref={this.formContainer}>
                <i className='icon fa fa-smile-o clickable' style={{fontSize: '25pt'}} aria-hidden='true'></i>
                <textarea
                    className='write-message'
                    placeholder='Type your message here'
                    value={chatStore.messageFormText}
                    ref={this.messageBox}
                    onChange={(e) => {
                        chatStore.changeText(e.target.value);
                    }}
                    onInput={() => this.autosize()} />
                <i className='icon send fa fa-paper-plane-o clickable' aria-hidden='true'></i>
            </div>
        );
    }

    autosize() {
        if (!this.messageBox.current || !this.formContainer.current) {
            return;
        }

        this.messageBox.current.style.height = this.initialMessageBoxHeight + 'px';
        let newMessageBoxHeight = this.messageBox.current.scrollHeight;
        this.messageBox.current.style.height = newMessageBoxHeight + 'px';

        newMessageBoxHeight = Math.min(this.messageBox.current.scrollHeight, this.messageBox.current.clientHeight);

        this.formContainer.current.style.height = this.initialFormContainerHeight + 'px';
        this.formContainer.current.style.height = newMessageBoxHeight + (this.initialFormContainerHeight - this.initialMessageBoxHeight) + 'px';

        this.props.onAutoresize?.call(this, newMessageBoxHeight - this.initialMessageBoxHeight);
    }

    componentDidMount() {
        this.autosize();
    }

    componentDidUpdate(prevProps: Readonly<MessageFormProps>, prevState: Readonly<{}>, snapshot?: any) {
        this.autosize();
        this.messageBox.current?.scroll(0, 10000);
    }
}

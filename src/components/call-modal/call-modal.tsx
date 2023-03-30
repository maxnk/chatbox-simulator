import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import {FaPhone, FaPhoneSlash} from 'react-icons/fa';
import {observer} from 'mobx-react';
import './call-modal.css';
import {chatStore} from '../../stores/chat-store';
import {MdCallEnd} from 'react-icons/md';

@observer
export class CallModal extends React.Component<any, any> {
    render() {
        return (
            <>
                <Modal show={!!chatStore.callInfo} onHide={() => chatStore.endCall()} centered className='call-modal'>
                    <Modal.Header>
                        <Modal.Title>
                            {chatStore.callInfo?.direction === 'incoming' ? 'Incoming Call' : 'Outgoing Call'}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='d-flex flex-column align-items-center'>
                        <img src={chatStore.callInfo?.avatar} alt={chatStore.callInfo?.name}
                             className='rounded-avatar mb-3' width='128' height='128'/>
                        <h5 className='centered-text mb-3'>{chatStore.callInfo?.name}</h5>
                        <p className='text-muted centered-text mb-4'>
                            {chatStore.callInfo?.direction === 'incoming' ? 'is calling you...' : 'calling...'}
                        </p>
                    </Modal.Body>
                    <Modal.Footer className='d-flex justify-content-center'>
                        {chatStore.callInfo?.direction === 'incoming' &&
                            <>
                                <Button
                                    variant='danger'
                                    onClick={() => chatStore.endCall()}
                                    className='reject-button action-button'>
                                    <FaPhoneSlash size={24}/>
                                </Button>

                                <Button
                                    variant='success'
                                    onClick={() => chatStore.endCall()}
                                    className='accept-button action-button animated-pulse'>
                                    <FaPhone size={24}/>
                                </Button>
                            </>
                        }

                        {chatStore.callInfo?.direction === 'outgoing' &&
                            <Button
                                variant='danger'
                                onClick={() => chatStore.endCall()}
                                className='reject-button action-button animated-pulse'>
                                <MdCallEnd size={24}/>
                            </Button>
                        }
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

import React from 'react';
import {Modal} from 'react-bootstrap';
import {chatStore} from '../../stores/chat-store';
import {observer} from 'mobx-react';

@observer
export class ImageModal extends React.Component<any, any> {
    render() {
        return (
            <Modal dialogClassName='image-modal modal-dialog-centered' show={chatStore.imageUrl !== ''}
                   onHide={() => chatStore.changeUrl('')}>
                <Modal.Body>
                    <img src={chatStore.imageUrl} style={{width: '100%'}}/>
                </Modal.Body>
            </Modal>
        );
    }
}

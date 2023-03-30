import {ControlledAction} from './actions';
import {ChatStore} from '../../stores/chat-store';

export class PlayAudioAction extends ControlledAction {
    constructor(public path: string) {
        super();
    }

    run(chatStore: ChatStore, step: () => void) {
        chatStore.playAudio(this.path);

        step();
    }
}

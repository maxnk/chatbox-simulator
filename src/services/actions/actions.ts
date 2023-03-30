import {ChatStore} from '../../stores/chat-store';

export abstract class Action {
    abstract run(chatStore: ChatStore, next: () => void): void;
}

export abstract class ControlledAction extends Action {

}

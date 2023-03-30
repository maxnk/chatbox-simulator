import {Scenario} from './scenario';
import {InitAction} from '../actions/init-action';
import {IncomingMessageAction} from '../actions/incoming-message-action';
import {OutgoingMessageAction} from '../actions/outgoing-message-action';
import {ToggleTypingAction} from '../actions/toggle-typing-action';
import {WaitAction} from '../actions/wait-action';
import {SystemMessageAction} from '../actions/system-message-action';
import {WriteMessageAction} from '../actions/write-message-action';
import {IncomingCallAction} from '../actions/incoming-call-action';
import {EraseMessageAction} from '../actions/erase-message-action';
import {SendMessageAction} from '../actions/send-message-action';
import TextMessageData from '../../model/message';
import {ChatStore} from '../../stores/chat-store';
import {PlayAudioAction} from '../actions/play-audio-action';

export class ScenarioRunner {
    public isRunning: boolean = false;
    public isControlled: boolean = false;

    private currentActionIndex = 0;
    private currentScenario?: Scenario;

    constructor(public chatStore: ChatStore) {
    }

    reset() {
        this.isRunning = false;
        this.currentActionIndex = 0;
        this.isControlled = false;
        this.chatStore.changeText('');

        this.chatStore.changeScenarioRunning(false);
    }

    step(): void {
        if (!this.isRunning) {
            return;
        }

        const actions = this.isControlled ? this.currentScenario!.getControlledActions() : this.currentScenario!.getActions();
        if (this.currentActionIndex >= actions.length) {
            this.stop();

            return;
        }

        const action = actions[this.currentActionIndex];

        this.currentActionIndex++;

        if (action instanceof InitAction) {
            this.chatStore?.init((action as InitAction).chatboxData);
        }

        if (action instanceof IncomingMessageAction || action instanceof OutgoingMessageAction || action instanceof SystemMessageAction) {
            this.chatStore?.addMessage(action.chat, action.message);
            this.chatStore?.selectChat(action.chat.id);
        }

        if (action instanceof SendMessageAction) {
            this.chatStore?.addMessage(action.chat, new TextMessageData(
                'new-message',
                this.chatStore.messageFormText,
                new Date(),
                true,
                this.chatStore.currentUser!
            ));
            this.chatStore?.selectChat(action.chat.id);
            this.chatStore.changeText('');
        }

        if (action instanceof ToggleTypingAction) {
            this.chatStore?.toggleTyping(action.chat);
        }

        if (action instanceof IncomingCallAction) {
            this.chatStore?.startCall(action.user.avatarUrl!, action.user.name, 'incoming');
        }

        if (action instanceof PlayAudioAction) {
            this.chatStore?.playAudio(action.path);
        }

        if (!this.isControlled && action instanceof WaitAction) {
            setTimeout(
                () => this.step(),
                (action as WaitAction).duration
            );

            return;
        }

        if (!this.isControlled && action instanceof WriteMessageAction) {
            const writeAction = (action as WriteMessageAction);

            this.chatStore?.write(writeAction.text, writeAction.timePerSymbol);

            setTimeout(
                () => this.step(),
                writeAction.text.length * (writeAction.timePerSymbol / 2)
            );

            return;
        }

        if (!this.isControlled && action instanceof EraseMessageAction) {
            const eraseAction = (action as EraseMessageAction);

            this.chatStore?.erase(eraseAction.timePerSymbol);

            setTimeout(
                () => this.step(),
                this.chatStore.messageFormText.length * (eraseAction.timePerSymbol)
            );

            return;
        }

        if (!this.isControlled) {
            this.step();

            return;
        }
    }

    start(scenario: Scenario, isControlled: boolean = false) {
        if (this.isRunning) {
            return;
        }

        this.reset();

        this.isRunning = true;
        this.isControlled = isControlled;
        this.currentScenario = scenario;
        this.chatStore.changeScenarioRunning(true);

        this.step();
    }

    stop() {
        this.reset();

        this.currentScenario = undefined;
    }
}

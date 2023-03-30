import {Scenario} from './scenario';
import {ChatStore} from '../../stores/chat-store';

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

        action.run(this.chatStore, () => this.step());

        // if (!this.isControlled && action instanceof WaitAction) {
        //     setTimeout(
        //         () => this.step(),
        //         (action as WaitAction).duration
        //     );
        //
        //     return;
        // }

        // if (!this.isControlled && action instanceof WriteMessageAction) {
        //     const writeAction = (action as WriteMessageAction);
        //
        //     this.chatStore?.write(writeAction.text, writeAction.timePerSymbol);
        //
        //     setTimeout(
        //         () => this.step(),
        //         writeAction.text.length * (writeAction.timePerSymbol / 2)
        //     );
        //
        //     return;
        // }

        // if (!this.isControlled && action instanceof EraseMessageAction) {
        //     const eraseAction = (action as EraseMessageAction);
        //
        //     this.chatStore?.erase(eraseAction.timePerSymbol);
        //
        //     setTimeout(
        //         () => this.step(),
        //         this.chatStore.messageFormText.length * (eraseAction.timePerSymbol)
        //     );
        //
        //     return;
        // }

        // if (!this.isControlled) {
        //     this.step();
        //
        //     return;
        // }
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

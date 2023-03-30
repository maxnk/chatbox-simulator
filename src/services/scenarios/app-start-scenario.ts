import {FakeGenerator} from '../fake-generator';
import {Scenario} from './scenario';

export class AppStartScenario extends Scenario {
    constructor() {
        super();

        let chatboxData = FakeGenerator.initialChatboxData();

        this.builder
            .init(chatboxData);
    }
}

import {ScenarioBuilder} from './scenario-builder';
import {ControlledAction} from '../actions/actions';

export abstract class Scenario {
    protected readonly builder: ScenarioBuilder;

    protected constructor() {
        this.builder = new ScenarioBuilder();
    }

    public getActions() {
        return this.builder.actions;
    }

    public getControlledActions() {
        return this.builder.actions.filter(x => x instanceof ControlledAction);
    }
}

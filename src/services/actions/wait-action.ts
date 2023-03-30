import {Action} from './actions';

export class WaitAction extends Action {
    constructor(public duration: number) {
        super();
    }
}

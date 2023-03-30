import {Action} from './actions';

export class EraseMessageAction extends Action {
    constructor(public timePerSymbol: number) {
        super();
    }
}

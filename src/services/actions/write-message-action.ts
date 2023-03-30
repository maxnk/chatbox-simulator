import {Action} from './actions';

export class WriteMessageAction extends Action {
    constructor(public text: string, public timePerSymbol: number) {
        super();
    }
}

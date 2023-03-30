import {ControlledAction} from './actions';

export class PlayAudioAction extends ControlledAction {
    constructor(public path: string) {
        super();
    }
}

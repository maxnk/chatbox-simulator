import React, { Component } from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import { MdPlayArrow, MdPause, MdStop, MdNavigateNext, MdNavigateBefore } from 'react-icons/md';

export type ControlPanelProps = {
    isRunning: boolean;
    onStartPause: () => void;
    onStop: () => void;
    onPrevStep: () => void;
    onNextStep: () => void;
};

type ControlPanelState = {};

export class ControlPanel extends Component<ControlPanelProps, ControlPanelState> {
    render() {
        const { isRunning, onStartPause, onStop, onPrevStep, onNextStep } = this.props;

        return (
            <ButtonGroup>
                <Button onClick={onStartPause}>
                    {isRunning ? <MdPause /> : <MdPlayArrow />}
                </Button>
                <Button onClick={onStop}><MdStop /></Button>
                <Button onClick={onPrevStep}><MdNavigateBefore /></Button>
                <Button onClick={onNextStep}><MdNavigateNext /></Button>
            </ButtonGroup>
        );
    }
}

export default ControlPanel;

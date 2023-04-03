import React from 'react';
import {chatStore} from '../../stores/chat-store';
import {observer} from 'mobx-react';
import {Button} from 'react-bootstrap';
import {ScenarioRunner} from '../../services/scenarios/scenario-runner';
import {HelloScenario} from '../../services/scenarios/hello-scenario';
import {AppStartScenario} from '../../services/scenarios/app-start-scenario';
import {MicroScreenshotScenario} from '../../services/scenarios/micro-screenshot-scenario';
import {NoReplyScenario} from '../../services/scenarios/no-reply-scenario';
import {ChatContainer} from '../chat-container/chat-container';
import {ChatList} from '../chat-list/chat-list';
import {ImageModal} from '../image-modal/image-modal';
import {CallModal} from '../call-modal/call-modal';
import ControlPanel from '../control-panel/control-panel';
import {HelloCallScenario} from '../../services/scenarios/hello-call-scenario';
import {CalmDownScenario} from '../../services/scenarios/calm-down-scenario';
import {CookingPotScenario} from '../../services/scenarios/cooking-pot-scenario';
import {ForeplayScenario} from '../../services/scenarios/foreplay-scenario';
import {LastQuestionScenario} from '../../services/scenarios/last-question-scenario';
import { reaction } from 'mobx';
import {UdpScenario} from '../../services/scenarios/udp-scenario';
import {RedirectScenario} from '../../services/scenarios/redirect-scenario';
import {CoupleMinutesScenario} from '../../services/scenarios/couple-minutes-scenario';

@observer
export class MainContainer extends React.Component<any> {
    private readonly scenarioRunner: ScenarioRunner;

    constructor(props: any) {
        super(props);

        this.scenarioRunner = new ScenarioRunner(chatStore);
        this.scenarioRunner.start(new AppStartScenario());

        reaction(() => chatStore.audioPlayCounter, () => {
            const audio = new Audio(chatStore.audioPath);
            audio.loop = false;
            audio.play();
        });
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <ChatList chats={chatStore.chats} activeChat={chatStore.activeChat!}/>
                    <ChatContainer chat={chatStore.activeChat!} currentUser={chatStore.currentUser!} />
                </div>
                {/*<div className='row'>*/}
                {/*    <div className='col-2'>*/}
                {/*        <ControlPanel*/}
                {/*            isRunning={false}*/}
                {/*            onNextStep={() => {*/}
                {/*                this.scenarioRunner.step();*/}
                {/*            }}*/}
                {/*            onPrevStep={() => {}}*/}
                {/*            onStartPause={() => {}}*/}
                {/*            onStop={() => {}}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<br />*/}
                {/*<div className='row'>*/}
                {/*    <div className='col-2'>*/}
                {/*        <Button onClick={() => {*/}
                {/*            chatStore.startCall('/assets/ava.png', 'John Doe', 'incoming');*/}
                {/*        }}>in call</Button>*/}
                {/*        <Button onClick={() => {*/}
                {/*            chatStore.startCall('/assets/ava.png', 'John Doe', 'outgoing');*/}
                {/*        }}>out call</Button>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <br />
                <div className='row'>
                    <div className={'col-12'}>
                        <Button disabled={chatStore.isScenarioRunning} onClick={() => {
                            this.scenarioRunner.start(new HelloScenario());
                        }}>{HelloScenario.NAME}</Button>
                        <Button disabled={chatStore.isScenarioRunning} onClick={() => {
                            this.scenarioRunner.start(new MicroScreenshotScenario());
                        }}>{MicroScreenshotScenario.NAME}</Button>
                        <Button disabled={chatStore.isScenarioRunning} onClick={() => {
                            this.scenarioRunner.start(new NoReplyScenario());
                        }}>{NoReplyScenario.NAME}</Button>
                        <Button disabled={chatStore.isScenarioRunning} onClick={() => {
                            this.scenarioRunner.start(new HelloCallScenario());
                        }}>{HelloCallScenario.NAME}</Button>
                        <Button disabled={chatStore.isScenarioRunning} onClick={() => {
                            this.scenarioRunner.start(new CalmDownScenario());
                        }}>{CalmDownScenario.NAME}</Button>
                        <Button disabled={chatStore.isScenarioRunning} onClick={() => {
                            this.scenarioRunner.start(new CookingPotScenario());
                        }}>{CookingPotScenario.NAME}</Button>
                        <Button disabled={chatStore.isScenarioRunning} onClick={() => {
                            this.scenarioRunner.start(new ForeplayScenario());
                        }}>{ForeplayScenario.NAME}</Button>
                        <Button disabled={chatStore.isScenarioRunning} onClick={() => {
                            this.scenarioRunner.start(new LastQuestionScenario());
                        }}>{LastQuestionScenario.NAME}</Button>
                        <Button disabled={chatStore.isScenarioRunning} onClick={() => {
                            this.scenarioRunner.start(new UdpScenario());
                        }}>{UdpScenario.NAME}</Button>
                        <Button disabled={chatStore.isScenarioRunning} onClick={() => {
                            this.scenarioRunner.start(new RedirectScenario());
                        }}>{RedirectScenario.NAME}</Button>
                        <Button disabled={chatStore.isScenarioRunning} onClick={() => {
                            this.scenarioRunner.start(new CoupleMinutesScenario());
                        }}>{CoupleMinutesScenario.NAME}</Button>
                    </div>
                </div>
                <ImageModal/>
                <CallModal/>
            </div>
        );
    }
}

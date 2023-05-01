import React from 'react';
import {chatStore} from '../../stores/chat-store';
import {observer} from 'mobx-react';
import {Button} from 'react-bootstrap';
import {ScenarioRunner} from '../../services/scenarios/scenario-runner';
import {AppStartScenario} from '../../services/scenarios/app-start-scenario';
import {ChatContainer} from '../chat-container/chat-container';
import {ChatList} from '../chat-list/chat-list';
import {ImageModal} from '../image-modal/image-modal';
import {CallModal} from '../call-modal/call-modal';
import {reaction} from 'mobx';
import {withRouter, WithRouterProps} from '../../utils/withRouter';
import {ScenariosData} from '../../services/scenarios/scenarios-data';

@observer
class MainContainer extends React.Component<WithRouterProps<any>> {
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
          <ChatContainer chat={chatStore.activeChat!} currentUser={chatStore.currentUser!}/>
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
        <br/>
        {this.props.params.currentScenario && <Button disabled={chatStore.isScenarioRunning} onClick={() => {
          const scenario = ScenariosData.getScenarioByCodename(this.props.params.currentScenario);
          if (!scenario) {
            return;
          }
          this.scenarioRunner.start(scenario);
        }}>Play</Button>}

        {!this.props.params.currentScenario && <div className='row'>
          <div className={'col-12'}>
            {
              ScenariosData.data.map((scenario, index) => {
                return <Button key={index} disabled={chatStore.isScenarioRunning} onClick={() => {
                  this.props.navigate('/scenario/' + scenario.codename);

                  // this.scenarioRunner.start(scenario.factory());
                }}>{scenario.name}</Button>;
              })
            }
          </div>
        </div>
        }
        <ImageModal/>
        <CallModal/>
      </div>
    );
  }
}

export default withRouter<any>(MainContainer);

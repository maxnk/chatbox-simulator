import {Scenario} from './scenario';
import {HelloScenario} from './hello-scenario';
import {CalmDownScenario} from './calm-down-scenario';
import {CookingPotScenario} from './cooking-pot-scenario';
import {CoupleMinutesScenario} from './couple-minutes-scenario';
import {DebtCollectorScenario} from './debt-collector-scenario';
import {ForeplayScenario} from './foreplay-scenario';
import {HelloCallScenario} from './hello-call-scenario';
import {LastQuestionScenario} from './last-question-scenario';
import {MicroScreenshotScenario} from './micro-screenshot-scenario';
import {MultiHelloScenario} from './multi-hello-scenario';
import {NewChat13Scenario} from './new-chat-13-scenario';
import {NoReplyScenario} from './no-reply-scenario';
import {RedirectScenario} from './redirect-scenario';
import {UdpScenario} from './udp-scenario';

export class ScenariosData {
  public static readonly data: { name: string, codename: string, factory: () => Scenario }[] = [
    {
      name: CalmDownScenario.NAME,
      codename: CalmDownScenario.CODENAME,
      factory: () => new CalmDownScenario()
    },
    {
      name: CookingPotScenario.NAME,
      codename: CookingPotScenario.CODENAME,
      factory: () => new CookingPotScenario()
    },
    {
      name: CoupleMinutesScenario.NAME,
      codename: CoupleMinutesScenario.CODENAME,
      factory: () => new CoupleMinutesScenario()
    },
    {
      name: DebtCollectorScenario.NAME,
      codename: DebtCollectorScenario.CODENAME,
      factory: () => new DebtCollectorScenario()
    },
    {
      name: ForeplayScenario.NAME,
      codename: ForeplayScenario.CODENAME,
      factory: () => new ForeplayScenario()
    },
    {
      name: HelloScenario.NAME,
      codename: HelloScenario.CODENAME,
      factory: () => new HelloScenario()
    },
    {
      name: HelloCallScenario.NAME,
      codename: HelloCallScenario.CODENAME,
      factory: () => new HelloCallScenario()
    },
    {
      name: LastQuestionScenario.NAME,
      codename: LastQuestionScenario.CODENAME,
      factory: () => new LastQuestionScenario()
    },
    {
      name: MicroScreenshotScenario.NAME,
      codename: MicroScreenshotScenario.CODENAME,
      factory: () => new MicroScreenshotScenario()
    },
    {
      name: MultiHelloScenario.NAME,
      codename:MultiHelloScenario.CODENAME,
      factory: () => new MultiHelloScenario()
    },
    {
      name: NewChat13Scenario.NAME,
      codename: NewChat13Scenario.CODENAME,
      factory: () => new NewChat13Scenario()
    },
    {
      name: NoReplyScenario.NAME,
      codename: NoReplyScenario.CODENAME,
      factory: () => new NoReplyScenario()
    },
    {
      name: RedirectScenario.NAME,
      codename: RedirectScenario.CODENAME,
      factory: () => new RedirectScenario()
    },
    {
      name: UdpScenario.NAME,
      codename: UdpScenario.CODENAME,
      factory: () => new UdpScenario()
    }
  ];

  public static getScenarioByCodename(codename: string): Scenario | null {
    const scenario = this.data.find(s => s.codename === codename);
    return scenario ? scenario.factory() : null;
  }
}

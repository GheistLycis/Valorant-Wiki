import { Component } from '@angular/core';
import { Agent } from '@interfaces/agent.interface';
import { AgentService } from '@services/agent.service';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss']
})
export class AgentsComponent {

  constructor(public agentService: AgentService) {}

  trackByFn(i: number, agent: Agent): string {
    return agent.uuid
  }
}

import { Component } from '@angular/core';
import { Agent } from '@interfaces/agent.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgentService } from '@services/agent.service';
import { AgentDetailsComponent } from './components/agent-details/agent-details.component';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss']
})
export class AgentsComponent {

  constructor(
    public agentService: AgentService,
    private modalService: NgbModal
  ) { }

  trackByFn(i: number, agent: Agent): string {
    return agent.uuid
  }

  openDetailsModal(agent: Agent): void {
    const { componentInstance } = this.modalService.open(AgentDetailsComponent, { size: 'xl' })

    componentInstance.agent = agent
  }
}

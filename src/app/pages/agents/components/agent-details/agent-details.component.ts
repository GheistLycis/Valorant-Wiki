import { Component, Input } from '@angular/core';
import { Agent } from '@interfaces/agent.interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-agent-details',
  templateUrl: './agent-details.component.html',
  styleUrls: ['./agent-details.component.scss']
})
export class AgentDetailsComponent {
  @Input() agent!: Agent
  activeSkill?: Agent['abilities'][0]

  constructor(public activeModal: NgbActiveModal) {}
}

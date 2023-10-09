import { Component, Input, OnInit } from '@angular/core';
import { Agent } from '@interfaces/agent.interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-agent-details',
  templateUrl: './agent-details.component.html',
  styleUrls: ['./agent-details.component.scss']
})
export class AgentDetailsComponent implements OnInit {
  @Input() agent!: Agent

  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit(): void {

  }
}

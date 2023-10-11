import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Agent } from '@interfaces/agent.interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { fromEvent, throttleTime } from 'rxjs';

@Component({
  selector: 'app-agent-details',
  templateUrl: './agent-details.component.html',
  styleUrls: ['./agent-details.component.scss']
})
export class AgentDetailsComponent implements AfterViewInit {
  @ViewChild('portrait') portrait!: ElementRef<HTMLImageElement>
  @ViewChild('info') info!: ElementRef<HTMLDivElement>
  @Input() agent!: Agent
  activeSkill?: Agent['abilities'][0]
  portraitOffset!: { x: string, y: string }
  infoOffset!: { x: string, y: string }

  constructor(public activeModal: NgbActiveModal) {
    this.portraitOffset = { x: '0px', y: '0px' }
    this.infoOffset = { x: '0px', y: '0px' }
  }

  ngAfterViewInit(): void {
    const { innerWidth, innerHeight } = window
    function withinBounds (point: number, bounds: number) {
      return point > .1*bounds && point < .9*bounds
    } 
    function getOffset (point: number, bounds: number, multi = 1, direction: 1 | -1 = 1) {
      return direction*(40*multi)*((point / bounds) - .5) + 'px'
    } 

    fromEvent<MouseEvent>(document, 'mousemove').pipe(
      throttleTime(33.3), // 30fps animation
    ).subscribe((({ clientX, clientY }) => {
      if(withinBounds(clientX, innerWidth)) {
        this.portraitOffset.x = getOffset(clientX, innerWidth, 1.5, 1)
        this.infoOffset.x = getOffset(clientX, innerWidth, 0.5, -1)
      }
      if(withinBounds(clientY, innerHeight)) {
        this.portraitOffset.y = getOffset(clientY, innerHeight)
        this.infoOffset.y = getOffset(clientY, innerHeight, 0.5, -1)
      }
    }))
  }
}

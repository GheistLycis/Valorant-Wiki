import { Component, WritableSignal, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Agent } from '@interfaces/agent.interface';
import { SortEvent } from '@interfaces/sort-event.interface';
import { AgentService } from '@services/agent.service';
import { Observable, Subject, combineLatest, debounceTime, distinctUntilChanged, map, startWith, tap } from 'rxjs';

@Component({
  selector: 'app-agents-filters',
  templateUrl: './agents-filters.component.html',
  styleUrls: ['./agents-filters.component.scss']
})
export class AgentsFiltersComponent {
  $expanded!: WritableSignal<boolean>
  agents$!: Observable<Agent[]>
  search$!: Subject<Agent[]>
  selected$!: Subject<Agent['uuid'][]>
  sort$!: Subject<SortEvent>
  filteredAgents$!: Observable<Agent[]>

  constructor(private agentService: AgentService) {
    this.$expanded = signal(false)
    this.agents$ = agentService.list().pipe(tap(v => console.log(v)))
    this.search$ = new Subject()
    this.selected$ = new Subject()
    this.sort$ = new Subject()
    this.filteredAgents$ = combineLatest({
      agents: this.agents$,
      searched: this.search$.pipe(
        startWith([] as Agent[]),
        debounceTime(300),
        distinctUntilChanged(),
        map(agents => agents.map(({ uuid }) => uuid)),
      ),
      selected: this.selected$.pipe(
        startWith([] as string[]),
      ),
      sort: this.sort$.pipe(
        startWith(undefined),
      ),
    }).pipe(
      map(({ agents, searched, selected, sort }) => agents
        .filter(({ uuid }) => {
          if(selected.length) return selected.includes(uuid)
          if(searched.length) return searched.includes(uuid)
          else return true
        })
        .sort((a, b) => {
          if(!sort || sort.order == '') {
            return a.displayName < b.displayName ? -1 : 1
          }
          else {
            const value = sort.order == 'ASC' ? -1 : 1 

            switch(sort.sort as 'name' | 'role') {
              case 'name':
                return (a.displayName) < (b.displayName) ? value : -value
                
              case 'role':
                return (a.role.displayName) < (b.role.displayName) ? value : -value
            }
          }
        })
      ),
    )

    this.filteredAgents$.pipe(
      takeUntilDestroyed(),
    ).subscribe(list => agentService.$filteredAgents.set(list))
  }

  groupByFn(agent: Agent): string {
    return (agent.role.displayName).toUpperCase()
  }

  groupValueFn(groupKey: string, children: Agent[]): string[] {
    return children.map(({ uuid }) => uuid)
  }
}

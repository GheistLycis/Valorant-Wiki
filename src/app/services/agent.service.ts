import { Injectable } from "@angular/core"
import { Agent } from "@interfaces/agent.interface"
import { ApiService } from "./api.service"
import { apiLangs } from "../types/api-langs.type"
import { BehaviorSubject, Observable, iif, of, tap } from "rxjs"


@Injectable({
    providedIn: 'root'
})
export class AgentService {
    apiEndpoint!: string
    cachedAgents!: Agent[]
    filteredAgents$!: BehaviorSubject<Agent[]>

    constructor(private api: ApiService) {
        this.apiEndpoint = 'agents'
        this.cachedAgents = []
        this.filteredAgents$ = new BehaviorSubject([] as Agent[])
    }

    get(id: string, caching = true, language?: apiLangs): Observable<Agent> {
        return iif(
            () => caching && this.cachedAgents.length > 0,
            of(this.cachedAgents.find(({ uuid }) => uuid == id)!),
            this.api.get<Agent>(this.apiEndpoint, id, language)
        )
    }

    list(caching = true, language?: apiLangs): Observable<Agent[]> {
        return iif(
            () => caching && this.cachedAgents.length > 0,
            of(this.cachedAgents),
            this.api.list<Agent>(this.apiEndpoint, language, { isPlayableCharacter: true }).pipe(
                tap(agents => this.cachedAgents = agents),
            )
        )
    }
}
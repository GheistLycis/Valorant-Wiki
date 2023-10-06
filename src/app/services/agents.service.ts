import { Injectable, WritableSignal, signal } from "@angular/core"
import { Agent } from "@interfaces/agent.interface"
import { ApiService } from "./api.service"
import { apiLangs } from "../types/api-langs.type"
import { Observable, iif, of, tap } from "rxjs"


@Injectable({
    providedIn: 'root'
})
export class WeaponService {
    apiEndpoint!: string
    cachedAgents!: Agent[]
    $filteredAgents!: WritableSignal<Agent[] | undefined>

    constructor(private api: ApiService) {
        this.apiEndpoint = 'agents'
        this.cachedAgents = []
        this.$filteredAgents = signal(undefined)
    }

    get(id: string, language?: apiLangs): Observable<Agent> {
        return iif(
            () => this.cachedAgents.length > 0,
            of(this.cachedAgents.find(({ uuid }) => uuid == id)!),
            this.api.get<Agent>(this.apiEndpoint, id, language)
        )
    }

    list(language?: apiLangs): Observable<Agent[]> {
        return iif(
            () => this.cachedAgents.length > 0,
            of(this.cachedAgents),
            this.api.list<Agent>(this.apiEndpoint, language, { isPlayableCharacter: true }).pipe(
                tap(agents => this.cachedAgents = agents),
            )
        )
    }
}
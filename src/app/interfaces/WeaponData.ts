import { Weapon } from "./Weapon"
import { Observable } from "rxjs"

export interface WeaponData {
    weapon: Weapon
    skins: { 
        name: string
        src$: Observable<string> 
    }[] 
}
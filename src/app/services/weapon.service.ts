import { Injectable } from '@angular/core';
import { apiLangs } from '../types/apiLangs';
import { Weapon } from '@interfaces/Weapon';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class WeaponService {
  endpoint = 'weapons'

  constructor(private api: ApiService) {}

  get(id: string, language?: apiLangs) {
    return this.api.get<Weapon>(this.endpoint, id, language)
  }

  list(language?: apiLangs) {
    return this.api.list<Weapon>(this.endpoint, language)
  }
}

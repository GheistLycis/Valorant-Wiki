import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { apiLangs } from '../types/apiLangs';
import { Spray } from '@interfaces/Spray';

@Injectable({
  providedIn: 'root'
})
export class SprayService {
  endpoint = 'sprays'

  constructor(private api: ApiService) {}

  get(id: string, language?: apiLangs) {
    return this.api.get<Spray>(this.endpoint, id, language)
  }

  list(language?: apiLangs) {
    return this.api.list<Spray>(this.endpoint, language)
  }

  getMedia(path: string) {
    return this.api.getMedia(path)
  }
}

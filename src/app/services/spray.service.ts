import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { apiLangs } from '../types/api-langs.type';
import { Spray } from '@interfaces/spray.interface';

@Injectable({
  providedIn: 'root'
})
export class SprayService {
  apiEndpoint!: string

  constructor(private api: ApiService) {
    this.apiEndpoint = 'sprays'
  }

  get(id: string, language?: apiLangs) {
    return this.api.get<Spray>(this.apiEndpoint, id, language)
  }

  list(language?: apiLangs) {
    return this.api.list<Spray>(this.apiEndpoint, language)
  }

  getMedia(path: string) {
    return this.api.getMedia(path)
  }
}

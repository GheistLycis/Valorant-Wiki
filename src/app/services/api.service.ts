import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiLangs } from '../types/api-langs.type';
import { ApiResponse as Res } from '@interfaces/api-response.interface';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl!: string
  mediaApiUrl!: string
  defaultLang!: apiLangs

  constructor(private http: HttpClient) {
    this.apiUrl = 'https://valorant-api.com/v1'
    this.mediaApiUrl = 'https://media.valorant-api.com'
    this.defaultLang = 'en-US'
  }

  get<T>(endpoint: string, id: string, language = this.defaultLang, extras?: Object) {
    return this.http
      .get<Res<T>>(`${this.apiUrl}/${endpoint}/${id}?language=${language}${this.queryMaker(extras)}`)
      .pipe(map(({ data }) => data))
  }

  list<T>(endpoint: string, language = this.defaultLang, extras?: Object) {
    return this.http
      .get<Res<T[]>>(`${this.apiUrl}/${endpoint}?language=${language}${this.queryMaker(extras)}`)
      .pipe(map(({ data }) => data))
  }

  getMedia(endpoint: string) {
    return this.http
      .get(endpoint, { responseType: 'blob' })
      .pipe(map(blob => URL.createObjectURL(blob)))
  }

  private queryMaker(query?: Object): string {
    if(!query) return ''
    
    return '&' + Object.entries(query)
      .filter(([ key, val ]) => {
        if(Array.isArray(val)) return val.length
        if(val == 0) return true
        else return val
      })
      .map(([ key, val ]) => key + '=' + val)
      .join('&')
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiLangs } from '../types/apiLangs';
import { ApiResponse as Res } from '@interfaces/ApiResponse';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = 'https://valorant-api.com/v1'
  defaultLang: apiLangs = 'en-US'

  constructor(private http: HttpClient) {}

  get<T>(endpoint: string, id: string, language = this.defaultLang) {
    return this.http
      .get<Res<T>>(`${this.apiUrl}/${endpoint}/${id}?language=${language}`)
      .pipe(map(({ data }) => data))
  }

  list<T>(endpoint: string, language = this.defaultLang) {
    return this.http
      .get<Res<T[]>>(`${this.apiUrl}/${endpoint}?language=${language}`)
      .pipe(map(({ data }) => data))
  }
}

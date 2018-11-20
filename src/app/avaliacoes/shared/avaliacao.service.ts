import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Avaliacao } from './avaliacao.model';

@Injectable()
export class AvaliacaoService {

  constructor(
    private http: HttpClient
  ) { }

  get(identifier?: string): Observable<Avaliacao[]> {
    const url = '/evaluations/' + (identifier ? identifier : '');
    return this.http.get<Avaliacao[]>(url);
  }

  post(month: string, year: string, scale: number, reason: string): Observable<any> {
    const url = '/evaluations';
    const body = {month: month, year: year, scale: scale, reason: reason};
    return this.http.post<any>(url, body);
  }

  put(identifier: string, month: string, year: string, scale: number, reason: string): Observable<any> {
    const url = '/evaluations';
    const body = {month: month, year: year, scale: scale, reason: reason};
    return this.http.put<any>(url, body);
  }

  delete(identifier: string) {
    const url = '/evaluations/' + (identifier ? identifier : '');
    return this.http.delete<any>(url);
  }

}

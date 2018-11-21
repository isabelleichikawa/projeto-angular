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

  post(avaliacao: any): Observable<any> {
    const url = '/evaluations';
    return this.http.post<any>(url, avaliacao);
  }

  put(identifier: string, month: string, year: string, scale: number, reason: string, customers: []) {
    const url = '/evaluations/' + (identifier ? identifier : '');
    const body = {identifier: identifier, month: month, year: year, scale: scale, reason: reason, customers: customers};
    return this.http.put<any>(url, body);
  }

  delete(identifier: string) {
    const url = '/evaluations/' + (identifier ? identifier : '');
    return this.http.delete<any>(url);
  }

}

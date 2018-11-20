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

  put(avaliacao: any): Observable<any> {
    const url = '/evaluations';
    return this.http.put<any>(url, avaliacao);
  }

  delete(identifier: string) {
    const url = '/evaluations/' + (identifier ? identifier : '');
    return this.http.delete<any>(url);
  }

}

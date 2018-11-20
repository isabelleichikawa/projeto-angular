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

//   post(customer: string, contactCustomer: string, date: Date): Observable<any> {
//     const url = '/customers';
//     const body = {customer: customer, contactCustomer: contactCustomer, date: date};
//     return this.http.post<any>(url, body);
//   }

//   put(identifier: string, customer: string, contactCustomer: string, date: Date) {
//     const url = '/customers/' + (identifier ? identifier : '');
//     const body = {customer: customer, contactCustomer: contactCustomer, date: date};
//     return this.http.put<any>(url, body);
//   }

//   delete(identifier: string) {
//     const url = '/customers/' + (identifier ? identifier : '');
//     return this.http.delete<any>(url);
//   }

}

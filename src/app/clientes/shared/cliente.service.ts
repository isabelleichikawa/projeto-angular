import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Cliente } from './cliente.model';

@Injectable()
export class ClienteService {

  constructor(
    private http: HttpClient
  ) { }

  get(identifier?: string): Observable<Cliente[]> {
    const url = '/customers/' + (identifier ? identifier : '');
    return this.http.get<Cliente[]>(url);
  }

  post(customer: string, contactCustomer: string, date: Date): Observable<any> {
    const url = '/customers';
    const body = {customer: customer, contact_customer: contactCustomer, date: date};
    return this.http.post<any>(url, body);
  }

  put(identifier: string, customer: string, contactCustomer: string, date: Date) {
    const url = '/customers/' + (identifier ? identifier : '');
    const body = {customer: customer, contact_customer: contactCustomer, date: date};
    return this.http.put<any>(url, body);
  }

  delete(identifier: string) {
    const url = '/customers/' + (identifier ? identifier : '');
    return this.http.delete<any>(url);
  }

}

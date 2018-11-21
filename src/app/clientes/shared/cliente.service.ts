import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  post(cliente: any, category: string): Observable<any> {
    const url = '/customers';
    const body = {customer: cliente.customer, contactCustomer: cliente.contactCustomer, date: cliente.date, category: category};
    return this.http.post<any>(url, body);
  }

  put(identifier: string, cliente: any, category: string) {
    const url = '/customers/' + (identifier ? identifier : '');
    const body = {customer: cliente.customer, contactCustomer: cliente.contactCustomer, date: cliente.date, category: category};
    return this.http.put<any>(url, body);
  }

  delete(identifier: string) {
    const url = '/customers/' + (identifier ? identifier : '');
    return this.http.delete<any>(url);
  }

}

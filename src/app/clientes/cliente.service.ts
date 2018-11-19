import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Cliente } from './novo-cliente/cliente.model';

@Injectable()
export class ClienteService {

  constructor(
    private http: HttpClient
  ) { }

  get(identifier?: string): Observable<Cliente[]> {
    const url = '/customers/' + (identifier ? identifier : '');
    return this.http.get<Cliente[]>(url);
  }

}

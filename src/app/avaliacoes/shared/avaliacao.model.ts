import { Cliente } from 'src/app/clientes/shared/cliente.model';

export interface Avaliacao {
    id: string;
    month: string;
    year: string;
    customers: Cliente[];
    customersFormated: string;
    nps: number;
}

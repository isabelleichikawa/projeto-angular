import { Cliente } from 'src/app/clientes/shared/cliente.model';

export interface Avaliacao {
    id: string;
    month: number;
    monthFormated: string;
    year: number;
    customers: Cliente[];
    customersFormated: string;
    nps: number;
    colorNPS: string;
}

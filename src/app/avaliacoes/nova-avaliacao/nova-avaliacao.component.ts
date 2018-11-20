import { Component, OnInit, Inject, NgZone, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSelect } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Avaliacao } from '../shared/avaliacao.model';
import { AvaliacaoService } from '../shared/avaliacao.service';
import { ClienteService } from 'src/app/clientes/shared/cliente.service';

@Component({
  selector: 'app-nova-avaliacao',
  templateUrl: './nova-avaliacao.component.html',
  styleUrls: ['./nova-avaliacao.component.scss']
})
export class NovaAvaliacaoComponent implements OnInit {

  @ViewChild('month') month: MatSelect;
  @ViewChild('year') year: MatSelect;
  @ViewChild('customers') customers: MatSelect;
  @ViewChild('scale') scale: ElementRef;
  @ViewChild('reason') reason: ElementRef;

  toppings = new FormControl();
  customersList = [];
  detailsCustomers = [];

  constructor(
    public dialogRef: MatDialogRef<NovaAvaliacaoComponent>,
    private avaliacaoService: AvaliacaoService,
    private clienteService: ClienteService,
    @Inject(MAT_DIALOG_DATA) public data: Avaliacao,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    console.log(this.data);
    this.listCustomers();
  }

  save() {
    console.log(this.month.value);
    console.log(this.year.value);
    console.log(this.scale.nativeElement.value);
    console.log(this.reason.nativeElement.value);
    console.log(this.customers);
    if (!this.month.value || !this.year.value || !this.customers.value || this.customers.value.length <= 0 || !this.scale.nativeElement.value || !this.reason.nativeElement.value) {
      return null;
    }
    const avaliacao = {
      month: this.month.value,
      year: this.year.value,
      scale: this.scale.nativeElement.value,
      reason: this.reason.nativeElement.value,
      customers: this.customers.value
    };
    this.avaliacaoService.post(avaliacao)
      .subscribe(data => {
        console.log(data.id);
        this.dialogRef.close({ id: data.id });
      });
  }

  listCustomers() {
    this.clienteService.get().subscribe(result => {
      console.log(result);
      const keys = Object.keys(result);
      const values = Object.values(result);
      for (let i = 0; i < keys.length; i++) {
        this.customersList.push(values[i].customer);
      }
    });
  }

}


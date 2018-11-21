import { Component, OnInit, Inject, NgZone, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSelect } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
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

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NovaAvaliacaoComponent>,
    private avaliacaoService: AvaliacaoService,
    private clienteService: ClienteService,
    @Inject(MAT_DIALOG_DATA) public data: Avaliacao,
  ) {
    this.form = new FormGroup({
      month: new FormControl(null),
      year: new FormControl(null),
      customers: new FormControl(null),
      scale: new FormControl(null),
      reason: new FormControl(null)
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.listCustomers();
    if (this.data) {
      // this.data.customers = this.form.value.customers;
      this.form.patchValue(this.data);
    }
  }

  save() {
    const fData = this.form.value;
    console.log(fData);
    if (!fData.month || !fData.year || !fData.customers || fData.customers.length <= 0 || !fData.scale || !fData.reason) {
      return null;
    } else if (this.data === null) {
      console.log('novo');
      const avaliacao = {
        month: fData.month,
        year: fData.year,
        scale: fData.scale,
        reason: fData.reason,
        customers: fData.customers
      };
      this.avaliacaoService.post(avaliacao)
        .subscribe(data => {
          this.dialogRef.close({ id: fData.id });
        });
    } else {
      console.log('edit');
      this.avaliacaoService.put(this.data.id, fData.month, fData.year, fData.scale, fData.reason, fData.customers)
        .subscribe(data => {
          this.dialogRef.close({});
        });
    }
  }

  listCustomers() {
    this.clienteService.get().subscribe(result => {
      const keys = Object.keys(result);
      const values = Object.values(result);
      for (let i = 0; i < keys.length; i++) {
        this.customersList.push(values[i].customer);
      }
    });
  }

}


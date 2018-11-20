import { Component, OnInit, Inject, NgZone } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Avaliacao } from '../shared/avaliacao.model';
import { AvaliacaoService } from '../shared/avaliacao.service';

@Component({
  selector: 'app-nova-avaliacao',
  templateUrl: './nova-avaliacao.component.html',
  styleUrls: ['./nova-avaliacao.component.scss']
})
export class NovaAvaliacaoComponent implements OnInit {

  // toppings = new FormControl();
  customers: string[] = ['K&L', 'Megasteam', 'VWC', 'ABC Metrologia', 'LEMPE', 'LRM', 'CTM', 'Calibratec',
    'Omicron', 'MAERSK', 'LRM', 'ACCPR', 'ANCAL', 'CERTIFIC', 'SENAI', 'PRESERTEC', 'ABSI', 'Ambientalis', 'Cimeq',
    'Excelmetro', 'Disotax'];

  constructor(
    public dialogRef: MatDialogRef<NovaAvaliacaoComponent>,
    private avaliacaoService: AvaliacaoService,
    @Inject(MAT_DIALOG_DATA) public data: Avaliacao) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    console.log(this.data);
  }

}

export interface DialogData {
  customer: string;
  contact_customer: string;
  date: Date;
}

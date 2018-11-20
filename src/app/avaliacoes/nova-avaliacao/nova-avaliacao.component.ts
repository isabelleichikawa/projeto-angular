import { Component, OnInit, Inject, NgZone, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSelect } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Avaliacao } from '../shared/avaliacao.model';
import { AvaliacaoService } from '../shared/avaliacao.service';

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

  // toppings = new FormControl();
  // customersList: string[] = ['K&L', 'Megasteam', 'VWC', 'ABC Metrologia', 'LEMPE', 'LRM', 'CTM', 'Calibratec',
  //   'Omicron', 'MAERSK', 'LRM', 'ACCPR', 'ANCAL', 'CERTIFIC', 'SENAI', 'PRESERTEC', 'ABSI', 'Ambientalis', 'Cimeq',
  //   'Excelmetro', 'Disotax'];

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

  save() {
    console.log(this.month.value);
    console.log(this.year.value);
    console.log(this.scale.nativeElement.value);
    console.log(this.reason.nativeElement.value);
    if (!this.month.value || !this.year.value || !this.scale.nativeElement.value || !this.reason.nativeElement.value) {
      return null;
    }
    this.avaliacaoService.post(this.month.value, this.year.value, this.scale.nativeElement.value, this.reason.nativeElement.value)
      .subscribe(data => {
        console.log(data.id);
        this.dialogRef.close({ id: data.id });
      });
  }

}


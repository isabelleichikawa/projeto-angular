import { Component, OnInit, Inject, NgZone } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-nova-avaliacao',
  templateUrl: './nova-avaliacao.component.html',
  styleUrls: ['./nova-avaliacao.component.scss']
})
export class NovaAvaliacaoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NovaAvaliacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}

export interface DialogData {
  customer: string;
  contact_customer: string;
  date: Date;
}

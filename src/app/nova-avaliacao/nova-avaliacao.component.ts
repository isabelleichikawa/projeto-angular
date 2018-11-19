import { Component, OnInit, Inject, NgZone } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {ViewChild} from '@angular/core';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-nova-avaliacao',
  templateUrl: './nova-avaliacao.component.html',
  styleUrls: ['./nova-avaliacao.component.scss']
})
export class NovaAvaliacaoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NovaAvaliacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private ngZone: NgZone) { }

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

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

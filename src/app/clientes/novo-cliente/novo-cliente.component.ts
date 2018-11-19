import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Cliente } from './cliente.model';

@Component({
  selector: 'app-novo-cliente',
  templateUrl: './novo-cliente.component.html',
  styleUrls: ['./novo-cliente.component.scss']
})
export class NovoClienteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NovoClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cliente) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}



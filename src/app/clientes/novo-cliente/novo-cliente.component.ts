import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Cliente } from '../shared/cliente.model';
import { ClienteService } from '../shared/cliente.service';

@Component({
  selector: 'app-novo-cliente',
  templateUrl: './novo-cliente.component.html',
  styleUrls: ['./novo-cliente.component.scss']
})
export class NovoClienteComponent implements OnInit {

  @ViewChild('input1') input1: ElementRef;
  @ViewChild('input2') input2: ElementRef;
  @ViewChild('input3') input3: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<NovoClienteComponent>,
    private clienteService: ClienteService,
    @Inject(MAT_DIALOG_DATA) public data: Cliente) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    console.log(this.data);
    if (this.data) {

    }
  }

  save() {
    console.log(this.input3.nativeElement.value);
    if (!this.input1.nativeElement.value || !this.input2.nativeElement.value || !this.input3.nativeElement.value) {
      return null;
    }
    this.clienteService.post(this.input1.nativeElement.value, this.input2.nativeElement.value, this.input3.nativeElement.value)
      .subscribe(data => {
        console.log(data.id);
        this.dialogRef.close({ id: data.id });
      });
  }


}



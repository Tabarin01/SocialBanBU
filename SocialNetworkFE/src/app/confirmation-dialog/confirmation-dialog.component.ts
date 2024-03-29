import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: "./confirmation-dialog.component.html",
  styleUrls: ["./confirmation-dialog.component.css"],
})
export class ConfirmationDialogComponent{
  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>) {}

  reload(){
    window.location.reload()
  }

  confirmDelete(): void {
    this.dialogRef.close(true);
    
    setTimeout(() => {
      this.reload();
    }, 100);
  }
  
  
  

}
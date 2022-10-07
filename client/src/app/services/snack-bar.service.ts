import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

@Injectable({providedIn: 'root'})
export class SnackBarService {

  private readonly config: MatSnackBarConfig = {
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
    duration: 3000
  }

  constructor(
    private snackBar: MatSnackBar
  ) { }

  error(message: string, config?: MatSnackBarConfig): MatSnackBarRef<TextOnlySnackBar> {
    config = {
      ...this.config,
      ...config,
      panelClass: 'snack-bar-error'
    };

    return this.snackBar.open(message, 'Dismiss', config);
  }

  info(message: string, config?: MatSnackBarConfig): MatSnackBarRef<TextOnlySnackBar> {
    config = {
      ...this.config,
      ...config,
      panelClass: 'snack-bar-info'
    };

    return this.snackBar.open(message, 'Dismiss', config);
  }
}

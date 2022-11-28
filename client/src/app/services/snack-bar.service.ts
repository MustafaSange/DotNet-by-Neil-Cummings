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

  error(message: string, action = 'Dismiss', config?: MatSnackBarConfig): MatSnackBarRef<TextOnlySnackBar> {
    config = {
      ...this.config,
      ...config,
      panelClass: 'snack-bar-error',
    };

    return this.snackBar.open(message, action, config);
  }

  info(message: string, action = 'Dismiss', config?: MatSnackBarConfig): MatSnackBarRef<TextOnlySnackBar> {
    config = {
      ...this.config,
      ...config,
      panelClass: 'snack-bar-info'
    };

    return this.snackBar.open(message, action, config);
  }

  canDeactivate(message: string, action = 'Continue', config?: MatSnackBarConfig): MatSnackBarRef<TextOnlySnackBar> {
    config = {
      ...this.config,
      ...config,
      duration: 4000,
      panelClass: 'snack-bar-can-deactivate'
    };

    return this.snackBar.open(message, action, config);
  }
}

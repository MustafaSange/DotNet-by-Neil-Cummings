import { Injectable } from '@angular/core';
import { MatSnackBarDismiss } from '@angular/material/snack-bar';
import { CanDeactivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CanComponentDeactivate } from '../models/can-component-deactivate.model';
import { SnackBarService } from '../services/snack-bar.service';



// Consider using this interface for all CanDeactivate guards,
// and have your components implement this interface, too.
//
//   e.g. export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
//
// export interface CanComponentDeactivate {
// canDeactivate: () => any;
// }

@Injectable({providedIn: 'root'})
export class PreventUnsavedChangesGuard implements CanDeactivate<CanComponentDeactivate> {

  constructor(
    private snackBarService: SnackBarService
  ) {

  }

  canDeactivate(component: CanComponentDeactivate): Observable<boolean> {
    if (component.canDeactivate()) {
      const message = 'Any changes made will be lost.';
      const snackBarRef = this.snackBarService.canDeactivate(message);
      return snackBarRef.afterDismissed()
        .pipe(
          map((action: MatSnackBarDismiss) => action.dismissedByAction)
        );
    }

    return of(true);
  }
}

// @Injectable({providedIn: 'root'})
// export class PreventUnsavedChangesGuard implements CanDeactivate<MemberEditComponent> {
//   canDeactivate(component: MemberEditComponent): boolean {
//     if (component.form.dirty) {

//       return confirm('Are you sure you want to continue?  Any unsaved changes will be lost.')
//     }

//     return true;
//   }
// }

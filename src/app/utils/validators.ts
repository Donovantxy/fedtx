import { isInString } from './functions';
import { PW_ERR_MSG } from './constants';
import { ValidatorFn, AbstractControl } from '@angular/forms';

export class AppValidators {

  public static readonly emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  public static passwordLogin(): ValidatorFn {
    return (ctrl: AbstractControl): object => {
      ctrl.markAsTouched();
      let check = /[A-Z]+/.test(ctrl.value);
      if ( ctrl.parent ) {
        const firstName = ctrl.parent.get('firstName').value;
        const lastName = ctrl.parent.get('lastName').value;
        check = check ? !isInString([firstName, lastName], ctrl.value) : check;
      }
      return check ? null : { passowrd: PW_ERR_MSG };
    };
  }

}

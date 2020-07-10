import { ValidatorFn, AbstractControl } from '@angular/forms';

export class AppValidators {

  public static readonly emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  public static passwordLogin(): ValidatorFn {
    return (ctrl: AbstractControl): object => {
      const errMsg = `Wrong password structure, it has to be min 8 letters long,
      it has to contain at lower and capital letters, and it should not contain user's first or last name`;
      let check = /[A-Z]+/.test(ctrl.value);
      if ( ctrl.parent ) {
        const firstName = ctrl.parent.get('firstName').value;
        const lastName = ctrl.parent.get('lastName').value;
        check = check ? !(new RegExp(`${firstName}|${lastName}`, 'i')).test(ctrl.value) : check;
      }
      return check ? null : { passowrd: errMsg };
    };
  }
}

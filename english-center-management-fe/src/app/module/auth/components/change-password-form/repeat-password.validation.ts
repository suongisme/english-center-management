import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function repeatPasswordValidator(
    passwordControl: AbstractControl,
): ValidatorFn {
    return (controls: AbstractControl): ValidationErrors | null => {
        if (controls.value !== passwordControl.value) {
            return { notEquivalent: true };
        }
        return null;
    };
}

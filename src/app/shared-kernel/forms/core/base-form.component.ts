import { Component, OnInit, Directive, Optional } from '@angular/core';
import { UntypedFormGroup, UntypedFormArray, UntypedFormControl, UntypedFormBuilder } from '@angular/forms';
import { BaseComponent } from '../../components/base-component';

@Directive()
export abstract class BaseFormComponent extends BaseComponent implements OnInit {

  formulario: UntypedFormGroup;

  //constructor(private formBuilder: FormBuilder) { }

  constructor(@Optional() public formBuilder?: UntypedFormBuilder) { super(); }


  ngOnInit() {
  }

  abstract submit();

  abstract submitFail();

  onSubmit() {
    if (this.formulario.valid) {
      this.submit();
    } else {
      this.verificaValidacoesForm(this.formulario);
      this.submitFail();
    }
  }

  verificaValidacoesForm(formGroup: UntypedFormGroup | UntypedFormArray) {

    Object.keys(formGroup.controls).forEach(campo => {

      const controle = formGroup.get(campo);
      controle.markAsDirty();
      controle.markAsTouched();
      if (controle instanceof UntypedFormGroup || controle instanceof UntypedFormArray) {
        this.verificaValidacoesForm(controle);
      }
    });
  }

  resetar() {
    this.formulario.reset();
  }

  verificaValidTouched(campo: string) {
    return (
      !this.formulario.get(campo).valid &&
      (this.formulario.get(campo).touched || this.formulario.get(campo).dirty)
    );
  }

  verificaRequired(campo: string) {
    return (
      this.formulario.get(campo).hasError('required') &&
      (this.formulario.get(campo).touched || this.formulario.get(campo).dirty)
    );
  }

  verificaEmailInvalido() {
    const campoEmail = this.formulario.get('email');
    if (campoEmail.errors) {
      return campoEmail.errors['email'] && campoEmail.touched;
    }
  }

  aplicaCssErro(campo: string) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    };
  }


  builddFormArray(arrayFields : string[]) {
    const values = arrayFields.map(v => new UntypedFormControl(false));
    return this.formBuilder.array(values);
  }

  getArrayControls(formArrayName : string) {
    return this.formulario.get(formArrayName) ? (<UntypedFormArray>this.formulario.get(formArrayName)).controls : null;
  }

 convertFormArrayToValues(formArrayName: string, valueSubmit: any) : any
 {
    let objeto = new Object()
    return Object.assign(valueSubmit, {
      [formArrayName]: valueSubmit[formArrayName]
      .map((v, i) => v ? this[formArrayName][i] : null)
      .filter(v => v !== null)
    });
 }


 getArray(currentModel : object, formArrayName : string)
 {

  const arrayData : Array<string> = currentModel[formArrayName];

  if (arrayData)
  {
    (<UntypedFormArray>this.formulario.get(formArrayName)).reset();
    this[formArrayName].forEach((value, index) => {
      if (arrayData.includes(value))
        (<UntypedFormArray>this.formulario.get(formArrayName)).controls[index].setValue(true);

    });
  }

 }

}

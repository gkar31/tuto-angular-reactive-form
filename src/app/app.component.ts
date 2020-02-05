import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, EmailValidator } from '@angular/forms';
import { forbiddenNameValidator } from './shared/user-name.validator';
import { PasswordValidator } from './shared/password.validator';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  registrationForm: FormGroup;

  ngOnInit(){
    this.registrationForm = this._formBuilder.group({
      userName: ['Jane Doe', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/password/)]],
      email: [''],
      subscribe: [false],
      password: ['toto'],
      confirmPassword: ['toto'],
      address: this._formBuilder.group({
        street: ['Maxwell avenue'],
        city: ['Toulouse'],
        postalCode: ['31109']
      }),
      alternateEmails: this._formBuilder.array([])
    }, {validator: PasswordValidator});
  

    this.registrationForm.get('subscribe').valueChanges.subscribe( checkedValue => {
      const email = this.registrationForm.get('email');
      if (checkedValue) {
        
        email.setValidators(Validators.required);
      } else {
        email.clearValidators();
      }

      email.updateValueAndValidity();
    })
  }

  constructor(private _formBuilder: FormBuilder){}

  title = 'reactive-forms';

  

  get userName() {
    return this.registrationForm.get('userName');
  }


  get email() {
    return this.registrationForm.get('email');
  }


  get alternateEmails() {
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  addAlternateEmail() {
    this.alternateEmails.push(this._formBuilder.control(''));
  }

  // registrationForm = new FormGroup({
  //   userName: new FormControl('John Smith'),
  //   password: new FormControl('test'),
  //   confirmPassword: new FormControl('test'),
  //   address: new FormGroup({
  //     street: new FormControl('avenue Maxwell'),
  //     postalCode: new FormControl('31109'),
  //     city: new FormControl('Toulouse')
  //   })
  // });

  loadApiData() {
    // this.registrationForm.setValue({
    //   userName: 'Jane DOE',
    //   password: 'test',
    //   confirmPassword: 'test',
    //   address: {
    //     street: 'avenue James Clerck Maxwell',
    //     postalCode: '31109',
    //     city: 'Toulouse cedex'
    //   }
    // })
    this.registrationForm.patchValue({
      userName: 'Jane DOE',
      address: {
        city: 'Toulouse cedex'
      }
    })
  }

}

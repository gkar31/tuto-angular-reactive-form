import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'reactive-forms';

  registrationForm = new FormGroup({
    userName: new FormControl('John Smith'),
    password: new FormControl('test'),
    confirmPassword: new FormControl('test'),
    address: new FormGroup({
      street: new FormControl('avenue Maxwell'),
      postalCode: new FormControl('31109'),
      city: new FormControl('Toulouse')
    })
  });

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

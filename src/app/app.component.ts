import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'AngularOutputFour';
  reactiveForm: FormGroup;
  formStatus: any;
  firstName: string;
  lastName: string;
  age: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  skills: string;
  pass: string;
  submitted: boolean = false;
  showPass: boolean = false;
  showConfirmPass: boolean = false;

  ngOnInit() {
    this.reactiveForm = new FormGroup({
      firstname: new FormControl(null, [
        Validators.required,
        this.noSpaceAllowed,
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      lastname: new FormControl(null, [
        Validators.required,
        this.noSpaceAllowed,
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        this.repassword.bind(this),
      ]),
      age: new FormControl(null, [
        Validators.required,
        this.ageLessSixteen,
        Validators.pattern('[0-9]*'),
      ]),
      gender: new FormControl('male', Validators.required),
      skills: new FormArray([new FormControl(null, Validators.required)]),
    });

    this.reactiveForm.statusChanges.subscribe((value) => {
      console.log(value);
      this.formStatus = value;
    });

    // setTimeout(() => {
    //   this.reactiveForm.patchValue({
    //     email: 'jijo@gmail.com',
    //   });
    // }, 4000);
  }

  onSubmit() {
    console.log(this.reactiveForm);

    this.firstName = this.reactiveForm.get('firstname').value;
    this.lastName = this.reactiveForm.get('lastname').value;
    this.email = this.reactiveForm.get('email').value;
    this.age = this.reactiveForm.get('age').value;
    this.password = this.reactiveForm.get('password').value;
    this.confirmPassword = this.reactiveForm.get('confirmPassword').value;
    this.gender = this.reactiveForm.get('gender').value;
    this.skills = this.reactiveForm.get('skills').value;
    this.submitted = true;
    if (this.reactiveForm.valid) {
    } else {
      alert('There is some INVALID enteries in the form!!');
    }
  }
  onReset() {
    this.reactiveForm.reset();
    this.submitted = false;
  }

  addSkills() {
    (<FormArray>this.reactiveForm.get('skills')).push(
      new FormControl(null, Validators.required)
    );
  }

  viewPass() {
      return this.showPass?'text' : 'password'
  }
  viewConfirmPass() {
    return this.showConfirmPass?'text' : 'password'
}

  toggleShowPass(){
    if(this.showPass)
    {
      this.showPass=false;
    }
    else{
      this.showPass=true;
    }
  }

  toggleShowConfirmPass(){
    if(this.showConfirmPass)
    {
      this.showConfirmPass=false;
    }
    else{
      this.showConfirmPass=true;
    }
  }

  noSpaceAllowed(control: FormControl) {
    if (control.value != null && control.value.indexOf(' ') != -1) {
      return { noSpaceAllowed: true };
    }
    return null;
  }

  ageLessSixteen(control: FormControl) {
    if (control.value != null && control.value <= 16) {
      return { ageLessSixteen: true };
    }
    return null;
  }

  repassword(control: FormControl) {
    if (
      control.value != null &&
      control.value != this.reactiveForm.get('password').value
    ) {
      return { repassword: true };
    }
    return null;
  }
}

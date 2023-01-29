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
  firstName:string;
  lastName:string;
  age:string;
  email:string;
  password:string;
  confirmPassword:string;
  gender:string;
  skills:string;
  pass:string;

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
      ]),
      age: new FormControl(null, [
        Validators.required,
        this.ageLessEighteen,
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

    this.firstName=this.reactiveForm.get('firstname').value;
    this.lastName=this.reactiveForm.get('lastname').value;
    this.email=this.reactiveForm.get('email').value;
    this.age=this.reactiveForm.get('age').value;
    this.password=this.reactiveForm.get('password').value;
    this.confirmPassword=this.reactiveForm.get('confirmPassword').value;
    this.gender=this.reactiveForm.get('gender').value;
    this.skills=this.reactiveForm.get('skills').value;
    // this.reactiveForm.reset();
  }

  addSkills() {
    (<FormArray>this.reactiveForm.get('skills')).push(
      new FormControl(null, Validators.required)
    );
  }

  noSpaceAllowed(control: FormControl) {
    if (control.value != null && control.value.indexOf(' ') != -1) {
      return { noSpaceAllowed: true };
    }
    return null;
  }

  ageLessEighteen(control: FormControl) {
    if (control.value != null && control.value <= 18) {
      return { ageLessEighteen: true };
    }
    return null;
  }

  repassword(control: FormControl) {
    this.reactiveForm.get('password').valueChanges.subscribe(value=> this.pass=value);
    if (
      control.value != null &&
      control.value === this.pass
    ) {
      return { repassword: true };
    }
    return null;
  }
}

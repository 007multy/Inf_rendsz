import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { User } from '../../models/user'

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {


  user = new User();
  username: string;
  name: string;
  email: string;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.mainForm();
    this.getUser();
  }

  get myForm() {
    return this.createForm.controls;
  }

  submitted = false;

  createForm: FormGroup;

  matcher = new MyErrorStateMatcher();

  ngOnInit() {
  }

  mainForm() {
    this.createForm = this.formBuilder.group({
      name: [''],
      priority: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      deadline: ['']
    });
  }
  onSubmit() {
    this.submitted = true;
    if (!this.createForm.valid) {
      return false;
    } else {
      this.apiService.createTask(this.createForm.value).subscribe(
        (res) => {
          console.log('Task successfully created!');
          this.ngZone.run(() => this.router.navigateByUrl('/task-list'));
        }, (error) => {
          console.log(error);
        });
    }
  }

  getUser() {

    if (this.apiService.getCurrentuser().userName == null) {
      this.router.navigate(['/login']);
    }

    this.user = this.apiService.getCurrentuser();
    this.name = JSON.stringify(this.user.name)
    this.username = JSON.stringify(this.user.userName)
    this.email = JSON.stringify(this.user.email)
  }


  logout() {
    this.user = new User()
    this.apiService.setCurrentuser(this.user);
    this.router.navigate(['/login']);
  }

}
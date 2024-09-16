import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../model/user.model';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {

  regForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }


  ngOnInit(): void {
    this.regForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['User', Validators.required],
      photo: ['', Validators.required],
 
    })

  }

  onSubmit(): void {
    if (this.regForm.valid) {
      const user: UserModel = this.regForm.value;
      this.authService.registration(user)
        .subscribe({
          next: res => {
            console.log('User registered successfully:', res);
            this.authService.storeToken(res.token);
            this.router.navigate(['login'])
          },
          error: (err) => {
            console.error('Error registering user:', err);
          }
        });
    }
    else {
      alert("Complte mandatory Field");
    }

  }


}

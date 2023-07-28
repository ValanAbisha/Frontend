import { Component , OnInit} from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators ,AbstractControl} from '@angular/forms';

function emailLengthValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const value = control.value;
  if (value && (value.length < 5 || value.length > 10)) { // Modify the length as per your requirement
    return { 'emailLengthInvalid': true };
  }
  return null;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit{
  public form={
    email:null,
    password:null
  }
  public loginForm!: FormGroup
  // public loginForm: FormGroup
  constructor(private backend:BackendService, private router: Router,private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email,emailLengthValidator]], // Add required and email validators
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)]] // Add required and pattern validators
    });
  }




  public error = null;
  public success = '';
  submitLogin() {
    this.error = null;
    this.success = '';
    this.backend.login(this.form).subscribe(
      (data: any) => {
        console.log("dataaa", data);
        if (data && data.access_token) {
          localStorage.setItem('access_token', data.access_token);
          this.success = "Login successful! Redirecting...";
          this.router.navigate(['/adduser']);
        }
      },
      (error) => this.handleError(error)

    );
  }

  private handleError(error: any) {
    console.error('Error occurred:', error.error.message);
    this.error = error.error.message;
  }
  }



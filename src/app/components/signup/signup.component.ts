import { Component,OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators ,AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  public form={
    name:null,
    email:null,
    password:null,
    password_confirmation:null
  }
  constructor(private backend:BackendService, private router: Router,private formBuilder: FormBuilder) {}
  // public error: any =[];
  ngOnInit(): void {
  }
  public error = null;
  public success= null;
  submitSignUp(){
    this.error = null;
    this.success = null;
    this.backend.signup(this.form).subscribe(
      (data: any) => {
        console.log(data);
        this.success = data.message;
      },
      (error) => this.handleError(error)
    );
  }


  private handleError(error: any) {
    this.error = error.error.message;
  }
}

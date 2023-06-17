import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
//
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  //loginForm property will be initialized and won't be null or undefined(!)
  loginForm ! :FormGroup
  constructor(private router: Router, private fb:FormBuilder,
  private  auth:AuthService ) {}

  ngOnInit():void{
    this.loginForm=this.fb.group({

      email:['',Validators.required],
      password:['',Validators.required]


    })
  }


  register(){


       this.router.navigate(['register']);
     

  }

  onLogin(){

    if(this.loginForm.valid){

      this.auth.signIn(this.loginForm.value).subscribe(
        {
          next :(res=>{
            alert(res.massage);
            this.loginForm.reset();
            this.router.navigate(['login']);
          }),
          error:(err=>{
            alert(err?.error.message)
          })
          
        })


    }

    else {

      this.validateAllFormFields(this.loginForm)

      alert("something wrong")
    }

  }


 

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
  
      if (control instanceof FormControl) {
        control.markAsDirty({
          onlySelf: true
        });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  
}


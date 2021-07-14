import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //inject UserService obj
  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
  }

  onLogin(userCredentials:any){
    this.us.loginUser(userCredentials).subscribe(
      res=>{
        if(res.message==="login success"){
          //save token to localstorage
          localStorage.setItem("token",res.token)
          localStorage.setItem("username",res.username)
          localStorage.setItem("userObj",JSON.stringify(res.userObj))
          //navigate to user profile
          this.router.navigateByUrl("/home")
          //this.router.navigateByUrl(`home/${res.username}`)
          
        }
        else if(res.message==="admin"){
          this.router.navigateByUrl("/admin")
        }
        else{
          alert(res.message)
        }
      },
      err=>{
        console.log(err)
        alert("Something went wrong in login")
      }
    )
  }

}

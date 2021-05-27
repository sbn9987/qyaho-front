import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name: string;
  username: string;
  email: string;
  password: string;
  password1: string;//
  password2: string;//
  birth: number;//

  constructor(
    private validateService: ValidateService, 
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router :Router) { }

    ngOnInit(): void {
    }

    onRegisterSubmit(){ 

    if (this.password1 !== this.password2) {
      console.log('패스워드가 다릅니다');
      this.flashMessage.show('패스워드가 다릅니다. 다시 입력하세요', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password1,
      age: this.birth
      }

    
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('모두 입력해 주세요', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('이메일 주소가 올바르지 않습니다', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    this.authService.registerUser(user).subscribe(data => {
      if(data.success) {
        this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });
  }


}

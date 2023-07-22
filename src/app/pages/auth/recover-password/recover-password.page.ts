import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AuxFnsService } from 'src/app/services/aux-fns.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
})
export class RecoverPasswordPage implements OnInit {

  newPasswordGroup:any = this.formBuilder.group({
    password: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder,  private authSvc: AuthService, public auxFns: AuxFnsService) { }

  ngOnInit() {
  }

  async updatePassword() {
    const passwordValue = this.newPasswordGroup.controls['password'].value;
    await this.authSvc.updateUser(passwordValue);
  }
}

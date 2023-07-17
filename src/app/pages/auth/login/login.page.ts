import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: any = this.formBuilder.group({
    email: ['', Validators.required, Validators.maxLength(100)],
    password: ['', Validators.required, Validators.minLength(6), Validators.maxLength(20)],
  });

  constructor(
    private formBuilder: FormBuilder,
    private authSvc: AuthService, 
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router
    ) { }

  ngOnInit() {
  }

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  async login() {}

  navigateTo(link: string) {
    this.router.navigate(['/' + link]);
  }
}

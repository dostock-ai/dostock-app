import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AuthSupabaseService } from '../services/auth-supabase.service';
import { AuxFnsService } from 'src/app/services/aux-fns.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  credentials = this.fb.nonNullable.group({
    full_name: ['', [Validators.required, Validators.minLength(3)]],
    business_name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loadingController: LoadingController,
    private navCtrl: NavController,
    private router: Router,
    private authSupabaseSvc: AuthSupabaseService,
    public auxFns: AuxFnsService
  ) {}

  get email() {
    return this.credentials.controls.email;
  }

  get password() {
    return this.credentials.controls.password;
  }

  get full_name() {
    return this.credentials.controls.full_name;
  }

  get business_name() {
    return this.credentials.controls.business_name;
  }

  async createAccount() {
    const loading = await this.loadingController.create();
    await loading.present();

    const data:any = await this.authService.signUp(this.credentials.getRawValue());
    if (data.error) {
      this.auxFns.showAlert('Registro fallido', data.error.message);
    } else {
      const uuid = data?.data?.user.id;
      const full_name = this.full_name.value;
      const business_name = this.business_name.value;

      console.log(this.authService.getCurrentUserId());

      const info = await this.authSupabaseSvc.createUser(full_name, business_name, uuid);
      
      if (info.error) {
        this.auxFns.showAlert('Registro fallido', 'Vuelva a intentarlo mas tarde');
      } else {
        this.auxFns.showAlert('Registro completado', 'Porfavor, confirma tu correo electronico ahora!');
      }
    }

    await loading.dismiss();
    this.credentials.reset();
    this.navCtrl.navigateBack('');
  }
}

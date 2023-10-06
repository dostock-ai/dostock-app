import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AuxFnsService } from 'src/app/services/aux-fns.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials:any = this.formBuilder.group({
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private authSvc: AuthService, 
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router,
    public auxFns: AuxFnsService
    ) {
      this.authSvc.getCurrentUser().subscribe((user) => {
        if(user) {
          const redirectUrl = localStorage.getItem('redirectUrl') || 'sales';
          console.log('redirectUrl', redirectUrl);
          
          this.router.navigateByUrl('/home/' + redirectUrl, { replaceUrl: true });
        }
      });
  }

  ngOnInit() {
  }

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authSvc.signIn(this.credentials.getRawValue()).then(
      async (data) => {
        await loading.dismiss();

        if(data.error) {
          this.credentials.reset();
          this.auxFns.showAlert('Inicio de sesión fallida', 'Correo electrónico o contraseña incorrecto');
        }
      },
    );
  }

  async forgotPassword() {
    const alert = await this.alertController.create({
      header: 'Cambio de contraseña',
      message: 'Ingresa tu correo electrónico para recibir un enlace de cambio de contraseña',
      inputs: [
        {
          type: 'email',
          name: 'email',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Restablecer contraseña',
          handler: async (result) => {
            const loading = await this.loadingController.create();
            await loading.present();

            const { data, error } = await this.authSvc.sendPwReset(result.email);
            await loading.dismiss();

            if(error) {
              this.auxFns.showAlert('Error', error.message);
            } else {
              this.auxFns.showAlert('Restablecer contraseña', 'Se ha enviado un enlace de restablecimiento de contraseña a tu correo electrónico');
            }
          }
        }
      ],
    });
    await alert.present();
  }
}

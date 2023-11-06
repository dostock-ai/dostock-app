import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthSupabaseService {

  constructor(private authSvc: AuthService) { }

  async createUser(full_name: string, business_name: string, uuid: any) {
    const { data, error } = await this.authSvc.supabase.from('user-info')
    .insert({
      full_name: full_name,
      business_name: business_name,
      user_id: uuid
    });
    const data1 = await this.authSvc.supabase.from('user-data').insert({ user_id: uuid});
    console.log('user-data', data1);
    
    return { data: data, error: error };
  }
}

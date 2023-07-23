import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseClient, User, createClient } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public supabase: SupabaseClient;
  private currentUser: BehaviorSubject<User | any> = new BehaviorSubject(null);

  constructor(private router: Router) {
    this.supabase = createClient(environment.supabase.auth.supabaseURL, environment.supabase.auth.supabaseKey);

    this.supabase.auth.onAuthStateChange((event, session) => {
      if(event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        this.currentUser.next(session?.user);
      } else {
        this.currentUser.next(false);
      }
    });

    this.loadUser();
  }

  async loadUser() {
    if(this.currentUser.value) {
      return;
    }

    const user = await this.supabase.auth.getUser();
    if(user.data.user) {
      this.currentUser.next(user.data.user);
    } else {
      this.currentUser.next(false);
    }
  }

  signUp(credentials: {email:any, password:any}) {
    return this.supabase.auth.signUp(credentials);
  }

  signIn(credentials: {email:any, password:any}) {
    return this.supabase.auth.signInWithPassword(credentials);
  }

  sendPwReset(email:any) {
    return this.supabase.auth.resetPasswordForEmail(email);
  }

  async signOut() {
    await this.supabase.auth.signOut();
    this.router.navigate(['/login']);
  }

  getCurrentUser(): Observable<User | boolean> {
    return this.currentUser.asObservable();
  }

  getCurrentUserId(): any {
    if(this.currentUser.value) {
      return (this.currentUser.value as User).id;
    } else {
      return null;
    }
  }

  signInWithEmail(email:any) {
    return this.supabase.auth.signInWithOtp({ email }); 
  }

  getCurrentUserRole(): any {
    if(this.currentUser.value) {
      return (this.currentUser.value as User).role;
    } else {
      return null;
    }
  }

  async updateUser(password: string) {
    const { data, error } = await this.supabase.auth.updateUser({
      // email: credentials.email,
      password: password,
    });
    //! Manejo de errores { data: data, error: error };
  }
}

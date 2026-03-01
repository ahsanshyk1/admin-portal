import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './login.html',
    styleUrl: './login.less',
})
export class Login {
    form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required)
    });
    error = '';
    loading = false;

    constructor(private auth: AuthService, private router: Router) { }

    async submit() {
        this.error = '';
        if (this.form.invalid) {
            this.error = 'Please enter a valid email and password.';
            return;
        }
        this.loading = true;
        const { email, password } = this.form.value;
        const ok = await this.auth.login(email, password);
        this.loading = false;
        if (ok) {
            this.router.navigate(['/dashboard']);
        } else {
            this.error = 'Invalid credentials';
        }
    }
}

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    standalone: false,
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent {
    constructor(private router: Router, private http: HttpClient) { }

    login(nome: string, senha: string) {
        this.http.post('http://localhost:3000/login', {
            nome, senha,
        }).subscribe((resultado: any) => {
            localStorage.setItem('token', resultado.token);
            this.router.navigate(['/tarefas']);
        });
    }

    logout() {
        localStorage.removeItem('token');
    }
}
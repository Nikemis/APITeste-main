import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user.model';
import { Router } from '@angular/router';

@Component({
    standalone: false,
    selector: 'app-users',
    templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
    users: User[] = [];

    constructor(private userService: UserService, private router: Router) { }

    ngOnInit(): void {
        if (!localStorage.getItem('token')) this.router.navigate(['login']);

        this.loadUsers();
    }

    loadUsers() {
        this.userService.getUsers().subscribe(users => this.users = users);
    }

    deleteUser(id: string) {
        this.userService.deleteUser(id).subscribe(() => this.loadUsers());
    }
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from './user.model';

@Component({
    standalone: false,
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {
    user: User = { nome: '', senha: '' };
    isEdit = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEdit = true;
            this.userService.getUsers().subscribe(users => {
                const existing = users.find(u => u._id === id);
                if (existing) this.user = existing;
            });
        }
    }

    CREATE_user() {
        if (this.isEdit && this.user._id) {
            this.userService.updateUser(this.user._id, this.user).subscribe(() => this.router.navigate(['/users']));
        } else {
            this.userService.createUser(this.user).subscribe(() => this.router.navigate(['/users']));
        }
    }
}
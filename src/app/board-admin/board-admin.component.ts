import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content = 'Unauthorized';

  constructor(private userService: UserService,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorageService.getUser()) {
    if (this.tokenStorageService.getUser().roles.includes('ROLE_ADMIN')) {
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
}
}
}

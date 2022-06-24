import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { User } from '../../models/user'
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  Tasks: any = [];
  user = new User();
  username: string;
  name: string;
  email: string;

  constructor(
    private router: Router,
    private apiService: ApiService

  ) {
    this.readTask();
    this.getUser();

  }

  ngOnInit(): void {
  }

  readTask() {
    this.apiService.getTasks().subscribe((data) => {
      this.Tasks = data;
    });
  }


  getUser() {

    if (this.apiService.getCurrentuser().userName == null) {
      this.router.navigate(['/login']);
    }

    this.user = this.apiService.getCurrentuser();
    this.name = JSON.stringify(this.user.name)
    this.username = JSON.stringify(this.user.userName)
    this.email = JSON.stringify(this.user.email)
  }


  logout() {
    this.user = new User()
    this.apiService.setCurrentuser(this.user);
    this.router.navigate(['/login']);
  }


  edit(index) {

    let id = this.Tasks[index]._id;
    this.router.navigate(['/task-edit/:' + id]);

  }

}

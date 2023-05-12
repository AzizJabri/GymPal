import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public usersList: any = [];
  constructor(private api: HttpClient) {
    this.fetchUsers();
  }

  getAllUsers(): Observable<any> {
    return this.api.get('http://localhost/api/users/getAll.php');
  }

  fetchUsers(): void {
    this.getAllUsers().subscribe(
      (user) => {
        this.usersList = user;
      },
      (error) => {
        console.error('Failed to fetch coaches:', error);
      }
    );
  }

  removeUser(id: any) {
    this.api
      .get('http://localhost/api/users/deleteById.php?id=' + id)
      .subscribe((data: any) => {
        //destroy this component
        this.fetchUsers();
      });
  }
}

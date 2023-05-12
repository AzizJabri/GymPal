import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoachService {
  public coachList: any = [];
  constructor(private api: HttpClient) {
    this.fetchCoaches();
  }

  getAllCoaches(): Observable<any> {
    return this.api.get('http://localhost/api/coaches/getAll.php');
  }

  fetchCoaches(): void {
    this.getAllCoaches().subscribe(
      (coaches) => {
        this.coachList = coaches;
      },
      (error) => {
        console.error('Failed to fetch coaches:', error);
      }
    );
  }

  getApprovedCoaches() {
    return this.coachList.filter((coach: any) => coach.isApproved === '1');
  }
  getPendingCoaches() {
    return this.coachList.filter((coach: any) => coach.isApproved === '0');
  }
  removeCoach(id: any) {
    this.api
      .get('http://localhost/api/coaches/deleteById.php?id=' + id)
      .subscribe((data: any) => {
        //destroy this component
        this.fetchCoaches();
      });
  }
  approveCoach(id: any) {
    this.api
      .get('http://localhost/api/coaches/approveById.php?id=' + id)
      .subscribe((data: any) => {
        this.coachList.map((coach: any) => {
          if (coach.id === id) {
            coach.isApproved = '1';
          }
        });
      });
  }
}

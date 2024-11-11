import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  private candidatesUrl =
    'https://636ce2d8ab4814f2b2712854.mockapi.io/candidates';
  private clientStatusesUrl =
    'https://636ce2d8ab4814f2b2712854.mockapi.io/client-statuses';
  private skillsUrl = 'https://636ce2d8ab4814f2b2712854.mockapi.io/skills';

  constructor(private http: HttpClient) {}

  getCandidates(): Observable<any> {
    return this.http.get<any>(this.candidatesUrl);
  }

  getCandidateById(id: string): Observable<any> {
    return this.http.get<any>(this.candidatesUrl + '/' + id);
  }

  getClientsStatuses(): Observable<any> {
    return this.http.get<any>(this.clientStatusesUrl);
  }

  getSkills(): Observable<any> {
    return this.http.get<any>(this.skillsUrl);
  }

  updateCandidateById(id: string, data: any): Observable<any> {
    return this.http.put<any>(this.candidatesUrl + '/' + id, data);
  }
}

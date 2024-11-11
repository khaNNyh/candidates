import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { forkJoin } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.scss'],
})
export class CandidatesListComponent implements OnInit {
  candidates: any;
  candidateStatuses: any;
  skills: any;

  constructor(private restService: RestService, private router: Router) {
    forkJoin({
      candidates: this.restService.getCandidates(),
      candidateStatuses: this.restService.getClientsStatuses(),
      skills: this.restService.getSkills(),
    }).subscribe(({ candidates, candidateStatuses, skills }) => {
      this.candidates = candidates;
      this.candidateStatuses = candidateStatuses;
      this.skills = skills;
    });
  }

  ngOnInit(): void {}

  onEditCandidate(candidate: any) {
    this.router.navigate(['candidate', candidate.id]);
    console.log(candidate);
  }
}

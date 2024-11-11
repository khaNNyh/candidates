import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatesListComponent } from './candidates-list/candidates-list.component';
import { CandidateDetailsComponent } from './candidate-details/candidate-details.component';

const routes: Routes = [
  { path: 'candidates', component: CandidatesListComponent },
  { path: 'candidate/:id', component: CandidateDetailsComponent },
  { path: '**', redirectTo: 'candidates', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.scss'],
})
export class CandidateDetailsComponent implements OnInit {
  candidateForm!: FormGroup;
  candidate: any;
  allSkills = [
    { id: '1', name: 'Angular' },
    { id: '2', name: 'JavaScript' },
    { id: '3', name: 'React' },
    { id: '4', name: 'Vue JS' },
    { id: '5', name: 'HTML' },
    { id: '6', name: 'CSS' },
    { id: '7', name: 'SASS' },
  ];
  candidateStatuses: any;
  newStatusId: string = '';

  constructor(
    private fb: FormBuilder,
    private restService: RestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.candidateForm = this.fb.group({
      name: [''],
      surname: [''],
      email: [''],
      statusId: 0,
      skills: this.fb.array([]),
    });

    // Get the candidate ID from route and load candidate data
    const candidateId = this.route.snapshot.paramMap.get('id');
    if (candidateId) {
      this.restService.getClientsStatuses().subscribe((statuses) => {
        console.log(statuses);
        this.candidateStatuses = statuses;
      });

      this.restService.getCandidateById(candidateId).subscribe((candidate) => {
        this.candidate = candidate;
        this.populateForm(candidate);
      });
    }

    this.addSkillCheckboxes();
  }

  updateCandidateStatus(newStatusId: string) {
    console.log(newStatusId);
    this.newStatusId = newStatusId;
  }

  addSkillCheckboxes() {
    const skillsFormArray = this.candidateForm.get('skills') as FormArray;
    this.allSkills.forEach((skill) => {
      skillsFormArray.push(this.fb.control(false));
    });
  }

  populateForm(candidate: any) {
    this.candidateForm.patchValue({
      name: candidate.name,
      surname: candidate.surname,
      email: candidate.email,
      statusId: candidate.statusId,
    });

    // Set checkboxes based on candidate's skillIds
    const skillsFormArray = this.candidateForm.get('skills') as FormArray;
    candidate.skillsId.forEach((skillId: string) => {
      const index = this.allSkills.findIndex((skill) => skill.id === skillId);
      if (index !== -1) {
        skillsFormArray.at(index).setValue(true);
      }
    });
  }

  onSubmit() {
    if (this.candidateForm.valid) {
      const formValues = this.candidateForm.value;
      console.log(formValues);
      console.log(this.candidateForm.controls['statusId'].value);
      formValues.statusId = this.candidateForm.controls['statusId'].value;
      const updatedCandidate = {
        ...formValues,
        statusId: this.candidateForm.controls['statusId'].value,
        skillsId: this.getSelectedSkills(),
      };

      this.restService
        .updateCandidateById(this.candidate.id, updatedCandidate)
        .subscribe((response) => {
          console.log('Candidate updated successfully', response);
        })
        .add(() => {
          this.router.navigate(['candidates']);
        });
    }
  }

  getSelectedSkills(): string[] {
    const selectedSkillIds: string[] = [];
    const skillsFormArray = this.candidateForm.get('skills') as FormArray;
    skillsFormArray.controls.forEach((control, index) => {
      if (control.value) {
        selectedSkillIds.push(this.allSkills[index].id);
      }
    });
    return selectedSkillIds;
  }
}

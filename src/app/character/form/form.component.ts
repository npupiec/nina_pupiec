import {Component, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {combineLatest, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {filter, finalize} from 'rxjs/operators';
import {Character} from '../../models/character';
import {ListService} from '../../services/list.service';
import {Species} from '../../models/species';

@Component({
  selector: 'sl-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {

  characterForm: FormGroup;
  sub: Subscription[] = [];
  speciesList: Array<Species> = [];
  @Input() newCharacter: boolean;
  character: Character;
  submitted: boolean = false;
  isLoading: boolean = false;


  gender = ['male', 'female', 'n/a'];
  formError = {
    required: 'required - This field is required.'
  };

  constructor(
    private listService: ListService,
    private route: ActivatedRoute,
    private router: Router,
    private el: ElementRef
  ) { }

  ngOnInit() {
    this.listService.getSpecies().subscribe(data => {
      this.speciesList = data;
    }, (error) => console.error(error));

    if (this.newCharacter) {
      this.characterForm = new FormGroup({
        id: new FormControl(),
        name: new FormControl('', [Validators.required]),
        species: new FormControl('', [Validators.required]),
        gender: new FormControl('', [Validators.required]),
        homeworld: new FormControl('')
      });
    } else {
      combineLatest(
        this.route.params.pipe(filter(params => params.id)),
      ).subscribe(([params]) => {

        this.sub.push(
          this.listService.getCharacter(params.id).subscribe(data => {
            this.character = data;

            this.characterForm = new FormGroup({
              id: new FormControl(data.id),
              name: new FormControl(data.name, [Validators.required]),
              species: new FormControl(data.species, [Validators.required]),
              gender: new FormControl(data.gender, [Validators.required]),
              homeworld: new FormControl(data.homeworld)
            });
          }, (error) => console.error(error)),
        );
      });
    }
  }

  onSubmit(form) {
    const values = form.value;
    this.submitted = true;
    this.isLoading = true;

    if (this.characterForm.invalid) {
      this.isLoading = false;
      const invalidControl = this.el.nativeElement.querySelector('.form-group .ng-invalid');
      invalidControl.focus();

      return;
    }

    if (this.newCharacter) {
      this.listService.addNewCharacter(values)
        .pipe(
          finalize(() => this.isLoading = false)
        )
        .subscribe(data => {
          this.router.navigate([''], {relativeTo: this.route});
        }, (error) => console.error(error));
    } else {
      this.listService.editCharacter(values).subscribe(data => {
        this.router.navigate([''], {relativeTo: this.route});
      }, (error) => console.error(error))
    }
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }
}

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {ListService} from '../../app/services/list.service';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormComponent,
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        HttpClientModule,
      ],
      providers: [
        HttpClient
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.characterForm.invalid).toBeTruthy();
    });
  });

  it('get species', () => {
    const service: ListService = TestBed.get(ListService);
    expect(service).toBeTruthy();
    service.getSpecies().subscribe(() => {
      expect(component.speciesList.length).toBeGreaterThan(0);
    }, (err) => {
      expect(console.log(err));
    });
  });

  it('should single data', () => {
    const service: ListService = TestBed.get(ListService);
    service.getCharacter(1).subscribe(data => {
      expect(data.name).toBe('Luke Skywalker');
    }, (err) => {
      expect(console.log(err));
    })
  })
});

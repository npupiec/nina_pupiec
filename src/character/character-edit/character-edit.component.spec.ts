import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterEditComponent } from './character-edit.component';
import {FormComponent} from '../form/form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClient, HttpClientModule} from '@angular/common/http';

describe('CharacterEditComponent', () => {
  let component: CharacterEditComponent;
  let fixture: ComponentFixture<CharacterEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CharacterEditComponent,
        FormComponent
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
    fixture = TestBed.createComponent(CharacterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should render header', async(() => {
    const header = fixture.debugElement.nativeElement;
    expect(header.querySelector('h2').textContent).toContain('Edit character');
  }))
});

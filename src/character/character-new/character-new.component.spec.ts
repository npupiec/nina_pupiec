import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterNewComponent } from './character-new.component';
import {FormComponent} from '../form/form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClient, HttpClientModule} from '@angular/common/http';

describe('CharacterNewComponent', () => {
  let component: CharacterNewComponent;
  let fixture: ComponentFixture<CharacterNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CharacterNewComponent,
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
    fixture = TestBed.createComponent(CharacterNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render header', async(() => {
    const header = fixture.debugElement.nativeElement;
    expect(header.querySelector('h2').textContent).toContain('Add character');
  }));
});

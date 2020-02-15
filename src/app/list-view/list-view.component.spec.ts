import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import { ListViewComponent } from './list-view.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ListService} from '../services/list.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('ListViewComponent', () => {
  let component: ListViewComponent;
  let fixture: ComponentFixture<ListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListViewComponent ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        HttpClient,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get data', () => {
    const service: ListService = TestBed.get(ListService);
    const httpMock: HttpTestingController = TestBed.get(HttpTestingController);
    service.getCharacters().subscribe(data => {
      expect(data.length).toBeGreaterThan(0);
      expect(data[0].name).toEqual('Luke Skywalker');

      const req = httpMock.expectOne(`http://localhost:3000/characters`, 'call to api');
      expect(req.request.method).toBe('GET');

      req.flush({
        name: 'Luke Skywalker'
      });

      httpMock.verify();

    }, (err) => {
      expect(console.log(err));
    });
  });

  it('should render header', async(() => {
    const header = fixture.debugElement.nativeElement;
    expect(header.querySelector('h1').textContent).toContain('List View');
  }));
});

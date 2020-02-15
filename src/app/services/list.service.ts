import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Character} from '../models/character';
import {Species} from '../models/species';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }

  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(`http://localhost:3000/characters`);
  }

  filterCharacters(filters): Observable<Character[]> {
    return this.http.get<Character[]>(`http://localhost:3000/characters`, {
      params: {
        q: filters.filters,
        _page: filters.page
      }
    });
  }

  removeCharacter(number: number): Observable<Character> {
    return this.http.delete<Character>(`http://localhost:3000/characters/${number}`);
  }

  getSpecies(): Observable<Species[]> {
    return this.http.get<Species[]>(`http://localhost:3000/species`);
  }

  addNewCharacter(obj: Character): Observable<Character> {
    return this.http.post<Character>(`http://localhost:3000/characters`, obj);
  }

  getCharacter(id: number): Observable<Character> {
    return this.http.get<Character>(`http://localhost:3000/characters/${id}`);
  }

  editCharacter(obj: Character): Observable<Character> {
    return this.http.put<Character>(`http://localhost:3000/characters/${obj.id}`, obj);
  }
}

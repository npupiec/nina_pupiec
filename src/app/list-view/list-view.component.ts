import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ListService} from '../services/list.service';
import {Character} from '../models/character';

@Component({
  selector: 'sl-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit, OnDestroy {
  sub: Subscription[] = [];
  charactersList: Character[];
  currentPage: number = 1;
  pager: Array<number> = [];
  totalPages: number;
  startPage: number = 1;

  constructor(private listService: ListService) {}

  ngOnInit() {
    this.noFilters();
  }

  onSearch(searchText: string) {
    if (searchText) {
      const filters = {
        filters: searchText,
        page: 1
      };

      this.filterCharacters(filters, this.charactersList.length);

    } else {
      this.noFilters();
    }
  }

  noFilters() {
    const filters = {
      filters: '',
      page: this.currentPage
    };

    this.sub.push(
      this.listService.getCharacters().subscribe(data => {
        this.filterCharacters(filters, data.length);
      }, (error) => console.error(error))
    );
  }

  filterCharacters(filters: Object, charactersLength: number) {
    this.sub.push(
      this.listService.filterCharacters(filters).subscribe(data => {
        this.charactersList = data;
        this.totalPages = Math.ceil(charactersLength / 10);
        this.pager = Array.from(Array(( this.totalPages + 1) - this.startPage).keys()).map(i => this.startPage + i);
      }, (error) => console.error(error))
    );
  }

  setPage(pageNumber: number) {
    const filters = {
      filters: '',
      page: pageNumber
    };

    this.sub.push(
      this.listService.filterCharacters(filters).subscribe(data => {
        this.charactersList = data;
      }, (error) => console.error(error))
    );

    this.currentPage = pageNumber;
  }

  remove(item: number) {
    this.sub.push(
      this.listService.removeCharacter(item).subscribe(() => {
        this.noFilters();
      }, (error) => console.error(error))
    )
  }

  sort(key: string) {
    switch (key) {
      case 'id':
        this.charactersList.sort((a, b) => a.id > b.id ? 1 : -1);
        break;
      case 'name':
        this.charactersList.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
        break;
      case 'species':
        this.charactersList.sort((a, b) => a.species.toLowerCase() > b.species.toLowerCase() ? 1 : -1);
        break;
      case 'gender':
        this.charactersList.sort((a, b) => a.gender > b.gender ? 1 : -1);
        break;
      case 'homeworld':
        this.charactersList.sort((a, b) => a.homeworld.toLowerCase() > b.homeworld.toLowerCase() ? 1 : -1);
        break;
    }
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }
}

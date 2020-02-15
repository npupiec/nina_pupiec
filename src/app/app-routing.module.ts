import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListViewComponent } from './list-view/list-view.component';
import {CharacterNewComponent} from '../character/character-new/character-new.component';
import {CharacterEditComponent} from '../character/character-edit/character-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ListViewComponent
  },
  {
    path: 'newCharacter',
    component: CharacterNewComponent
  },
  {
    path: 'characters/:id',
    component: CharacterEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

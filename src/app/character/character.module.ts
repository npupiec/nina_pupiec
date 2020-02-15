import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CharacterNewComponent} from './character-new/character-new.component';
import {CharacterEditComponent} from './character-edit/character-edit.component';
import {FormComponent} from './form/form.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    CharacterNewComponent,
    CharacterEditComponent,
    FormComponent
  ]
})
export class CharacterModule { }

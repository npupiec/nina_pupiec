import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sl-character-new',
  templateUrl: './character-new.component.html',
  styleUrls: ['./character-new.component.scss']
})
export class CharacterNewComponent implements OnInit {

  newCharacter: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}

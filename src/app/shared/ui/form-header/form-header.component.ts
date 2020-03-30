import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-header',
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.scss']
})
export class FormHeaderComponent implements OnInit {
  @Input() text: string;
  @Input() line: any = true;
  @Input() subtext: string;

  constructor() { }

  ngOnInit() {
  }

}

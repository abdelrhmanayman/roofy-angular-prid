import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navigation-ctrl',
  templateUrl: './navigation-ctrl.component.html',
  styleUrls: ['./navigation-ctrl.component.scss']
})
export class NavigationCtrlComponent implements OnInit {
  @Input() hasBack: boolean;

  constructor(private location: Location) { }

  ngOnInit() {
  }

  public back() {
    this.location.back();
  }

  public skip() {
    window.location.href = 'https://roofy.com/additional-information/';
  }
}

import { Component } from '@angular/core';
import { Header } from "../header/header";
import { NzLayoutModule, NzSiderComponent } from 'ng-zorro-antd/layout';
import { RouterLinkActive, RouterOutlet } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-nav',
  imports: [Header, NzLayoutModule, RouterOutlet, RouterLinkActive, NzSiderComponent, NzIconModule],
  templateUrl: './nav.html',
  styleUrl: './nav.less',
})
export class Nav {

}

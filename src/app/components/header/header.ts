import { Component } from '@angular/core';
import { NzAvatarComponent } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropdownMenuComponent, NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzHeaderComponent } from "ng-zorro-antd/layout";

@Component({
  selector: 'app-header',
  imports: [
    NzHeaderComponent, NzButtonModule, NzDropDownModule, NzAvatarComponent, NzDropdownMenuComponent, NzDropdownMenuComponent
  ],
  templateUrl: './header.html',
  styleUrl: './header.less',
})
export class Header {

}

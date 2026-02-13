import { Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-dashboard',
  imports: [
    NzCardModule,
    NzGridModule,
    NzTableModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.less',
})
export class Dashboard {

}

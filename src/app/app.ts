import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from "./components/nav/nav";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav],
  templateUrl: './app.html',
  styleUrl: './app.less'
})
export class App {
  protected title = 'admin-portal';
}

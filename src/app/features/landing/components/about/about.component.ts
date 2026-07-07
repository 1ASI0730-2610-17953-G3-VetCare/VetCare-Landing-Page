import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { SafePipe } from './safe.pipe';

declare var AOS: any;

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, MatIconModule, TranslateModule, SafePipe],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements AfterViewInit {
  productVideoUrl = 'https://www.youtube.com/embed/d6R_YxO10FU';
  teamVideoUrl = 'https://www.youtube.com/embed/T58SeHg4-5w';

  ngAfterViewInit(): void {
    // AOS se inicializa centralmente en LandingComponent
  }
}

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
  // TODO: Reemplaza con los videos del nuevo proyecto
  productVideoUrl = 'https://www.youtube.com/embed/TODO-PRODUCT-VIDEO-ID';
  teamVideoUrl = 'https://www.youtube.com/embed/TODO-TEAM-VIDEO-ID';

  ngAfterViewInit(): void {
    // AOS se inicializa centralmente en LandingComponent
  }
}

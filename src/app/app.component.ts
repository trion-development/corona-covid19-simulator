import { Component } from '@angular/core';

@Component({
  selector: 'cosi-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  faqVisible: boolean;

  showFaq(): void {
    this.faqVisible = !this.faqVisible;
  }
}

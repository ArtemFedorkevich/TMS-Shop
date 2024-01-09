import { Component } from '@angular/core';
import { FOOTER_ITEMS } from '../../constants/footer.constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  footerItems = FOOTER_ITEMS;
}

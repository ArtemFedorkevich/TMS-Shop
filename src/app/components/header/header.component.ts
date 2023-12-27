import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() themeColor: 'black' | 'white' = 'white';
  imagePaths: { black: { bx_menu_alt_right_image: string; carbon_favorite_image: string; shopping_card_image: string; user_image: string }; white: { bx_menu_alt_right_image: string; carbon_favorite_image: string; shopping_card_image: string; user_image: string } } = {
    black: {
      bx_menu_alt_right_image: '../../../assets/images/bx_menu_alt_right_black.png',
      carbon_favorite_image: '../../../assets/images/carbon_favorite_black.png',
      shopping_card_image: '../../../assets/images/shopping_card_black.png',
      user_image: '../../../assets/images/user_black.png'
    },
    white: {
      bx_menu_alt_right_image: '../../../assets/images/bx_menu_alt_right_white.png',
      carbon_favorite_image: '../../../assets/images/carbon_favorite_white.png',
      shopping_card_image: '../../../assets/images/shopping_card_white.png',
      user_image: '../../../assets/images/user_white.png'
    }
  };
   imageSources: {
    bx_menu_alt_right_image: string;
    carbon_favorite_image: string;
    shopping_card_image: string;
    user_image: string;
  } | undefined;

  constructor() {
    this.setImageSources();
  }

  ngOnChanges() {
    this.setImageSources();
  }

  private setImageSources() {
    this.imageSources = this.imagePaths[this.themeColor];
  }
}

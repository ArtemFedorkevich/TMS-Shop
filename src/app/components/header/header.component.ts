import { Component, Input } from '@angular/core';
import { ImagePaths } from './image-paths.interface';
import { IMAGE_PATHS, HEADER_ITEMS } from '../../constants/header.constants';
import { THEME_COLORS } from '../../constants/app.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() themeColor: typeof THEME_COLORS.BLACK | typeof THEME_COLORS.WHITE = THEME_COLORS.WHITE;
  headerItems = HEADER_ITEMS;
  imagePaths: { black: ImagePaths; white: ImagePaths } = IMAGE_PATHS;
  imageSources: ImagePaths | undefined;

  constructor() {
    this.setImageSources();
  }

  ngOnChanges() {
    this.setImageSources();
  }

  private setImageSources() {
    this.imageSources = this.imagePaths[this.themeColor as keyof typeof this.imagePaths];
  }
}

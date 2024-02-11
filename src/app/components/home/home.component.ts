import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from "../../models/category.model";
import { Item } from "../../models/product.model";
import { CATEGORY_MAPPINGS, DEFAULT_CATEGORY_IMAGE } from "../../constants/home.constants";
import { Observable, of } from 'rxjs';
import { NO_IMAGE_URL } from "../../constants/app.constants";
import {MatButtonToggleChange} from "@angular/material/button-toggle";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  currentYear!: number;
  categories: Category[] = [];
  defaultToggleValue: string = 'featured';
  allItems: Item[] = [];
  filteredItems: Item[] = [];
  latestItems: Item[] = [];
  midpoint: number = 0;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });

    this.categoryService.getProducts().subscribe(products => {
      this.allItems = products.items;
      this.updateFilteredItems(this.defaultToggleValue);
      this.filterLatestItems().subscribe(latestItems => {
        this.latestItems = latestItems;
        this.midpoint = Math.ceil(latestItems.length / 2);
      });
    });
  }

  onToggleChange(event: MatButtonToggleChange): void {
    this.updateFilteredItems(event.value);
  }

  updateFilteredItems(toggleValue: string): void {
    this.filterItems(toggleValue).subscribe(filteredItems => {
      this.filteredItems = filteredItems;
    });
  }

  filterLatestItems(): Observable<Item[]> {
    const sortedItems = this.allItems.slice().sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB.getTime() - dateA.getTime();
    });

    return of(sortedItems.slice(0, 8));
  }

  getCategoryImageUrl(category: string): string {
    return CATEGORY_MAPPINGS[category.toLowerCase()]
      ? `${CATEGORY_MAPPINGS[category.toLowerCase()]}`
      : `${DEFAULT_CATEGORY_IMAGE}`;
  }

  filterItems(toggleValue: string): Observable<Item[]> {
    let itemsToReturn: Item[];

    switch (toggleValue) {
      case 'featured':
        itemsToReturn = this.allItems.slice(0, 4);
        break;

      case 'best':
        itemsToReturn = this.getRandomItems(4);
        break;

      case 'new':
        itemsToReturn = this.allItems.slice(-4);
        break;

      default:
        itemsToReturn = this.allItems.slice(0, 4);
        break;
    }

    return of(itemsToReturn);
  }

  getRandomItems(count: number): Item[] {
    const shuffledItems = this.shuffleArray(this.allItems.slice());
    return shuffledItems.slice(0, count);
  }

  shuffleArray(array: Item[]): Item[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  getItemRandomImage(images: string[]): string {
    if (images && images.length > 0) {
      const randomIndex = Math.floor(Math.random() * images.length);
      return images[randomIndex];
    }
    return NO_IMAGE_URL;
  }
}

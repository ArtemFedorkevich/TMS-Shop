import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { SORTING_OPTIONS } from "../../constants/products.constants";

@Component({
  selector: 'app-home',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  currentYear!: number;
  selectedSortOption: string =  SORTING_OPTIONS[0];
  sortOptions: typeof SORTING_OPTIONS = SORTING_OPTIONS;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
  }

  onSortChange() {
    this.fetchCategories();
  }

  onSortOrderChange(order: 'asc' | 'desc') {
    this.fetchCategories(order);
  }

  private fetchCategories(order: 'asc' | 'desc' = 'asc') {
    console.log(this.selectedSortOption, order);
    // // Call your categoryService to fetch data with the selected sorting options
    // this.categoryService.getProducts(this.selectedSortOption, order).subscribe(
    //   (data) => {
    //     // Handle the fetched data
    //     console.log('Fetched categories:', data);
    //   },
    //   (error) => {
    //     // Handle the error
    //     console.error('Error fetching categories:', error);
    //   }
    // );
  }
}

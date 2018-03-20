import { Component, OnInit, Inject } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { format } from 'date-fns';
import { API_ENDPOINT } from '../../constants';
import { CategorysService } from '../core/categorys.service';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';

class Article {
  name: string;
  articles: any[];
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private location: Location,
    private categoryService: CategorysService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  category: {[key: string]: CategoryData} = {};
  categoryList: CategoryItem[] = [];

  ngOnInit(): void {
    this.categoryService
      .getCategoryList()
      .map(categoryListItem => categoryListItem.categoryList)
      .do((categoryList: CategoryItem[]) => {
        console.log(categoryList)
        categoryList.forEach((categoryItem: CategoryItem) => {
          this.categoryService.getCategory(categoryItem.path).subscribe((categoryData: CategoryData) => {
            this.category[categoryItem.categoryName] = categoryData;
          });
        });
      })
      .subscribe((categoryList: CategoryItem[]) => {
        this.categoryList = categoryList;
      });
  }

  formatTime(timestamp: string | number): string {
    return format(timestamp, 'MMMM Do YYYY');
  }
}

import { Component, OnInit } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { API_ENDPOINT } from '../../constants';

@Component({
  selector: 'app-recent-articles',
  templateUrl: './recent-articles.component.html',
  styleUrls: ['./recent-articles.component.scss']
})
export class RecentArticlesComponent implements OnInit {
  recentArticles = [];

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  // TODO 抽一个全局 service
  ngOnInit() {
    this.getRecentArticles().then(articles => {
      this.recentArticles = articles;
    });
  }

  getRecentArticles(): Promise<any> {
    if (isPlatformServer(this.platformId)) {
      return Promise.resolve(
        JSON.parse(require('fs').readFileSync(`build/recent-articles.json`, 'utf-8'))
      );
    } else {
      return this.http
        .get(API_ENDPOINT + `/recent-articles.json`)
        .toPromise()
        .then(article => {
          return article;
        });
    }
  }
}
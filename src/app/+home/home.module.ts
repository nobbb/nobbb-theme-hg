import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HomeComponent } from './home.component';
import { FangweiComponent } from '../fangwei/fangwei.component';
import { GlitchBlockComponent } from '../glitch-block/glitch-block.component';
import { ShadowLinkComponent } from '../shadow-link/shadow-link.component';
import { CategoriesService } from '../core/categorys.service';
import { CommonModule } from '@angular/common';
import { ArticlesComponent } from '../articles/articles.component';
import { HomeRencentArticlesComponent } from './home-rencent-articles/home-rencent-articles.component';

@NgModule({
  declarations: [HomeComponent, FangweiComponent, GlitchBlockComponent, ShadowLinkComponent, ArticlesComponent, HomeRencentArticlesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
      }
    ])
  ],
  providers: [Title, CategoriesService]
})
export class HomeModule {}

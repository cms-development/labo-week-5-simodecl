import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { ArticlesComponent } from '../articles/articles.component';
import { ArticleDetailComponent } from '../article-detail/article-detail.component';
import { ArticleEditComponent } from '../article-edit/article-edit.component';
import { AuthGuardService as AuthGuard } from '../services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: ArticleDetailComponent },
  { path: 'detail/:id/edit', component: ArticleEditComponent, canActivate: [AuthGuard] },
  { path: 'articles', component: ArticlesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

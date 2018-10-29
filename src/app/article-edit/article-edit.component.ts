import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Article, Attributes, Body} from '../article';
import { Json } from './../Json';


@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit {
  article: Article;
  id: string;

  constructor(private articleService: ArticleService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.id = this._route.snapshot.paramMap.get('id');
    this.getArticle();
  }

  getArticle(): void {
    this.articleService.getArticle(this.id).subscribe(res => {
      this.article = res;
      console.log(this.article);
    });
  }

  patchArticle(): void {
    console.log(this.article);
    const patchObject = new Json();
    patchObject.data = this.article;

    this.articleService.patchArticle(this.id, patchObject).subscribe(
      res => this._router.navigate([`detail/${this.article.id}`]),
      err => console.log(err));
  }

}

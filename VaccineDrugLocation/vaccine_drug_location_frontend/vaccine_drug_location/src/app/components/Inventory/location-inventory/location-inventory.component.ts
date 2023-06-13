import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../services/inventory.service';
import { ArticleService } from '../../../services/article.service';
import { Inventory } from '../../../models/inventory.model';
import { Article } from '../../../models/article.model';

@Component({
  selector: 'app-location-inventory',
  templateUrl: './location-inventory.component.html',
  styleUrls: ['./location-inventory.component.scss']
})
export class LocationInventoryComponent implements OnInit {
  inventories: Inventory[] = [];
  articles: Article[] = [];

  constructor(
    private inventoryService: InventoryService,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.getAllInventory();
    this.getAllArticles();
  }

  getAllInventory(): void {
    this.inventoryService.getAllInventory().subscribe(
      (inventories: Inventory[]) => {
        this.inventories = inventories;
      },
      (error: any) => {
        console.log('An error occurred while fetching inventories:', error);
      }
    );
  }

  getAllArticles(): void {
    this.articleService.getAllArticles().subscribe(
      (articles: Article[]) => {
        this.articles = articles;
      },
      (error: any) => {
        console.log('An error occurred while fetching articles:', error);
      }
    );
  }
}

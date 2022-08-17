import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { SubscriptionLike } from 'rxjs';

import { FilterProductService } from 'src/app/services/filter-product.service';
import { GoodsService } from 'src/app/services/goods.service';
import { SortProductService } from 'src/app/services/sort-product.service';

import { ProductWrapper } from '../../classes/product';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  public country = 'Country';
  public typeProduct = 'Type';
  public sort = 'Sort';
  public sortAZ: string = 'Sort From A to Z';
  public sortZA: string = 'Sort From Z to A';
  public sortProduct = [this.sortAZ, this.sortZA];
  public goodsLength: number = 0;
  public pageSize: number = 5;
  private subscription!: SubscriptionLike;
  public goods: ProductWrapper[] = [];
  public countries: string[] = [];
  public types: string[] = [];
  public filteredGoods: ProductWrapper[] = [];
  public showGoods: ProductWrapper[] = [];

  @ViewChild('paginator') paginator!: MatPaginator;


  constructor(
    private productFilter: FilterProductService,
    private productSort: SortProductService,
    private goodsService: GoodsService
  ) {}

  ngOnInit(): void {
   this.subscription = this.goodsService.getGoods().subscribe((goods: ProductWrapper[]) => {
      let setCountries = new Set<string>();
      let setTypes = new Set<string>();
      this.goods = [];

      goods.forEach((product) => {
        setCountries.add(product.country);
        setTypes.add(product.type);
        this.goods.push(new ProductWrapper(product));
      });

      this.countries = Array.from(setCountries);
      this.types = Array.from(setTypes);

      this.filteredGoods = this.goods;
      this.goodsLength = this.filteredGoods.length;
      this.showGoods = this.filteredGoods.slice(0, this.pageSize);
      this.productFilter.addGoods(this.goods);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  public filterElement(event: string, type: string): void  {
    this.filteredGoods = this.productFilter.goodsFilter(type, event);
    this.showGoods = this.filteredGoods.slice(0, this.pageSize);
    this.paginator.firstPage();
  }

  public sortElement(event: string): void  {
    if (event === this.sortAZ) {
      this.filteredGoods = this.productSort.sortNameAZ(this.filteredGoods);
    } else if (event === this.sortZA) {
      this.filteredGoods = this.productSort.sortNameZA(this.filteredGoods);
    }

    this.showGoods = this.filteredGoods.slice(0, this.pageSize);
    this.paginator.firstPage();
  }

  public changePage(event: any) {
    const startIndex = event.pageIndex * event.pageSize;
    let lastIndex = startIndex + event.pageSize;

    this.pageSize = event.pageSize;

    if (lastIndex > this.goodsLength) lastIndex = this.goodsLength;

    this.showGoods = this.filteredGoods.slice(startIndex, lastIndex);
  }
}

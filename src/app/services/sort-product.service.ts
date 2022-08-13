import { Injectable } from '@angular/core';
import { ProductWrapper } from '../classes/product';

@Injectable()
export class SortProductService {
  sortNameAZ(arr: ProductWrapper[]): ProductWrapper[] {
    return arr.sort((obj1: ProductWrapper, obj2: ProductWrapper) =>
      obj1.name > obj2.name ? 0 : obj1.name < obj2.name ? -1 : 0
    );
  }

  sortNameZA(arr: ProductWrapper[]): ProductWrapper[] {
    return arr.sort((obj1: ProductWrapper, obj2: ProductWrapper) =>
      obj1.name < obj2.name ? 0 : obj1.name > obj2.name ? -1 : 0
    );
  }
}

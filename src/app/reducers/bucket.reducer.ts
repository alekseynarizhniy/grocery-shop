import { ProductWrapper } from '../classes/Product';
import { BucketAction } from '../interfaces/bucketAction';

export function reducer(state: ProductWrapper[] = [], action: BucketAction) {
  let arr: ProductWrapper[] = [];

  if (action.type === 'add') {
    arr = state.slice();
    arr.push(action.newvalue);
  } else {
    arr = state;
  }

  return arr;
}

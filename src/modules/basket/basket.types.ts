import type { IProduct } from '../dashboard/product.types';

export interface IBasketProduct {
    id: number;
    count: number;
    product: IProduct;
}

export enum CART_ACTIONS_TYPES {
SET_IS_CART_OPEN = 'cart/SET_IS_CART_OPEN',
ADD_CART_ITEM = 'cart/ADD_CART_ITEM',
REMOVE_CART_ITEM = 'cart/REMOVE_CART_ITEM',
CLEAR_CART_ITEM ="cart/CLEAR_CART_ITEMS",
}

export type CartItemModel = CategoryItem & {
    quantity: number;
};

export  type CategoryItem = {
    id:number;
    imageUrl:string;
    name:string;
    price:number;
}

export type Category = {
    title:string;
    items: CategoryItem[];
}

export type CategoryMap = {
    [key:string]:CategoryItem[]
}

export type DirectoryItemModel={
    id:number;
    title:string;
    imageUrl:string;
}
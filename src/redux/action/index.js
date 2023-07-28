// For add to cart

import Product from "../../component/Product";

export const addCart = (Product) => {
    return {
        type : "ADDITEM",
        payload : Product
    }
}

// For Delete Item
export const delCart = (Product) => {
    return {
        type : "DELITEM",
        payload : Product
    }
}
export const addToCart = (item) => {

    let items = JSON.parse(localStorage.getItem('cart')) || [];

    items = [{ ...item, count: 1 }, ...items];

    localStorage.setItem('cart', JSON.stringify(items));

    return {
        type: 'ADDITEM',
        payload: items

    }
}

export const removeFromCart = (id) => {

    let items = JSON.parse(localStorage.getItem('cart'));

    items = items.filter((product) => product.order_item_id !== id);

    localStorage.setItem('cart', JSON.stringify(items));

    return {
        type: 'REMOVEITEM',
        payload: items
    }
}

export const removeAllProducts = () => {
    localStorage.removeItem("cart");

    return {
        type: 'REMOVEITEMS',
    }
}

let items = JSON.parse(localStorage.getItem('cart')) || []

let myState = {
    products: items,
    count: items.reduce((total, product) => total + product.qty, 0)
}

const cartReducer = (state = myState, action) => {

    switch (action.type) {

        case 'ADDITEM': {

            return { ...state, products: action.payload, count: action.payload.reduce((total, p) => total + p.qty, 0) }
        }

        case 'REMOVEITEM': {

            return { ...state, products: action.payload, count: action.payload.reduce((total, p) => total + p.qty, 0) }
        }
        case 'REMOVEITEMS': {

            return {}
        }

        default: {
            return state
        }

    }
}

export default cartReducer; 
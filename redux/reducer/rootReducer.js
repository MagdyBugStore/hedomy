import { combineReducers } from 'redux'
import products from './product'
import cart from './cart'
import wishlist from './wishlist'
import quickView from './quickView'
import compare from './compare'
import api from './api'
import productFilters from './productFilters'

const rootReducer = combineReducers({
    products,
    cart,
    wishlist,
    quickView,
    compare,
    api,
    productFilters
})

export default rootReducer
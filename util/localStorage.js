import genders from '../public/static/gender.json'
import brands from '../public/static/brands.json'

export class storage {

    static set(key, cartItems) {
        if (!playinserver())
            localStorage.setItem(key, JSON.stringify(cartItems))
    }

    static get(key) {
        if (!playinserver())
            return JSON.parse(localStorage.getItem(key))
    }
    static gettypeid() {
        if (!playinserver()) {
            var currentgender = storage.get('type')
            var genderValue = genders.find(gender => gender.title === currentgender)?.id;
            return genderValue
        }
    }

}
export class StaticDb {
    static brand (id) {
        const brandObject = brands.find(brand => brand.id === id);

        return brandObject ? brandObject.title : '';
    }
}

function playinserver() {
    return typeof window === 'undefined';
}


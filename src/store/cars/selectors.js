export function selectCars(state) {
    return state.cars.page || [];
}
export function selectBrands(state) {
    return state.cars.brands || [];
}

export function selectModels(state) {
    return state.cars.models || [];
}
export function selectFilteredCars(state) {
    return state.cars.filteredCars || [];
}
export function selectCarErrors(state) {
    return state.cars.carErrors;
}
export function selectSingleCar(state) {
    return state.cars.singleCar;
}
export function selectSimilarCars(state) {
    return state.cars.similarCars;
}

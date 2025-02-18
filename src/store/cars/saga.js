import { takeLatest, call, put } from "redux-saga/effects";
import carService from "../../services/CarService";

import {
    getCars,
    setCars,
    appendCars,
    getBrands,
    setBrands,
    getModelsByBrand,
    setModels,
    getFilteredCars,
    setFilteredCars,
    addCar,
    setCarErrors,
    setSuccessfullyCreatedCar,
    getCar,
    setCar,
    getSimilarCars,
    setSimilarCars,
    deleteCar,
    deleteCarSuccess,

} from "./slice";



function* getCarsHandler({ payload }) {

    try {
        const cars = yield call(carService.getAll, payload?.page);
        if (payload?.page > 1) {
            yield put(appendCars(cars));
        } else {
            yield put(setCars(cars));
        }

    } catch (e) {
        console.log(e);
    }
}

function* getBrandsHandler() {
    try {
        const brands = yield call(carService.getAllBrands);
        yield put(setBrands(brands));
    } catch (e) {
        console.log(e);
    }
}

function* getModelsByBrandHandler({ payload }) {
    try {
        const models = yield call(carService.getModelsByBrand, payload);
        yield put(setModels(models));
    } catch (e) {
        console.log(e);
    }
}

function* getFilteredCarsHandler({ payload }) {
    try {
        const filteredCars = yield call(carService.getFiltered, payload);
        yield put(setFilteredCars(filteredCars));
    } catch (e) {
        console.log(e);
    }
}

function* addCarHandler({ payload }) {


    try {
        const data = yield call(carService.addCar, payload);
        yield put(setSuccessfullyCreatedCar(data?.message));

    } catch (e) {
        if (e.response?.status === 422) {
            yield put(setCarErrors(e?.response?.data?.message));
        } else {
            alert("Car creation failed");
        }
    }
}

function* getSingleCarHandler({ payload }) {

    try {
        const data = yield call(carService.getCar, payload);

        yield put(setCar(data));
    } catch (e) {
        console.log(e);
    }
}

function* getSimilarCarsHandler({ payload }) {
    try {
        const data = yield call(carService.getSimilarCars, payload.brand, payload.carId);
        yield put(setSimilarCars(data));
    } catch (e) {
        console.log(e);
    }
}

function* deleteCarHandler({ payload }) {
    try {
        yield call(carService.delete, payload);

        yield put(deleteCarSuccess(payload));

    } catch (e) {
        alert("Failed to delete the car.");
    }
}



export function* watchGetCars() {
    yield takeLatest(getCars.type, getCarsHandler);
}

export function* watchGetBrands() {
    yield takeLatest(getBrands.type, getBrandsHandler);
}

export function* watchGetModelsByBrand() {
    yield takeLatest(getModelsByBrand.type, getModelsByBrandHandler);
}
export function* watchGetFilteredCars() {
    yield takeLatest(getFilteredCars.type, getFilteredCarsHandler);
}
export function* watchAddCarHandler() {
    yield takeLatest(addCar.type, addCarHandler);
}
export function* watchGetSingleCarHandler() {
    yield takeLatest(getCar.type, getSingleCarHandler);
}
export function* watchGetSimilarCars() {
    yield takeLatest(getSimilarCars.type, getSimilarCarsHandler);
}
export function* watchDeleteCar() {
    yield takeLatest(deleteCar.type, deleteCarHandler);
}


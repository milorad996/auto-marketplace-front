import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
    getCars() { },
    setCurrentPage() { },
    getBrands() { },
    getModelsByBrand() { },
    getFilteredCars() { },
    addCar() { },
    getCar() { },
    getSimilarCars() { },
    deleteCar() { },

};

const carsSlice = createSlice({
    name: "cars",
    initialState: {
        page: {
            data: [],
            current_page: 0,
            last_page: 0,
            total: 0,
        },
        filteredCars: [],
        brands: [],
        models: [],
        carErrors: null,
        successfullyCreatedCar: "",
        singleCar: null,
        similarCars: [],



    },

    reducers: {
        setCars(state, { payload }) {
            state.page = {
                data: payload.data,
                current_page: payload.current_page,
                last_page: payload.last_page,
                total: payload.total,
            };
        },
        setFilteredCars(state, { payload }) {
            state.filteredCars = payload;
        },
        appendCars(state, { payload }) {
            state.page = {
                ...payload,
                data: payload.data.concat(state.page.data),
            };
        },
        setCurrentPage(state, { payload }) {
            state.page.current_page = payload;
        },
        setBrands(state, { payload }) {
            state.brands = payload;
        },
        setModels(state, { payload }) {
            state.models = payload;
        },
        setCarErrors(state, { payload }) {
            state.carErrors = payload;
        },
        setSuccessfullyCreatedCar: (state, { payload }) => {
            state.successfullyCreatedCar = payload;
        },
        setCar(state, { payload }) {
            state.singleCar = payload;
        },
        setSimilarCars(state, { payload }) {
            state.similarCars = payload;
        },
        clearCarErrors(state) {
            state.carErrors = null;
        },
        deleteCarSuccess(state, { payload }) {

            if (state.page.data) {
                state.page.data = state.page.data.filter((car) => car.id !== payload);
            }
        },



        ...middlewareActions,
    },
});

export const {
    getCars,
    setCars,
    appendCars,
    setCurrentPage,
    getBrands,
    getModelsByBrand,
    setBrands,
    setModels,
    getFilteredCars,
    setFilteredCars,
    addCar,
    setCarErrors,
    setSuccessfullyCreatedCar,
    setCar,
    getCar,
    getSimilarCars,
    setSimilarCars,
    clearCarErrors,
    deleteCar,
    deleteCarSuccess,

} = carsSlice.actions;

export default carsSlice.reducer;
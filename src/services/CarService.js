import HttpService from "./HttpService";

class CarService extends HttpService {
    getAll = async (page = null) => {
        if (page) {
            const { data } = await this.client.get(`/cars?page=${page}`);
            return data;
        }

        const { data } = await this.client.get('/cars');

        return data;
    }

    getAllBrands = async () => {
        try {
            const { data } = await this.client.get("/brands");
            return data;
        } catch (error) {
            console.error("Error fetching brands:", error);
            throw error;
        }
    };
    getCar = async (carId) => {
        try {
            const { data } = await this.client.get(`/cars/${carId}`);
            return data;
        } catch (error) {
            console.error(`Error fetching car with ID ${carId}:`, error);
            throw error;
        }
    };



    getModelsByBrand = async (brandId) => {
        try {
            const { data } = await this.client.get(`/models/${brandId}`);
            return data;
        } catch (error) {
            console.error(`Error fetching models for brand ${brandId}:`, error);
            throw error;
        }
    }

    getFiltered = async (filters) => {
        const newFilters = { ...filters.filters };



        try {
            let url = `/cars/filter?brand_id=${Number(newFilters.brand)}`;

            if (newFilters.model) {
                url += `&model_name=${newFilters.model}`;
            }
            if (newFilters.price) {
                url += `&price=${newFilters.price}`;
            }
            if (newFilters.yearFrom) {
                url += `&year_from=${newFilters.yearFrom}`;
            }
            if (newFilters.yearTo) {
                url += `&year_to=${newFilters.yearTo}`;
            }
            if (newFilters.fuel) {
                url += `&fuel_type=${newFilters.fuel}`;
            }
            if (newFilters.doors) {
                url += `&door_count=${newFilters.doors}`;
            }

            const { data } = await this.client.get(url);

            console.log("get filtered in service data", data);
            return data;
        } catch (error) {
            console.error("Error fetching filtered cars:", error);
            throw error;
        }
    }
    addCar = async (newCar) => {
        const { data } = await this.client.post("cars", newCar);
        return data;
    };
    getSimilarCars = async (brand, carId) => {
        try {
            const { data } = await this.client.get(`/cars/similar/${brand}/${carId}`);
            return data;
        } catch (error) {
            console.error(`Error fetching similar cars for brand ${brand} and car ID ${carId}:`, error);
            throw error;
        }
    };
    delete = async (carId) => {
        const { data } = await this.client.delete(`cars/${carId}`);
        return data;
    };




}

const carService = new CarService();
export default carService;

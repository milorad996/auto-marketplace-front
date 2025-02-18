import * as authSagas from "./auth/saga";
import * as carsSagas from "./cars/saga";

const sagas = {
    ...carsSagas,
    ...authSagas,
};

export default sagas;
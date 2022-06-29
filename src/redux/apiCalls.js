import { publicRequest, userRequest } from "../requestMethods";
import {
    deleteCulturesFailure,
    deleteCulturesStart,
    deleteCulturesSuccess,
    getCulturesFailure,
    getCulturesStart,
    getCulturesSuccess,
} from "./culturesRedux";
import {
    deleteProvincesFailure,
    deleteProvincesStart,
    deleteProvincesSuccess,
    getProvincesFailure,
    getProvincesStart,
    getProvincesSuccess,
} from "./provincesRedux";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import {
    deleteUsersFailure,
    deleteUsersStart,
    deleteUsersSuccess,
    getUsersFailure,
    getUsersStart,
    getUsersSuccess,
} from "./usersRedux";

export const login = async (dispatch, user, setError) => {
    dispatch(loginStart());
    setError(false);
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
        console.log(res.data);
        window.location.reload();
        setError(false);
    } catch (err) {
        dispatch(loginFailure());
        setError(true);
    }
};

export const getUsers = async (dispatch) => {
    dispatch(getUsersStart());
    try {
        const res = await userRequest.get("/users");
        dispatch(getUsersSuccess(res.data));
    } catch (err) {
        dispatch(getUsersFailure());
    }
};
export const getUser = async (id, setUser) => {
    try {
        const res = await userRequest.get(`/users/find/${id}`);
        // console.log(res.data);
        setUser(res.data);
    } catch (err) {
        console.log(err);
    }
};

export const updateUser = async (id, user, setIsSubmitting, toast) => {
    try {
        // update
        const res = await userRequest.put(`/users/${id}`, user);
        console.log(res.data);
        setIsSubmitting(false);
        toast.success("Perubahan Berhasil Disimpan");
    } catch (err) {
        setIsSubmitting(false);
        toast.error("Perubahan Gagal Disimpan");
    }
};

export const deleteUser = async (id, dispatch, toast) => {
    dispatch(deleteUsersStart());
    try {
        const res = await userRequest.delete(`/users/${id}`);
        dispatch(deleteUsersSuccess(id));
        toast.success("Berhasil Menghapus");
    } catch (err) {
        dispatch(deleteUsersFailure());
        toast.error("Gagal Menghapus");
    }
};

export const getProvinces = async (dispatch) => {
    dispatch(getProvincesStart());
    try {
        const res = await publicRequest.get("/provinces");
        dispatch(getProvincesSuccess(res.data));
    } catch (err) {
        dispatch(getProvincesFailure());
    }
};

export const getProvince = async (provinceId, setProvince) => {
    try {
        const res = await publicRequest.get(`/provinces/find/${provinceId}`);
        console.log(res.data);
        setProvince(res.data);
    } catch (err) {}
};

export const deleteProvince = async (id, dispatch, toast) => {
    dispatch(deleteProvincesStart());
    try {
        const res = await userRequest.delete(`/provinces/${id}`);
        dispatch(deleteProvincesSuccess(id));
        toast.success("Berhasil Menghapus");
    } catch (err) {
        dispatch(deleteProvincesFailure());
        toast.error("Gagal Menghapus");
    }
};

export const updateProvince = async (
    provinceId,
    province,
    setIsSubmitting,
    toast
) => {
    try {
        // update
        const res = await userRequest.put(`/provinces/${provinceId}`, province);
        console.log(res.data);
        setIsSubmitting(false);
        toast.success("Perubahan Berhasil Disimpan");
    } catch (err) {
        setIsSubmitting(false);
        toast.error("Perubahan Gagal Disimpan");
    }
};

export const addCulture = async (culture, toast, setIsSubmitting) => {
    try {
        const res = await userRequest.post(`/cultures`, culture);
        console.log(res.data);
        console.log("SUKSES");
        setIsSubmitting(false);
        toast.success("Data Tari Berhasil Ditambahkan");
    } catch (err) {
        console.log(err);
        setIsSubmitting(false);
        toast.error("Data Tari Gagal Ditambahkan");
    }
};

export const getCultures = async (dispatch) => {
    dispatch(getCulturesStart());
    try {
        const res = await publicRequest.get("/cultures");
        dispatch(getCulturesSuccess(res.data));
    } catch (err) {
        dispatch(getCulturesFailure());
    }
};

export const getCulture = async (id, setCulture) => {
    try {
        const res = await publicRequest.get(`/cultures/find/${id}`);
        console.log(res.data);
        setCulture(res.data);
    } catch (err) {}
};

export const updateCulture = async (id, input, setIsSubmitting, toast) => {
    try {
        // update
        const res = await userRequest.put(`/cultures/${id}`, input);
        console.log(res.data);
        setIsSubmitting(false);
        toast.success("Perubahan Berhasil Disimpan");
    } catch (err) {
        setIsSubmitting(false);
        toast.error("Perubahan Gagal Disimpan");
    }
};

export const deleteCulture = async (id, dispatch, toast) => {
    dispatch(deleteCulturesStart());
    try {
        const res = await userRequest.delete(`/cultures/${id}`);
        dispatch(deleteCulturesSuccess(id));
        toast.success("Berhasil Menghapus");
    } catch (err) {
        dispatch(deleteCulturesFailure());
        toast.error("Gagal Menghapus");
    }
};

export const addProvince = async (province, toast, setIsSubmitting) => {
    try {
        const res = await userRequest.post(`/provinces`, province);
        console.log(res.data);
        console.log("SUKSES");
        setIsSubmitting(false);
        toast.success("Provinsi Berhasil Dibuat");
    } catch (err) {
        console.log(err);
        setIsSubmitting(false);
        toast.error("Provinsi Gagal Dibuat");
    }
};
export const addUser = async (input, toast, setIsSubmitting) => {
    try {
      const res = await userRequest.post(`/auth/register`, input);
      console.log(res.data);
      console.log("SUKSES");
      setIsSubmitting(false);
      toast.success("User Berhasil Dibuat");
    } catch (err) {
      console.log(err);
      setIsSubmitting(false);
      toast.error("User Gagal Dibuat");
    }
  };

import useInterceptor from "./interceptors";

const useApiHelper = () => {
  const axios = useInterceptor();

  const api = {
    //auth
    signUp: (data, params = {}) => axios.post(`rest-auth/registration/`, data, { params: params }),
    signIn: (data, params = {}) => axios.post(`rest-auth/login/`, data, { params: params }),
    signOut: (data, params = {}) => axios.post(`rest-auth/logout/`, data, { params: params }),
    getUser: (params = {}) => axios.get(`rest-auth/user/`, { params: params }),
    updateUser: (data, params = {}) => axios.put(`rest-auth/user/`, data, { params: params }),

    hospitalList: (params = {}) => axios.get(`api/v1/hospital/hospital-list/`, { params: params }),
    getBloodBank: (params = {}) => axios.get(`api/v1/hospital/blood-bank/`, { params: params }),
    createDonor: (data, params = {}) => axios.post(`api/v1/hospital/donor/`, data, { params: params }),
    getDonor: (params = {}) => axios.get(`api/v1/hospital/donor/`, { params: params }),
    getRecipient: (params = {}) => axios.get(`api/v1/hospital/recipient/`, { params: params }),
    createRecipient: (data, params = {}) => axios.post(`api/v1/hospital/recipient/`, data, { params: params }),
  }
  return api
}

export default useApiHelper;
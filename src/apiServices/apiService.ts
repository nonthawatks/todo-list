import axios from "axios";
import { toast } from "react-toastify";

const getConfig = (configService: any, params?: any) => {
  console.log("getConfig", params);
  let accessToken: string | null = "";
  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("accessToken");
  }
  const config = {
    baseURL: configService.baseApiPath
      ? configService.baseApiPath
      : process.env.BASE_API,
    onUploadProgress: (progressEvent: any) => {
      if (configService.onUploadProgress) {
        configService.onUploadProgress(
          Math.round((progressEvent.loaded * 100) / progressEvent.total)
        );
      }
    },
    onDownloadProgress: (progressEvent: any) => {
      if (configService.onDownloadProgress) {
        configService.onDownloadProgress(
          Math.round((progressEvent.loaded * 100) / progressEvent.total)
        );
      }
    },
    headers: {
      lang: params?.data?.lang,
      ...(params?.tokenId
        ? { Authorization: "bearer " + params?.tokenId }
        : accessToken
        ? { Authorization: "bearer " + accessToken }
        : {}),
      ...(configService?.headers || {}),
    },
    params: params || configService.params,
    data: configService.data,
    ...(configService.responseType
      ? { responseType: configService.responseType }
      : {}),
  };
  return config;
};

const axiosSuccess = (res: any, configService?: any) => {
  return res.data;
};

const axiosError = (error: any, configService: any = {}) => {
  console.log("error", { error });
  let status = error?.response?.status;
  if (!!error?.response?.data?.message && status !== 403 && status !== 401)
    if (configService.isShowError || configService.isShowError === undefined) {
      console.log("error message", error?.response?.data?.message);
      let customMessage =
        error?.response?.data?.message == "code_format_is_incorrect"
          ? "Reference code is incorrect format."
          : null;
      toast(customMessage || error?.response?.data?.message, {
        type: "error",
      });
    }
  if (status === 401 || status === 403) {
    //logout();
  }
  return false;
};

const axiosService = (
  type: string,
  url: string,
  params: any,
  configService: any
) => {
  console.log("params", params);
  const config = getConfig(configService, params);
  console.log("params config", config);
  switch (type) {
    case "get":
      return axios
        .get(url, config)
        .then((res) => axiosSuccess(res, configService))
        .catch((err) => axiosError(err, configService));
    case "post":
      return axios
        .post(url, params, { ...config, params: {} })
        .then((res) => axiosSuccess(res, configService))
        .catch((err) => axiosError(err, configService));
    case "put":
      return axios
        .put(url, params, { ...config, params: {} })
        .then((res) => axiosSuccess(res, configService))
        .catch((err) => axiosError(err, configService));
    case "patch":
      return axios
        .patch(url, params, config)
        .then((res) => axiosSuccess(res, configService))
        .catch((err) => axiosError(err, configService));
    case "delete":
      return axios
        .delete(url, config)
        .then((res) => axiosSuccess(res, configService))
        .catch((err) => axiosError(err, configService));
    default:
      return false;
  }
};

export default (configService = {}) => {
  return {
    get: (url: string, params?: any) =>
      axiosService("get", url, params, configService),
    post: (url: string, params: any) =>
      axiosService("post", url, params, configService),
    put: (url: string, params: any) =>
      axiosService("put", url, params, configService),
    patch: (url: string, params: any) =>
      axiosService("patch", url, params, configService),
    delete: (url: string, params: any) =>
      axiosService("delete", url, params, configService),
  };
};

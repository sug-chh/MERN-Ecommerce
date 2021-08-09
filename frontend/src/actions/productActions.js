import {
  PRODUCT_LIST_FAILED,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_FAILED,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAILED,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAILED,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAILED,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAILED,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAILED,
} from "../constants/productConstants";
import axios from "axios";

export function listProducts(keyword = '', pageNumber = '') {
  return async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_LIST_REQUEST
      });
      const {
        data
      } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAILED,
        payload: error.response && error.response.data.message ?
          error.response.data.message : error.message,
      });
    }
  };
}

export function listProductDetails(id) {
  return async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_DETAILS_REQUEST
      });
      const {
        data
      } = await axios.get(`/api/products/${id}`);
      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAILED,
        payload: error.response && error.response.data.message ?
          error.response.data.message : error.message,
      });
    }
  };
}

export function deleteProduct(id) {
  return async function (dispatch, getState) {
    try {
      dispatch({
        type: PRODUCT_DELETE_REQUEST,
      });

      const config = {
        headers: {
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };
      await axios.delete(`/api/products/${id}`, config);
      dispatch({
        type: PRODUCT_DELETE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_DELETE_FAILED,
        payload: error.response && error.response.data.message ?
          error.response.data.message : error.message,
      });
    }
  };
}

export function createProduct() {
  return async function (dispatch, getState) {
    try {
      dispatch({
        type: PRODUCT_CREATE_REQUEST,
      });

      const config = {
        headers: {
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };
      const {
        data
      } = await axios.post(`/api/products`, {}, config);
      dispatch({
        type: PRODUCT_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_FAILED,
        payload: error.response && error.response.data.message ?
          error.response.data.message : error.message,
      });
    }
  };
}


export function updateProduct(id, product) {
  return async function (dispatch, getState) {
    try {
      dispatch({
        type: PRODUCT_UPDATE_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };
      const {
        data
      } = await axios.put(`/api/products/${id}`, product, config);
      dispatch({
        type: PRODUCT_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_UPDATE_FAILED,
        payload: error.response && error.response.data.message ?
          error.response.data.message : error.message,
      });
    }
  };
}

export function createProductReview(productId, review) {
  return async function (dispatch, getState) {
    try {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };
      await axios.post(`/api/products/${productId}/reviews`, review, config);
      dispatch({
        type: PRODUCT_CREATE_REVIEW_SUCCESS,

      });
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAILED,
        payload: error.response && error.response.data.message ?
          error.response.data.message : error.message,
      });
    }
  };
}


export function listTopProducts() {
  return async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_TOP_REQUEST
      });
      const {
        data
      } = await axios.get(`/api/products/top`);
      dispatch({
        type: PRODUCT_TOP_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_TOP_FAILED,
        payload: error.response && error.response.data.message ?
          error.response.data.message : error.message,
      });
    }
  };
}
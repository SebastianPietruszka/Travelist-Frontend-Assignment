import axios from '../axios-instance';

export const getApiElements = (url, actionName, additionalPayload) => {
  const request = axios.get(url);

  return dispatch => {
    dispatch({
      type: `${actionName}_START`,
    });
    return request
      .then(({ data }) => {
        dispatch({
          type: `${actionName}_FULFILLED`,
          payload: data,
          additionalPayload,
        });
        return data;
      })
      .catch(error => {
        dispatch({
          type: `${actionName}_FAILED`,
        });
        return Promise.reject(error);
      });
  };
};

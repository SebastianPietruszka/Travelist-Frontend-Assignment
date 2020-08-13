import qs from 'query-string';
import { getApiElements } from 'Helpers/api';
import { GET_OFFER_LIST, SET_OFFER_TO_SCROLL } from './constants';

export const getOffers = () =>
  getApiElements(
    `/offers?${qs.stringify({
      limit: 50,
      offset: 50,
      status: 'published',
      sort: 'title',
    })}`,
    GET_OFFER_LIST
  );

export const setOfferToScroll = elementId => ({
  type: SET_OFFER_TO_SCROLL,
  payload: elementId,
});

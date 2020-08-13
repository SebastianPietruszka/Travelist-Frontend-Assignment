import { createRef } from 'react';
import { GET_OFFER_LIST, SET_OFFER_TO_SCROLL } from './constants';

const initialState = {
  offersFetching: false,
  offers: [],
  offersById: {},
  offerToScroll: null,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case `${GET_OFFER_LIST}_START`:
      return { ...state, offersFetching: true };
    case `${GET_OFFER_LIST}_FULFILLED`: {
      // filtering by published status should be managed by getOffer request param
      const publishedOffers = action.payload
        .filter(({ status }) => status === 'published')
        .map(offer => ({ ...offer, ref: createRef() }));
      return {
        ...state,
        offersFetching: false,
        offers: [...state.offers, ...publishedOffers],
        offersById: {
          ...state.offersById,
          ...publishedOffers.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}),
        },
      };
    }
    case `${GET_OFFER_LIST}_FAILED`:
      return { ...state, offersFetching: false };

    case SET_OFFER_TO_SCROLL:
      return {
        ...state,
        offerToScroll: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;

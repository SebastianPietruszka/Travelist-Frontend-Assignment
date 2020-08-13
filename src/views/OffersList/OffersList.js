import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Info from '@material-ui/icons/Info';
import {
  getOffers as getOffersAction,
  setOfferToScroll as setOfferToScrollAction,
} from './actions';

function OffersList({ offers, offerToScroll, offersById, getOffers, setOfferToScroll }) {
  const history = useHistory();
  const offersNumber = offers.length;
  const onScrollListener = () => {
    const triggerRef = offers?.[offersNumber - 5]?.ref?.current;

    // dont fetch offers on scroll if offers number is less than 5 or triggerRef is not set yet
    if (!triggerRef) return;

    const triggerPosition = triggerRef.offsetTop;
    const windowHeight = window.innerHeight;
    const scrollPosition = document.documentElement.scrollTop;

    if (windowHeight + scrollPosition > triggerPosition) getOffers();
  };

  useEffect(() => {
    // total records to fetch should be defined in getOffers request param
    if (offersNumber < 30) getOffers();
  }, [offers]);

  useEffect(() => {
    window.addEventListener('scroll', onScrollListener);

    return () => window.removeEventListener('scroll', onScrollListener);
  }, [offersById]);

  useEffect(() => {
    if (offerToScroll) {
      const { current: offerToScrollRef } = offersById[offerToScroll].ref;

      offerToScrollRef.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [offerToScroll]);

  return (
    <>
      <h1>Offer List</h1>
      <List>
        {offers.map(({ id, title }) => (
          <ListItem
            ref={offersById[id].ref}
            key={id}
            button
            onClick={() => {
              setOfferToScroll(id);
              history.push(`/${id}`);
            }}
          >
            <ListItemIcon>
              <Info />
            </ListItemIcon>
            <ListItemText primary={title} />
          </ListItem>
        ))}
      </List>
    </>
  );
}

const mapStateToProps = ({ offers, offersById, offerToScroll }) => ({
  offers,
  offersById,
  offerToScroll,
});

const mapDispatchToProps = {
  getOffers: getOffersAction,
  setOfferToScroll: setOfferToScrollAction,
};

OffersList.defaultProps = {
  offerToScroll: '',
  offersById: {},
};

OffersList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object).isRequired,
  offersById: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    img_url: PropTypes.string,
    price: PropTypes.number,
    discount: PropTypes.number,
    rating: PropTypes.number,
    status: PropTypes.string,
    created_at: PropTypes.string,
  }),
  offerToScroll: PropTypes.number,
  getOffers: PropTypes.func.isRequired,
  setOfferToScroll: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(OffersList);

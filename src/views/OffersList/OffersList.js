import React, { useEffect, useMemo, createRef } from 'react';
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

function OffersList({ offers, offerToScroll, getOffers, setOfferToScroll }) {
  const history = useHistory();
  const refsById = useMemo(
    () =>
      offers.reduce(
        (acc, value) => ({
          ...acc,
          [value.id]: createRef(),
        }),
        {}
      ),
    [offers]
  );
  const refValues = useMemo(() => Object.values(refsById), [refsById]);
  const onScrollListener = () => {
    const refsNumber = refValues.length;
    const triggerRef = refValues?.[refsNumber - 5]?.current;

    // dont fetch offers on scroll if offers number is less than 5 or triggerRef is not set yet
    if (!triggerRef) return;

    const triggerPosition = triggerRef.offsetTop;
    const windowHeight = window.innerHeight;
    const scrollPosition = document.documentElement.scrollTop;

    if (windowHeight + scrollPosition > triggerPosition) getOffers();
  };

  useEffect(() => {
    // total records to fetch should be defined in getOffers request param
    if (offers.length < 30) getOffers();
  }, [offers]);

  useEffect(() => {
    window.addEventListener('scroll', onScrollListener);

    return () => window.removeEventListener('scroll', onScrollListener);
  }, [refsById]);

  useEffect(() => {
    if (offerToScroll) {
      refsById[offerToScroll].current.scrollIntoView({
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
            ref={refsById[id]}
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

const mapStateToProps = ({ offers, offerToScroll }) => ({ offers, offerToScroll });

const mapDispatchToProps = {
  getOffers: getOffersAction,
  setOfferToScroll: setOfferToScrollAction,
};

OffersList.defaultProps = {
  offerToScroll: '',
};

OffersList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object).isRequired,
  offerToScroll: PropTypes.number,
  getOffers: PropTypes.func.isRequired,
  setOfferToScroll: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(OffersList);

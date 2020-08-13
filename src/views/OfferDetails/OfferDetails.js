import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import ArrowLeftIcon from '@material-ui/icons/ArrowBack';

import './OfferDetails.scss';

const getFormattedLabel = label => label.split('_').join(' ');

function OfferDetail({ offersById }) {
  const history = useHistory();
  const { offerId } = useParams();
  const selectedOffer = offersById[offerId];

  useEffect(() => {
    if (!selectedOffer) history.push('/');
  }, []);

  if (!selectedOffer) return null;
  return (
    <>
      <h1>
        <IconButton onClick={() => history.push('/')}>
          <ArrowLeftIcon fontSize="large" />
        </IconButton>
        Offer Details
      </h1>
      <Card>
        <CardContent>
          {Object.keys(selectedOffer).map(key => (
            <div key={key}>
              <strong className="OfferDetail__label">{getFormattedLabel(key)}: </strong>
              {selectedOffer[key]}
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}

OfferDetail.defaultProps = {
  offersById: {},
};

OfferDetail.propTypes = {
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
};

const mapStateToProps = ({ offersById }) => ({ offersById });

export default connect(mapStateToProps)(OfferDetail);

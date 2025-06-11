import React from 'react';
import PropTypes from 'prop-types';

const AvailabilityLabel = ({ type }) => {
  if (type === 'available') {
    return (
      <div className="bg-gray-100 p-6 rounded-lg mb-6">
        <h3 className="text-2xl font-bold text-gray-700 mb-2">Available</h3>
        <p className="text-gray-800 font-medium mb-3">Good news! This dog is still available to apply for!</p>
        <p className="text-gray-600 text-sm">
          Please note that only those selected for the next steps will be contacted. 
          If you are not contacted, don't fret, please keep an eye on our website as we update new available dogs frequently.
        </p>
      </div>
    );
  }
  
  if (type === 'pending') {
    return (
      <div className="bg-gray-100 p-6 rounded-lg mb-6">
        <h3 className="text-2xl font-bold text-gray-700 mb-2">Application Pending</h3>
        <p className="text-gray-800 font-medium mb-3">This means someone has already applied to adopt this dog, have had their meet and are potentially adopting the dog.</p>
        <p className="text-gray-600 text-sm">
          Applications will still be accepted, however we will only contact those selected if the right fit has yet to be found for the dog.
        </p>
      </div>
    );
  }
  
  return null;
};

AvailabilityLabel.propTypes = {
  type: PropTypes.oneOf(['available', 'pending']).isRequired
};

export default AvailabilityLabel;
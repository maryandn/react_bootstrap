import React from 'react';
import _ from 'lodash/fp';

export const formError = (label, errType, text, errors) => (
    <>
        {
            _.get(`${label}.type`, errors) === errType && (<p>{text}</p>)
        }
        </>
);

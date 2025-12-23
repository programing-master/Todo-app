import React from "react";
import { Helmet } from "react-helmet";
import PropTypes from 'prop-types';
export default function Title({ title }) {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
    </Helmet>
  );
}

Title.propTypes={
    title:PropTypes.string
}

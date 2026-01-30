import { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <Fragment>
      <Helmet>
        <title>6 cities: not found</title>
      </Helmet>
      <h1>
        404.
        <br />
        <small>Page not found.</small>
      </h1>
      <Link to="/">Go to main page.</Link>
    </Fragment>
  );
}

export default NotFound;

import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './results.cssmodule.css';

@cssmodules(styles)
class Results extends React.Component {

  render() {
    return (
      <div className="results-component" styleName="results-component">
        Please edit src/components//Results.js to update this component!
      </div>
    );
  }
}

Results.displayName = 'Results';
Results.propTypes = {};
Results.defaultProps = {};

export default Results;

import React from 'react';

import 'antd/dist/antd.css';

const FooterCustom = () => {
  return (
    <div className='footer-custom' style={{ backgroundColor: '#181b20' }}>
      <h5
        style={{
          color: 'white',
          height: '25px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '10px',
        }}>
        siTemPat © 2021 by Arez Development
      </h5>
    </div>
  );
};

export default FooterCustom;

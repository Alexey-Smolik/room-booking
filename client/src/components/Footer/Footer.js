import React from 'react';

const Footer  = () => {

    return(
        <div  className="footer_on_auth">
            <div className="footer_block">
                <img className="img_logo" src={"/images/logo1.png"} alt={"logo"} />
            </div>
            <span className='firm_name'>© 2018
                <a className="elinext"
                   href="https://www.elinext.com/"
                   target="_blank"
                   rel="noopener noreferrer" >
                    ELINEXT
                </a>
            </span>
        </div>
    );
};

export default Footer;
import React from 'react';

const Footer  = () => {

    return(
        <div id="footer">
            <div className="footer_block">
                <span className='firm_name'>© 2018 <a className="elinext" href="https://www.elinext.com/" target="_blank">ELINEXT</a></span>
            </div>
            <img className="img_logo" src={"/images/logo.png"} alt={"logo"} />
        </div>
    );
};

export default Footer;
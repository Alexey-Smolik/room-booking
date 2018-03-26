import React from 'react';

const Footer  = () => {

    return(
        <div id="footer">
            <div className="footer_block">
                <img className="img_logo" src={"/images/logo1.png"} alt={"logo"} />
            </div>
            <span className='firm_name'>© 2018 <a className="elinext" href="https://www.elinext.com/" target="_blank">ELINEXT</a></span>
        </div>
    );
};

export default Footer;
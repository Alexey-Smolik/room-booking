import React , { Component } from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';


class LeftNavBar extends Component {
    render() {
        return(
            <aside>
                <nav>                
                    <ul className="aside-menu">
                        <li><Link to={'/booktable'}>LOREM IPSUM</Link></li>
                        <li><Link to={'/secondpage'}>DONEC TINCIDUNT LAOREET</Link></li>
                        <li><a href="/vestibulum/">VESTIBULUM ELIT</a></li>
                        <li><a href="/etiam/">ETIAM PHARETRA</a></li>
                        <li><a href="/phasellus/">PHASELLUS PLACERAT</a></li>
                        <li><a href="/cras/">CRAS ET NISI VITAE ODIO</a></li>
                    </ul>
                </nav>
            </aside>   
        );
    }
}

export default LeftNavBar; 
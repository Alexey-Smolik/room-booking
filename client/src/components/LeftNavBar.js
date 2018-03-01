import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from "../actions";


class LeftNavBar extends Component {


    renderMenu(){
        console.log("LEFT");
        if(this.props.rooms != null) {
            return this.props.rooms.map( index => {
                return (<li><Link to={'/'+index}>{index.name}</Link></li>);
            });
        }
        return (
            <li><Link to={'/booktable'}>LOREM IPSUM</Link></li>
        )
    }


    render() {
        return(
            <aside>
                <nav>                
                    <ul className="aside-menu">
                        {/*<li><Link to={'/booktable'}>LOREM IPSUM</Link></li>*/}
                        {/*<li><Link to={'/secondpage'}>DONEC TINCIDUNT LAOREET</Link></li>*/}
                        {/*<li><a href="/vestibulum/">VESTIBULUM ELIT</a></li>*/}
                        {/*<li><a href="/etiam/">ETIAM PHARETRA</a></li>*/}
                        {/*<li><a href="/phasellus/">PHASELLUS PLACERAT</a></li>*/}
                        {/*<li onClick={this.renderMenu.bind(this)}><a >GET ROOMS</a></li>*/}
                        {this.renderMenu()}
                    </ul>
                </nav>
            </aside>   
        );
    }
}


function mapStateToProps({room}) {
    return { rooms: room }
}


export default connect(mapStateToProps, actions)(LeftNavBar);


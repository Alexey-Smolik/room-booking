import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class LeftNavBar extends Component {

    chAxios(){
        console.log(axios.get('/api/rooms'));
    }

    renderMenu(){
        if(this.state != null) {
            console.log("true");
            return this.props.rooms.map((index, key) => {
                <li key={key}>{index}</li>
            });
        }
        console.log(this.state);
        return null;
    }


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
                        <li onClick={this.props.getRooms}><a >GET ROOMS</a></li>
                        {this.renderMenu()}
                    </ul>
                </nav>
            </aside>   
        );
    }
}


function mapStateToProps({rooms}) {
    return { rooms: rooms }
}


export default connect(mapStateToProps)(LeftNavBar);

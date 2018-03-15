import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from "../actions";


class LeftNavBar extends Component {

// Rendering room-info window from props that takes from onclick-event.  

    constructor(props){
        super(props);
        this.state = {
            id : "",
            infoVisible: false,
            description: "",
            issues: "No Issues",
            image: {
                src: "img.jpg",
                alt: "#"
            }
        }

        this.infoHandler = this.infoHandler.bind(this);
    }

    infoHandler(index){
        this.setState({
            id: index.id,
            description: index.description        
        })

        if(index.id === this.state.id || this.state.id !== index.id && this.state.infoVisible == false) {
            this.setState({
                infoVisible: !this.state.infoVisible
            });
        }
    }

    infoRender(){
        if(this.state.infoVisible && this.state.id) {
            return(
                <div className="room-info">
                    <div className="info-close" onClick={() => this.infoHandler(this.state.id)}>x</div>
                    <div className="room-image">
                        <img src={this.state.image.src} alt={this.state.image.alt} />
                    </div>
                    <div className="room-description">Description: {this.state.description}</div>
                    <div className="room-issues">Issues: {this.state.issues}</div>
                </div>
            );
        }
    }

// End of info render.

    componentDidMount() {
        this.props.getRooms();
        this.props.getCurrentUser();
    }

    getDataTable(id){
        this.props.getEvents(id);
    }

    renderMenu(){
        if(this.props.rooms) {
            return this.props.rooms.map( (index, key) => {
                return (
                    <li key={key}>
                        <Link to={`/room/`+ index.id} onClick={() => this.getDataTable(index.id)}>
                            {index.name}
                        </Link>
                        <div className="info">
                            <button className="info-button" onClick={() => this.infoHandler(index)}>i</button>
                        </div>
                    </li>
                );
            });
        }
        return (
            <li>Click me</li>
        )
    }

    render() {
        return(
            <aside>
                <nav>
                    <ul className="aside-menu">
                        {this.renderMenu()}
                        {this.infoRender()}
                    </ul>
                </nav>
            </aside>
        );
    }
}

function mapStateToProps({ rooms }) {
    return {
        rooms: rooms
    };
}

export default connect(mapStateToProps,actions)(LeftNavBar);

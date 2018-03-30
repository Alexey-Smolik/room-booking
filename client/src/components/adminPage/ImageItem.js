import React from 'react';
import { connect } from 'react-redux';
import { Button, ControlLabel , FormControl,Jumbotron, Grid, Row,Col, Thumbnail, Image, Carousel } from 'react-bootstrap';

import Lightbox from 'react-image-lightbox';
import {
    getRoomImages,
    deleteRoomImage
} from '../../actions/index';

class ImageItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            roomName: '',
            searchValue: '',
            addFieldIsVisible: false,
            photoIndex: this.props.index,
            isLightboxOpen: false,
            isMouseEnter: false
        };
    }


    render() {
        let {photoIndex, isLightboxOpen, isMouseEnter} = this.state;
        let imagesUrl = [];
        this.props.images.map((image) => {
            imagesUrl.push(`http://localhost:3000/${image.url}`)
        });
        return (
            <div /*className="jumbotron"*/ style={{ display: "inline-block"}}>

                { isMouseEnter && <Button bsStyle="danger" style={{position:"absolute"}} onMouseEnter={() => this.setState({isMouseEnter: true})} onMouseLeave={() => this.setState({isMouseEnter: false})} onClick={() => {this.props.dispatch(deleteRoomImage(this.props.id))}}>X</Button>}
                <img onClick={()=>{this.setState({isLightboxOpen: true})}}  onMouseEnter={() => this.setState({isMouseEnter: true})} onMouseLeave={() => this.setState({isMouseEnter: false})} style={{width:"200px", height: "200px"}} src={`http://localhost:3000/${this.props.url}`} thumbnail />



                {isLightboxOpen &&
                <Lightbox
                    mainSrc={imagesUrl[photoIndex]}
                    nextSrc={imagesUrl[(photoIndex + 1) % imagesUrl.length]}
                    prevSrc={imagesUrl[(photoIndex + imagesUrl.length - 1) % imagesUrl.length]}

                    onCloseRequest={() => this.setState({ isLightboxOpen: false })}
                    onMovePrevRequest={() => this.setState({
                        photoIndex: (photoIndex + imagesUrl.length - 1) % imagesUrl.length,
                    })}
                    onMoveNextRequest={() => this.setState({
                        photoIndex: (photoIndex + 1) % imagesUrl.length,
                    })}
                />
                }
                    </div>



        );
    }
}
function mapStateToProps ({user, images }) {
    return {
        user: user,
        images: images
    }
}

export default connect(mapStateToProps)(ImageItem);
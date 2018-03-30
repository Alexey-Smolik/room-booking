import React from 'react';
import { connect } from 'react-redux';
import { Button, ControlLabel , FormControl,Jumbotron, Grid, Row,Col, Thumbnail, Image, Carousel } from 'react-bootstrap';
import ImageItem from './ImageItem'
import Dropzone from 'react-dropzone'
import {
    getRoomImages,
    deleteRoomImage,
    addRoomImage,
} from '../../actions/index';

class ImagesContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.props.dispatch(getRoomImages(this.props.roomId));

    }
handleDrop(image) {

this.props.dispatch(addRoomImage(image,this.props.roomId))
}


    render() {

        return (
            <Jumbotron>
                { this.props.user && this.props.user.role === 1 ?
                    <div>
                        <h3>Room images</h3>
                        {this.props.images.map((image, index) => {
                            return <ImageItem
                                id={image.id}
                                url={image.url}
                                index = {index}
                                key={image.id}
                            />
                        }
                        )}
<Dropzone   onDrop={()=>{this.handleDrop()}}

            accept="image/*"
            style={{height:"200px", width: "200px", float:"right", backgroundImage: 'url("https://image.flaticon.com/icons/svg/118/118748.svg")'}}/>
                    </div>
                    : <div>
                        <h3>Your haven't permission to view this page</h3>
                    </div>
                }
            </Jumbotron>
        );
    }
}
function mapStateToProps ({user, images }) {
    return {
        user: user,
        images: images
    }
}

export default connect(mapStateToProps)(ImagesContainer);
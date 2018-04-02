import React from 'react';
import { connect } from 'react-redux';
import {Jumbotron } from 'react-bootstrap';
import ImageItem from './ImageItem'
import Dropzone from 'react-dropzone'
import {
    getRoomImages,
    addRoomImage,
} from '../../actions/index';

class ImagesContainer extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch(getRoomImages(this.props.roomID));
    }

    onDropImage(image) {
        let formData = new FormData();
        formData.append('file',image);
        this.props.dispatch(addRoomImage(formData, this.props.roomID))
    }

    render() {
        return (
            <Jumbotron>
                { this.props.user.currentUser && this.props.user.currentUser.role === 1 ?
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
                        <Dropzone
                            onDrop={(images) =>{this.onDropImage(images[0])}}
                            accept="image/*"
                            style={{height:"200px", width: "200px", float:"right", backgroundImage: 'url("https://image.flaticon.com/icons/svg/118/118748.svg")'}}
                            acceptStyle={{backgroundColor:' red'}}
                        />
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
        user,
        images,
    }
}

export default connect(mapStateToProps)(ImagesContainer);
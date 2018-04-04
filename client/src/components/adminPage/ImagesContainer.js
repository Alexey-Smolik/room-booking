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
            <div className="images_for_rooms">
                { this.props.user && this.props.user.currentUser.role === 1 ?
                    <div>
                        <Dropzone
                            multiple={false}
                            onDrop={(images) =>{this.onDropImage(images[0])}}
                            accept="image/*"
                            style={{
                                height:"35px",
                                width: "35px",
                                backgroundImage: 'url("https://cdn0.iconfinder.com/data/icons/snow_sabre_silver/512/folder_web_upload.png")',
                                backgroundSize: "cover",
                                float:"right",
                                margin: "1px"
                            }}
                        />
                        {this.props.images.map((image, index) => {
                            return <ImageItem
                                id={image.id}
                                url={image.url}
                                index = {index}
                                key={image.id}
                            />
                        }
                        )}
                    </div>
                    : <div>
                        <h3>Your haven't permission to view this page</h3>
                    </div>
                }
            </div>
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
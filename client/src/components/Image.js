import React from 'react';

const Image = () => {
    return (
        <form method='post' enctype='multipart/form-data' action='/api/rooms/1/image'>
            <input type='file' name='file' />
            <input type='submit' />
        </form>
    )
};

export default Image;
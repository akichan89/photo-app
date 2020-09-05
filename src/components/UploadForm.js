import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { beginAddPhoto } from '../actions/photos';

const UploadForm = ({ errors, dispatch }) => {
    const [photo, setPhoto] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        setErrorMsg(errors);
    }, [errors]);

    const handleOnChange = (event) => {
        event.preventDefault();
        if (photo) {
            setErrorMsg('');
            dispatch(beginAddPhoto(photo));
            setIsSubmitted(true);
        }
    };

    return (
        <React.Fragment>
            {errorMsg && errorMsg.upload_error ? (
                <p className="errorMsg centered-message">{errorMsg.upload_error}</p>
            ) : (
                isSubmitted && (
                    <p className="successMsg centered-message">
                        Photo Uploaded Successfully!
                    </p>
                )
            
            )}

            <Form
                onSubmit={handleFormSubmit}
                method="post"
                encType="multipart/form-data"
                className="upload-form"

            >

            <Form.Group>
                <Form.Label>Choose photo to upload</Form.Label>
                <Form.Control type="file" name="photo" onChange={handleOnChange} />
            </Form.Group>

            <Button 
                variant="primary"
                type="submit"
                className={`${!photo ? 'disabled submit-btn' : 'submit-btn'}`}
                disabled={photo ? false : true}     
            >
                Upload
            </Button>
            </Form>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    photos: state.photos || [],
    errors: state.errors || [],
});

export default connect(mapStateToProps)(UploadForm);
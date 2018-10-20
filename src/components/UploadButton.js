import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

const styles = theme => ({
    input: {
        display: "none"
    }
});

class UploadButton extends React.Component {
    render() {
        const { classes, onUpload, inputRef } = this.props;

        return (
            <React.Fragment>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="image-input"
                    type="file"
                    capture="camera"
                    ref={inputRef}
                    onChange={onUpload}
                />
                <label htmlFor="image-input">
                    <Button color="secondary" component="span">
                        <PhotoCameraIcon />
                        Add photo
                    </Button>
                </label>
            </React.Fragment>
        );
    }
}
UploadButton.propTypes = {
    inputRef: PropTypes.any.isRequired,
    onUpload: PropTypes.func.isRequired
};

export default withStyles(styles)(UploadButton);

import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import withRoot from "./withRoot";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import CloudIcon from "@material-ui/icons/CloudUpload";

const styles = {
    root: {
        display: "flex",
        justifyContent: "center"
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "column"
    }
};

class App extends Component {
    render() {
        const classes = this.props;
        console.log(classes);

        return (
            <div style={styles.root}>
                <div style={styles.buttonContainer}>
                    <Button color="primary">
                        <PhotoCameraIcon />
                        Take Photo
                    </Button>
                    <Button color="secondary">
                        <CloudIcon />
                        Upload file
                    </Button>
                </div>
            </div>
        );
    }
}

export default withRoot(withStyles(styles)(App));

import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import withRoot from "./withRoot";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import httpClient from "./httpClient";

const styles = theme => ({
    root: {
        width: "auto",
        display: "block", // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
            width: 600,
            marginLeft: "auto",
            marginRight: "auto"
        }
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "column",
        marginTop: theme.spacing.unit * 8,
        alignItems: "center",
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit *
            3}px ${theme.spacing.unit * 3}px`
    },
    input: {
        display: "none"
    }
});

class App extends Component {
    onFileUpload = e => {
        if (e.target.files && e.target.files.length) {
            // new file uploaded
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append("image", file);
            const config = {
                headers: {
                    "content-type": "multipart/form-data"
                }
            };
            httpClient
                .post("/upload", formData, config)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Paper className={classes.buttonContainer}>
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="flat-button-file"
                        type="file"
                        capture="camera"
                        onChange={this.onFileUpload}
                    />
                    <label htmlFor="flat-button-file">
                        <Button color="secondary" component="span">
                            <PhotoCameraIcon />
                            Add photo
                        </Button>
                    </label>
                </Paper>
            </div>
        );
    }
}

export default withRoot(withStyles(styles)(App));

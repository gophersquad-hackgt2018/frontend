import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import withRoot from "./withRoot";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import CloudIcon from "@material-ui/icons/CloudUpload";

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
    }
});

class App extends Component {
    render() {
        const { classes } = this.props;
        console.log(classes);

        return (
            <div className={classes.root}>
                <Paper className={classes.buttonContainer}>
                    <Button color="primary">
                        <PhotoCameraIcon />
                        Take Photo
                    </Button>
                    <Button color="secondary">
                        <CloudIcon />
                        Upload file
                    </Button>
                </Paper>
            </div>
        );
    }
}

export default withRoot(withStyles(styles)(App));

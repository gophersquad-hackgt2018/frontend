import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import withRoot from "./withRoot";
import httpClient from "./httpClient";
import UploadButton from "./components/UploadButton";

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
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    handleUpload = e => {
        if (e.target.files && e.target.files.length) {
            // new file uploaded
            this.setState({
                loading: true
            });
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
                })
                .finally(() => {
                    this.setState({
                        loading: false
                    });
                });
        }
    };

    render() {
        const { classes } = this.props;
        const { loading } = this.state;

        return (
            <div className={classes.root}>
                <Paper className={classes.buttonContainer}>
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <UploadButton onUpload={this.handleUpload} />
                    )}
                </Paper>
            </div>
        );
    }
}

export default withRoot(withStyles(styles)(App));

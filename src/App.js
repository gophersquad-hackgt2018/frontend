import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import withRoot from "./withRoot";
import httpClient from "./httpClient";
import UploadButton from "./components/UploadButton";
import DocumentCards from "./components/DocumentCards";
import Footer from "./components/Footer";

const styles = theme => ({
    root: {
        width: "auto",
        display: "flex",
        flexDirection: "column",
        height: "100%"
    },
    buttonContainer: {
        width: 600,
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        flexDirection: "column",
        marginTop: theme.spacing.unit * 8,
        alignItems: "center",
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit *
            3}px ${theme.spacing.unit * 3}px`
    },
    instructions: {
        fontSize: "16px",
        marginTop: `${theme.spacing.unit * 1}px`,
        marginLeft: `${theme.spacing.unit * 5}px`,
        marginRight: `${theme.spacing.unit * 5}px`
    },
    content: {
        flex: "1 0 auto"
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
                <div className={classes.content}>
                    <Paper className={classes.buttonContainer}>
                        <Typography variant="h1" align="center" gutterBottom>
                            IcoMath
                        </Typography>
                        <Typography
                            className={classes.instructions}
                            align="center"
                            color="textSecondary"
                            paragraph
                        >
                            Upload an image of the math notesheet that you would
                            like to transcribe
                        </Typography>
                        {loading ? (
                            <CircularProgress />
                        ) : (
                            <UploadButton onUpload={this.handleUpload} />
                        )}
                    </Paper>
                    <DocumentCards />
                </div>
                <Footer />
            </div>
        );
    }
}

export default withRoot(withStyles(styles)(App));

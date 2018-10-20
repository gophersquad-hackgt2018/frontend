import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import withRoot from "./withRoot";
import httpClient from "./httpClient";
import DocumentCard from "./components/DocumentCard";
import UploadButton from "./components/UploadButton";
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
    },
    cardContainer: {
        marginTop: theme.spacing.unit * 4,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 4,
        minHeight: "250px"
    }
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            cardsLoading: true,
            documents: []
        };
    }

    componentDidMount() {
        httpClient
            .get("/documents")
            .then(resp => {
                if (resp.data) {
                    this.setState({
                        documents: resp.data.data
                    });
                } else {
                    console.log("No resp.data");
                }
            })
            .catch(err => {
                // show toast
                console.log(err);
            })
            .finally(() => {
                this.setState({
                    cardsLoading: false
                });
            });
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
        const { loading, cardsLoading, documents } = this.state;

        return (
            <div className={classes.root}>
                <div className={classes.content}>
                    <Paper className={classes.buttonContainer}>
                        <Typography variant="h1" align="center" gutterBottom>
                            IsoMath
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
                    <div className={classes.cardContainer}>
                        <Grid container spacing={16}>
                            {cardsLoading ? (
                                <CircularProgress />
                            ) : (
                                documents.map(doc => (
                                    <DocumentCard {...doc} key={doc._id} />
                                ))
                            )}
                        </Grid>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default withRoot(withStyles(styles)(App));

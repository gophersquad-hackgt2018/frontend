import React from "react";
import Grid from "@material-ui/core/Grid";
import DocumentCard from "./DocumentCard";
import { withStyles } from "@material-ui/core/styles";
import httpClient from "../httpClient";
import { CircularProgress } from "@material-ui/core";

const styles = theme => ({
    container: {
        marginTop: theme.spacing.unit * 4,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 4,
        minHeight: "250px"
    },
    loader: {
        textAlign: "center"
    }
});

class DocumentCards extends React.Component {
    state = {
        loading: true,
        documents: []
    };

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
                    loading: false
                });
            });
    }

    render() {
        const { classes } = this.props;
        const { loading, documents } = this.state;

        return (
            <div className={classes.container}>
                <Grid container spacing={16}>
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        documents.map(doc => <DocumentCard {...doc} />)
                    )}
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(DocumentCards);

import React from "react";
import Grid from "@material-ui/core/Grid";
import DocumentCard from "./DocumentCard";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    container: {
        marginTop: theme.spacing.unit * 4,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 4,
        minHeight: "250px"
    }
});

class DocumentCards extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.container}>
                <Grid container>
                    <DocumentCard cardId={1} loading />
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(DocumentCards);

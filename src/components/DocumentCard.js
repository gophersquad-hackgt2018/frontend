import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteIcon from "@material-ui/icons/Delete";
import DownloadIcon from "@material-ui/icons/GetApp";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

const styles = theme => ({
    imagePreview: {
        height: "150px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    leftIcon: {
        marginRight: theme.spacing.unit
    }
});

class DocumentCard extends React.Component {
    state = {
        deleteDialogOpen: false
    };

    handleDeleteClose = () => {
        this.setState({
            deleteDialogOpen: false
        });
    };

    handleDeleteConfirm = () => {
        this.props.onDelete();
        this.setState({
            deleteDialogOpen: false
        });
    };

    handleDeleteClick = () => {
        this.setState({
            deleteDialogOpen: true
        });
    };

    render() {
        const { classes, id, name, loading, previewURL, url } = this.props;
        const { deleteDialogOpen } = this.state;

        return (
            <React.Fragment>
                <Grid item key={id} sm={6} md={4} lg={3}>
                    <Card className={classes.card}>
                        <CardMedia
                            className={classes.imagePreview}
                            image={
                                previewURL ||
                                "https://www.foot.com/wp-content/uploads/2017/03/placeholder.gif"
                            }
                            title={name}
                        >
                            {loading && <CircularProgress />}
                        </CardMedia>
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h6">
                                {name}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                size="small"
                                color="primary"
                                disabled={loading}
                                href={url}
                            >
                                <DownloadIcon className={classes.leftIcon} />
                                Download
                            </Button>
                            <Button
                                size="small"
                                color="secondary"
                                onClick={this.handleDeleteClick}
                                disabled={loading}
                            >
                                <DeleteIcon className={classes.leftIcon} />
                                Remove
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Dialog
                    open={deleteDialogOpen}
                    onClose={this.handleDeleteClose}
                    aria-labelledby="delete-dialog-title"
                >
                    <DialogTitle id="delete-dialog-title">
                        Are you sure you want to delete this document?
                    </DialogTitle>
                    <DialogActions>
                        <Button
                            color="secondary"
                            onClick={this.handleDeleteClose}
                        >
                            No
                        </Button>
                        <Button
                            color="primary"
                            onClick={this.handleDeleteConfirm}
                        >
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}
DocumentCard.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    url: PropTypes.string,
    previewURL: PropTypes.string,
    loading: PropTypes.bool,
    onDelete: PropTypes.func.isRequired
};

export default withStyles(styles)(DocumentCard);

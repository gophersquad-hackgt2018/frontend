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

const styles = theme => ({
    imagePreview: {
        height: "150px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
});

class DocumentCard extends React.Component {
    render() {
        const { classes, id, name, loading, previewURL } = this.props;

        return (
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
                        <Button size="small" color="primary" disabled={loading}>
                            View
                        </Button>
                        <Button size="small" color="primary" disabled={loading}>
                            Remove
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        );
    }
}
DocumentCard.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    url: PropTypes.string,
    previewURL: PropTypes.string,
    loading: PropTypes.boolean
};

export default withStyles(styles)(DocumentCard);

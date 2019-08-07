import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = theme => ({
    card: {
        maxWidth: 280,
    },
    media: {
        height: 0,
        // paddingTop: '56.25%', // 16:9
        paddingTop: '50%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    avatar: {
        backgroundColor: red[500],
    },
});

class SingleActivityDisplay extends React.Component {
    state = {expanded: false};

    render() {
        const {classes} = this.props;
        const {activity} = this.props;
        return (
            <div>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar
                                alt="photo"
                                src={activity.photo}
                                className={classes.avatar}
                            />
                        }
                        action={
                            <IconButton>
                                <MoreVertIcon/>
                            </IconButton>
                        }
                        title={activity.name}
                        subheader={activity.company}
                    />
                    <CardMedia
                        className={classes.media}
                        image={activity.img}
                    />
                    <CardContent>
                        <Typography component="p">
                            {activity.description}
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.actions} disableActionSpacing>
                        <IconButton aria-label="Add to favorites">
                            <FavoriteIcon/>
                        </IconButton>
                        <IconButton aria-label="Share">
                            <ShareIcon/>
                        </IconButton>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

SingleActivityDisplay.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleActivityDisplay);
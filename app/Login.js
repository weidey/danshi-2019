import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import JQuery from 'jquery';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import cookie from 'react-cookies';

const styles = {
    content:{
        width:300,
    },
    button:{
        backgroundColor:'#58ACFA',
        '&:hover':{
            backgroundColor: '#0080FF',
        }
    },
};

 class Login extends React.Component {
    state = {
        open: false,
        email:'',
        password:'',
        nickname:'',
    };

    handleChange = name => event => {
        this.setState({
            [name]:event.target.value,
        });
    };

    clearAll = () =>{
        this.setState({
            email:'',
            password:'',
            nickname:'',
        });
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleSubmit = () =>{

        // this.context.router.history.push("/loginBefore");
        let email =  this.state.email;
        let password = this.state.email;
        JQuery.ajax({
            url:'',
            success:(data, status) =>{


                if(status === 'success'){}
            },
            erroe:() => {

            }
        });
        this.setState({ open: false });
        this.clearAll();
        cookie.save("username", "王锴");//测试
        alert("登录成功");
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Button  className={classes.button}  variant='contained' color='primary' onClick={this.handleClickOpen}><img src={require('../pictures/user.png')}/>学邮登录</Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">学邮登录</DialogTitle>
                    <DialogContent className={classes.content}>
                        <TextField
                            margin="dense"
                            id="email"
                            label="Email Address"
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange('email')}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            value={this.state.password}
                            onChange={this.handleChange('password')}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            关闭
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            登录
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);

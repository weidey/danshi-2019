import React, {Component} from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import cookie from 'react-cookies';

import CreateActivity from './CreateActivity'; //活动创建页
import ActivityDisplay from '../activity/ActivityDisplay'; //活动浏览页（创建）


const styles = (theme) => ({

})

class MyCreate extends Component{
  constructor() {
    super();
    this.state = {
      isCreate: false, //true表示进入创建页
      activitiesList: [],
      isSecond: false,
    }
  }

  componentDidMount() {
    let userId = cookie.load('userId');
    if (userId != null && userId != '') {
      axios.get('http://rest.apizza.net/mock/f36bd02a14a936b95e5fe39028bfe151/data/activity', {
        params: {
          userId: userId,
          relation: "create",
          // 其他参数默认，即不分页
        }
      }).then((res) => { //res.data
        this.setState({
          activitiesList: res.data.context,
          isSecond: true,
        })
      }).catch((err) => {
        alert('读取活动信息出现问题');
      })
    }
  }

  handleCreate = () => {
    if (this.state.isCreate) {
      this.setState({
        isCreate: false,
      });
    } else {
      this.setState({
        isCreate: true,
      });
    }
  }

  render(){
    const isCreate = this.state.isCreate;
    let show;
    if (isCreate) {
      show = <CreateActivity onClick={this.handleCreate}/>; //显示创建页
    } else {
      show = (
        <div>
        <Button variant="contained" color="primary" onClick={this.handleCreate}> 创建新活动 </Button>
        <ActivityDisplay activities={this.state.activitiesList}/>
        </div>
      );//显示活动页
    }

    return (
      <div>
         {show}
      </div>
    );

  }
}

MyCreate.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyCreate);

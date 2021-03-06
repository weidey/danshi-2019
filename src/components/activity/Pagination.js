import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import './PageComponent.css'; //注意CSS的引入和使用


class Pagination extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1, //当前页码
      groupCount: 5, //页码分组，显示7个页码，其余用省略号显示
      startPage: 1, //分组开始页码
      totalPage: 1 //总页数
    };
  }

  componentDidMount() {
    this.setState({
      totalPage: this.props.pageConfig
    });
    this.props.pageCallbackFn(this.state.currentPage)
  }

  //动态生成页码
  createPage = () => {
    const {currentPage,groupCount,startPage,totalPage} = this.state;
    let pages = [];
    //上一页按钮
    pages.push(<li key = {0} onClick = {this.prePageHandeler} className = {currentPage === 1 ? "nomore" : null}> 上一页 </li>);
    //页码显示
    if (totalPage <= 10) {
      //总页码小于等于10时，全部显示出来
      for (let i = 1; i <= totalPage; i++) {
        pages.push(<li key = {i} onClick = {(e) => this.pageClick(i)} className = {currentPage === i ? "activePage" : null}> {i} </li>)
      }
    } else {
      //总页码大于10时，部分显示
      //第一页
      pages.push(<li key = {1} onClick = {(e) => this.pageClick(1)} className = {currentPage === 1 ? "activePage" : null}> 1 </li>);
      let pageLength = 0;
      if (groupCount + startPage > totalPage) {
        pageLength = totalPage
      } else {
        pageLength = groupCount + startPage;
      }
      //前面省略号(当当前页码比分组的页码大时显示省略号)
      if (currentPage >= groupCount) {
        pages.push(<li className = "" key = {-1}> ··· </li>);
      }
      //非第一页和最后一页显示
      for (let i = startPage; i < pageLength; i++) {
        if (i <= totalPage - 1 && i > 1) {
          pages.push(<li key = {i} onClick = {(e) => this.pageClick(i)} className = {currentPage === i ? "activePage" : null}> {i} </li>);
        }
      }
      //后面省略号
      if (totalPage - startPage >= groupCount + 1) {
        pages.push(<li className = "" key = {-2}> ··· </li>);
      }
      //最后一页
      pages.push(<li key = {totalPage} onClick = {(e) => this.pageClick(totalPage)} className = {currentPage === totalPage ? "activePage" : null}> {totalPage} </li>);
    }
    //下一页按钮
    pages.push(<li key = {totalPage + 1} onClick = {this.nextPageHandeler} className = {currentPage === totalPage ? "nomore" : null}> 下一页 </li>);
    return pages;
  }
  //页码点击
  pageClick = (currentPage) => {
    const {groupCount} = this.state;
    //获得将当前页码返回父组件的入口
    const getCurrentPage = this.props.pageCallbackFn;
    //当(当前页码)大于(分组的页码)时，使(当前页)前面显示两个页码
    if (currentPage >= groupCount) {
      this.setState({
        startPage: currentPage - 2,
      })
    }
    if (currentPage < groupCount) {
      this.setState({
        startPage: 1,
      })
    }
    //第一页时重新设置分组的起始页
    if (currentPage === 1) {
      this.setState({
        startPage: 1,
      })
    }
    this.setState({
      currentPage: currentPage
    });
    //将当前页码返回父组件
    getCurrentPage(currentPage);
  }
  //上一页事件
  prePageHandeler = () => {
    let {currentPage} = this.state;
    if (--currentPage === 0) {
      return false
    };
    this.pageClick(currentPage);
  }
  //下一页事件
  nextPageHandeler = () => {
    let {currentPage, totalPage} = this.state;
    if (++currentPage > totalPage) {
      return false
    };
    this.pageClick(currentPage);
  }

  render() {
    const pageList = this.createPage();
    return (
      <div className={"pageComponent"}>
      <ul className={["page-container"]}>{pageList}</ul>
      </div>
    )
  }
}

export default Pagination;

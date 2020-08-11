import React from 'react';
import { Menu } from 'antd';
import Axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector,useDispatch } from "react-redux";
import { logoutUser } from '../../../../_actions/user_actions';


function RightMenu(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    dispatch(logoutUser()).then(response => {
      console.log(response)
      console.log('user at Logout Client',user)
      /* {
        success : true,
        type: logout_user
    } 이러면 user에 영향을 못 주는데 이걸 어떻게 처리할지 생각해야
    */
      if (response.status === 200) {
        props.history.push("/");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="create">
          <a href="/video/upload">Upload</a>
        </Menu.Item>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);


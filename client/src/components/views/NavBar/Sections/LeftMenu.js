import React from 'react';
import { Menu } from 'antd';
import { useSelector } from 'react-redux';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  const user = useSelector(state=>state.user);
  const {userData}=user;
  let userId = userData ? userData._id : undefined;
  return (
    <Menu mode={props.mode}>
      {userId ?
      <Menu.Item key="subscribe">
        <a href="/subscribe">구독 리스트</a>
      </Menu.Item>
      :''
      }
  </Menu>
  )
}

export default LeftMenu
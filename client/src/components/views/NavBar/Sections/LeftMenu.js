import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="subscribe">
      <a href="/subscribe">구독 리스트</a>
    </Menu.Item>
  </Menu>
  )
}

export default LeftMenu
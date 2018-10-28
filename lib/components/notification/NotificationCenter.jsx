import React from 'react';
import { render } from 'react-dom';

import Notification from './Notification.jsx';
import './style/NotificationCenter.css';

export default function NotificationCenter(options = {}) {
  // 计算此次的元素应该距离顶部的距离，防止遮盖之前元素
  let top = 0;
  Array.prototype.forEach.call(
    document.querySelectorAll('.wb-notification-container'),
    (container, index) => {
      if(index === 0) {
        top += parseInt(container.style.top, 10);
      }
      top += container.offsetHeight;
    }
  );
  
  const newNotificate = document.createElement('div');
  let id = newNotificate.id = Date.now();
  if(!top && options.offset) {
    top = options.offset;
  }
  newNotificate.style.top = top + 'px';
  // 添加动画
  newNotificate.classList.add('wb-notification-container');
  document.getElementById('root').appendChild(newNotificate);
  // 这里必须手动再次获取DOM  否则ReactDOM会报错
  const container = document.getElementById(id);
  render(
    <Notification
      {...options}
      onClose = {() => updateView(container, options.onClose)}
    />,
    container
  );
};

function updateView(container, onClose) {
  const containerList = [...document.querySelectorAll('.wb-notification-container')];
  onClose && onClose();
  document.getElementById('root').removeChild(container);
  // 更新top
  let prevTop = parseInt(container.offsetHeight, 10);
  for(let i = containerList.indexOf(container); i < containerList.length; i ++) {
    let temp = parseInt(containerList[i].style.top, 10);
    containerList[i].style.top = prevTop + 'px';
    prevTop = temp;
  }
}
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './FolderItem.css'

export default function FolderItem(props){
    return (
      <li className='FolderItem'>
        <NavLink to={`/folder/${props.id}`}>{props.name}</NavLink>
      </li>
    )
}
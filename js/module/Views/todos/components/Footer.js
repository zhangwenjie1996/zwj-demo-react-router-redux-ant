import React from 'react'
import FilterLink from '../containers/FilterLink'

const Footer = () => (
  <p style={{margin:"10px 0"}}>
    <FilterLink filter="SHOW_ALL">
      全部任务
    </FilterLink>
    {", "}
    <FilterLink filter="SHOW_ACTIVE">
      代办任务
    </FilterLink>
    {", "}
    <FilterLink filter="SHOW_COMPLETED">
      已完成任务
    </FilterLink>
  </p>
)

export default Footer

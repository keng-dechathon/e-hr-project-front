import React from 'react'
import {Helmet} from "react-helmet"

const MainHead = ({
  title
}) => {

  return (
    <Helmet>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />   
      <title>Tech Berry - {title}</title>
    </Helmet>
  )
}

export default MainHead

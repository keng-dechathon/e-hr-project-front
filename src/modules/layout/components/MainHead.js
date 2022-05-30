import React from 'react'
import { Helmet } from "react-helmet"

const MainHead = ({
  title
}) => {

  return (
    <Helmet>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link rel="icon" href="../../../../public/favicon.ico" type="image/ico" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Roboto" rel="stylesheet" />
      <title>Tech Berry - {title}</title>
    </Helmet>
  )
}

export default MainHead

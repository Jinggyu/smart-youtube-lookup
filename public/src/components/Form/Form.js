import React from 'react'
import axios from 'axios'

import './Form.styl'

const onClick = async () => {
  try {
    const res = await axios.get('http://localhost:3000/ping')
    console.log('res: ', res)
  } catch (err) {
    console.log(err)
  }
}

export default () => (
  <div>
    <button className="button" onClick={() => onClick()}>Find videos</button>
  </div>
)
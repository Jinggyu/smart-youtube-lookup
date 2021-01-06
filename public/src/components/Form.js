import React from 'react'
import axios from 'axios'

const onClick = async () => {
  try {
    const res = await axios.get('http://localhost:3000/ping')
    console.log('res: ', res)
  } catch (err) {
    console.log(err)
  }
}

export default () => (
  <button onClick={() => onClick()} />
)
import React from 'react'

function ProtocolIcon({ url }: { url: string }) {
  return (
    <div className='bg-no-repeat bg-center' style={{backgroundImage: url, width: 72, height: 72}}>
    </div>
  )
}

export default ProtocolIcon

import React from 'react'
import Button from '@components/Button/Button'
import { ButtonSize, ButtonType } from '@components/Button/Button'

function CreateButton() {

  return (
    <Button
      size={ButtonSize.Large}
      protocolCssClass={ButtonType.Primary}
      onClick={null}
    >
      <div className="self-center" style={{ width: 168 }}>
        <span>CREATE</span>
      </div>
    </Button>
  )
}

export default CreateButton

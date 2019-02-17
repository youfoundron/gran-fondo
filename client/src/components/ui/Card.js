import React from 'react'
import { Card as RCard } from 'rebass'
import { withTheme } from 'styled-components'

const Card = ({ theme, children, cardImage }) => (
  <RCard
    fontWeight='bold'
    width={[1]}
    bg='#ffffff'
    borderRadius={theme.uiGlobal.borderRadius}
    boxShadow={theme.uiGlobal.boxShadow}
  >
    {cardImage && (
      <div
        style={{
          borderRadius: `${theme.uiGlobal.borderRadius}px ${
            theme.uiGlobal.borderRadius
          }px 0px 0px`,
          width: '100%',
          height: '210px',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundImage: `url(${cardImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: theme.colors.darkBlue
        }}
      />
    )}
    <div>{children}</div>
  </RCard>
)

export default withTheme(Card)

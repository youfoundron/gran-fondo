import React from 'react'
import { DrizzleContext } from 'drizzle-react'

const withDrizzleContext = Cmp => props => (
  <DrizzleContext.Consumer>
    {drizzleContext => {
      const { initialized } = drizzleContext;

      if (!initialized) {
        return "Loading...";
      } else {
        return <Cmp {...props} {...drizzleContext} />
      }
    }}
  </DrizzleContext.Consumer>
)

export default withDrizzleContext
import * as React from 'react'
import { Paper } from '@material-ui/core'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const mainStyles = {
  width: '80%',
  height: '80%',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 48
}

const Home = props => (
  <Wrapper>
    <Paper style={mainStyles}>Home</Paper>
  </Wrapper>
)

export default Home

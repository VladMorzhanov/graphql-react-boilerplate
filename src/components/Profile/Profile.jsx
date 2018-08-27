import * as React from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import { Button, Paper } from '@material-ui/core'
import { Query } from 'react-apollo'
import { GET_USER } from '../../graphql/queries/user'
import { PaperWrapper } from '../common/PaperWrapper'
import Header from '../common/Header'
import { Mutation } from 'react-apollo'
import { UPDATE_USER } from '../../graphql/mutations/user'
import { Heading } from '../common/Heading'
import { InputField } from './parts/InputField'

const paperStyles = {
  width: '80%',
  height: '80%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column'
}

const buttonStyles = {
  marginTop: 40,
  width: 200,
  fontWeight: 'bold'
}

@inject('rootStore')
@observer
class Profile extends React.Component {
  state = { edit: false, email: '' }

  toggleEdit = () => this.setState({ edit: !this.state.edit })

  handleEmailChange = email => this.setState({ email: email })

  onUpdated = ({ updateUser }) => {
    localStorage.setItem('accessToken', updateUser.accessToken)
    localStorage.setItem('refreshToken', updateUser.refreshToken)
    this.setState({ edit: false })
    window.alert('Successfully updated user')
  }

  onError = error => window.alert(error)

  render() {
    const { rootStore } = this.props
    const email = rootStore.user.email
    return (
      <Mutation
        mutation={UPDATE_USER}
        onCompleted={this.onUpdated}
        onError={this.onError}
      >
        {(updateUser, { data }) => (
          <PaperWrapper>
            <Header />
            <Paper style={paperStyles}>
              <Heading>User data</Heading>
              <Query query={GET_USER}>
                {({ loading, error, data }) => {
                  if (loading) return <div>Loading...</div>
                  if (error) return <div>An error occured: {error.message}</div>
                  if (data)
                    return (
                      <div>
                        <InputField
                          editable={false}
                          value={data.user.id}
                          name="id"
                        />
                        <InputField
                          onChange={this.handleEmailChange}
                          editable={this.state.edit}
                          value={data.user.email}
                          name="email"
                        />
                      </div>
                    )
                }}
              </Query>
              <Button
                style={buttonStyles}
                onClick={
                  this.state.edit
                    ? () =>
                        updateUser({ variables: { email: this.state.email } })
                    : this.toggleEdit
                }
              >
                Edit
              </Button>
              {this.state.edit && (
                <Button style={buttonStyles} onClick={this.toggleEdit}>
                  Cancel
                </Button>
              )}
            </Paper>
          </PaperWrapper>
        )}
      </Mutation>
    )
  }
}

export default Profile
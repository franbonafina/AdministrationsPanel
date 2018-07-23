import React from 'react'
import Page from '../client/site/components/page'
import Head from '../client/site/components/head'
import Header from '../client/site/components/header'
import PostLayout from '../client/site/components/read/post-layout'

export default class extends Page {
  constructor (props) {
    super(props)
    this.state = {
      post: false
    }
  }

  async componentDidMount () {
    const post = await (await fetch(`/api/v1.0/posts/${this.props.url.query.id}`)).json()
    this.setState({ post })
  }

  render () {
    return (
      <div className='container'>
        <Head {...this.props} />
        <Header settings={this.props.settings} session={this.props.session} />
        {this.state.post &&
          <PostLayout user={this.props.session.user} post={this.state.post} />
        }
      </div>
    )
  }
}

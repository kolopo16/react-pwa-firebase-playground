import React, { Component } from 'react';
import Header from './header';
import firebaseConfig from './firebaseConfig';
// import logo from './logo.svg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message : []
    }
  }

  componentDidMount() {
      const database = firebaseConfig().database().ref("/");
      database.on('child_added', snapshot => {
        let message = {
          val: snapshot.val(),
          id: snapshot.key
        };
        this.setState({
          message : [message].concat(this.state.message)
        });
      })
  }

  renderMessage() {
    let rows = this.state.message.map(message => {
      return <div className="tweet-block" key={message.id}>
                <div className="profile-picture">
                  {/* <img src={message.val.user.profile_image_url_https} alt="รูปภาพ" /> */}
                </div>
                <div className="tweet-message">
                  {message.val.text}
                </div>
              </div>
    })

    return rows
  }
  render() {
    return (
      <div>
        <Header />
        <div className="twitter">
          { this.renderMessage() }
        </div>
      </div>
    );
  }
}

export default App;

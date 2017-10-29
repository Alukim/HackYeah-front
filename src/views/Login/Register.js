import React, { Component } from 'react';
import { Image, KeyboardAvoidingView, StatusBar, View, AsyncStorage } from 'react-native';
import { Icon, Label, Form, Input, Item, Text, Container, Button } from 'native-base';
import Expo from 'expo';
import axios from 'axios';
import config from '../../../config';

const styles = {
  img: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  button: {
    height: 40,
    marginBottom: 20,
    width: '49%'
  },
  icon: {
    color: 'white',
  },
  item: {
    marginLeft: 0,
    marginBottom: 10,
  },
  inputLabel: {
    opacity: 0.7,
  },
  form: {
    marginHorizontal: 50,
    marginTop: 15,
    flex: 1,
    height: '100%',
  },
  label: {
    marginLeft: 10,
    color: 'rgba(255,255,255,0.5)',
  },
  logo: {
    marginTop: 60,
    width: '100%',
    height: 60,
  },
};


export default class Login extends React.Component {
  state = {
    nick: '',
    name: '',
    surname: '',
    email: '',
    password: '',
    rePassword: '',
    fontsLoaded: false,
  }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    await Expo.Font.loadAsync({
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf')
    });
    this.setState({fontsLoaded: true});
  }

  async handleSubmit() {
    try {
      const { nick, name, surname, email, password, rePassword } = this.state;

      const response = await axios.post(`${config.apiURL}/users`, {
        nickName: nick,
        password,
        firstName: name,
        lastName: surname,
        email
      });
  
      if (response.status === 200 || response.status === 201) {
        this.props.navigation.navigate('Login')       
      }
    } catch(error) {
      console.log(error.message);
    }
  }

  changeNick(value) {
    this.setState({ nick: value })
  }

  changeName(value) {
    this.setState({ name: value })
  }

  changeSurname(value) {
    this.setState({ surname: value })
  }

  changeEmail(value) {
    this.setState({ email: value })
  }

  changePassword(value) {
    this.setState({ password: value })
  }

  changeRePassword(value) {
    this.setState({ rePassword: value })
  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <StatusBar backgroundColor="transparent" barStyle="light-content" />
        <Image style={styles.img} source={require('../../img/loginScreen.jpg')}>
          <Image style={styles.logo} resizeMode="contain" source={require('../../img/logo.png')} />
          {this.state.fontsLoaded 
            ? (
              <Form style={styles.form}>
                <Item style={styles.item}>
                  <Icon name="person" style={styles.icon} />
                  <Input placeholder="Nick" style={{ color: '#fff' }} onChangeText={this.changeNick.bind(this)} value={this.state.nick} />
                </Item>
                <Item style={styles.item}>
                  <Icon name="person" style={styles.icon} />
                  <Input placeholder="Name" style={{ color: '#fff' }} onChangeText={this.changeName.bind(this)} value={this.state.name} />
                </Item>
                <Item style={styles.item}>
                  <Icon name="person" style={styles.icon} />
                  <Input placeholder="Surname" style={{ color: '#fff' }} onChangeText={this.changeSurname.bind(this)} value={this.state.surname} />
                </Item>
                <Item style={styles.item}>
                  <Icon name="mail" style={styles.icon} />
                  <Input placeholder="Email" style={{ color: '#fff' }} onChangeText={this.changeEmail.bind(this)} value={this.state.email} />
                </Item>
                <Item style={styles.item}>
                  <Icon name="lock" style={styles.icon} />
                  <Input placeholder="Password" secureTextEntry style={{ color: '#fff' }} onChangeText={this.changePassword.bind(this)} value={this.state.password} />
                </Item>
                <Item style={styles.item}>
                  <Icon name="lock" style={styles.icon} />
                  <Input placeholder="RePassword" secureTextEntry style={{ color: '#fff' }} onChangeText={this.changeRePassword.bind(this)} value={this.state.rePassword} />
                </Item>
                <Button style={{ height: 40, marginBottom: 8 }} block backgroundColor="#2196f3" onPress={this.handleSubmit}>
                  <Text>Sign Up</Text>
                </Button>                
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', marginTop: 10 }}>
                  <Text style={{ color: '#fff', flex: 1, width: '100%', textAlign: 'center' }}>
                    Already have an account?
                  </Text>
                  <Text onPress={() => this.props.navigation.navigate('Login')} style={{ color: '#fff', paddingRight: 15, fontWeight: 'bold' }}>Sign in</Text>
                </View>
              </Form>
            )
            : <Text style={{ color: '#fff', flex: 1, width: '100%', textAlign: 'center', marginTop: 70 }}>Loading...</Text>
          }
        </Image>
      </KeyboardAvoidingView>
    );
  }
}

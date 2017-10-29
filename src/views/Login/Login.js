import React, { Component } from 'react';
import { Image, KeyboardAvoidingView, StatusBar, View } from 'react-native';
import { Icon, Label, Form, Input, Item, Text, Container, Button } from 'native-base';
import Expo from 'expo';
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
  },
  inputLabel: {
    opacity: 0.7,
  },
  form: {
    marginHorizontal: 50,
    marginTop: 50,
    flex: 1,
    height: '100%',
  },
  label: {
    marginLeft: 10,
    color: 'rgba(255,255,255,0.5)',
  },
  logo: {
    marginTop: 100,
    width: '100%',
    height: 70,
  },
};


export default class Login extends React.Component {
  state = {
    username: '',
    password: '',
    fontsLoaded: false,
  }

  async componentDidMount() {
    await Expo.Font.loadAsync({
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf')
    });
    this.setState({fontsLoaded: true});
  }

  async handleSubmit() {
    try {
      const { username, password } = this.state;
      const response = await axios.post(`${config.apiURL}/login`, {
        nickName: username,
        password,
      });
  
      if (response.status === 200 || response.status === 201) {
        await AsyncStorage.setItem('isAuthorized', true);
        await AsyncStorage.setItem('userId', response.data);        
      }
    } catch(error) {
      console.log(error.message);
    }
  }

  changePassword(value) {
    this.setState({ password: value })
  }

  changeUsername(value) {
    this.setState({ username: value })
  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <StatusBar backgroundColor="transparent" barStyle="light-content" />
        <Image style={styles.img} source={require('../../img/loginScreen.jpg')}>
          <Image style={styles.logo} resizeMode="contain" source={require('../../img/logo.png')} />
          {this.state.fontsLoaded 
            ? (
              <Form style={styles.form}>
                <Item floatingLabel style={styles.item}>
                  <Icon name="person" style={styles.icon} />
                  <Label style={styles.label}>Username</Label>
                  <Input style={{ color: '#fff' }} onChangeText={this.changeUsername.bind(this)} value={this.state.username} />
                </Item>
                <Item floatingLabel style={{ marginLeft: 0, marginBottom: 50 }}>
                  <Icon name="lock" style={styles.icon} />
                  <Label style={styles.label}>Password</Label>
                  <Input secureTextEntry style={{ color: '#fff' }} onChangeText={this.changePassword.bind(this)} value={this.state.password} />
                </Item>
                <Button style={{ height: 40, marginBottom: 5 }} block backgroundColor="#2196f3" onPress={this.handleOnSubmit}>
                  <Text>Sign In</Text>
                </Button>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Button iconLeft style={styles.button} onPress={this.handleOnSubmit} backgroundColor="#415dae">
                    <Icon name="logo-facebook" />
                    <Text>Facebook</Text>
                  </Button>
                  <Button iconLeft style={styles.button} onPress={this.handleOnSubmit} backgroundColor="#e84c3d">
                    <Icon name="logo-googleplus" />
                    <Text>Google+</Text>
                  </Button>
                </View> 
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', marginTop: 20 }}>
                  <Text style={{ color: '#fff', flex: 1, width: '100%', textAlign: 'center' }}>
                    Don't have an account?
                  </Text>
                  <Text onPress={() => this.props.navigation.navigate('Register')} style={{ color: '#fff', paddingRight: 15, fontWeight: 'bold' }}>Sign up</Text>
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

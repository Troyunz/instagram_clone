import React, { Component } from 'react';
import { View, Button, TextInput } from 'react-native';

import * as firebase from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp() {
        const auth = getAuth();
        const { email, password } = this.state;
        signInWithEmailAndPassword(auth, email, password).then((result) => { console.log(result) }).catch((error) => { console.log(error) });
    }

    render() {
        return <View>
            <TextInput placeholder='email'
                onChangeText={(email) => this.setState({ email })} />
            <TextInput placeholder='password'
                onChangeText={(password) => this.setState({ password })} />

            <Button title='Sign In'
                onPress={() => this.onSignUp()} />
        </View>;
    }
}

export default Login;

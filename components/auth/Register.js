import React, { Component } from 'react';
import { View, Button, TextInput } from 'react-native';

import * as firebase from 'firebase/app';

export class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp() {
        const {email, password, name} = this.state;
        
    }

    render() {
        return <View>
            <TextInput placeholder='name'
                onChangeText={(name) => this.setState({ name })} />
            <TextInput placeholder='email'
                onChangeText={(email) => this.setState({ email })} />
            <TextInput placeholder='password'
                onChangeText={(password) => this.setState({ password })} />

            <Button title='Sign Up'
                onPress={() => this.onSignUp()} />
        </View>;
    }
}

export default Register;

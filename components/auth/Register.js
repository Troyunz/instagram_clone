import React, { Component } from 'react';
import { View, Button, TextInput } from 'react-native';

import * as firebase from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
export class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp() {
        const db = getFirestore();
        const auth = getAuth();
        const { email, password, name } = this.state;
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (result) => {
                try {
                    await setDoc(doc(db, "users", auth.currentUser.uid), {
                            name,
                            email
                        });
                    console.log(result)
                } catch (error) {
                    console.log("This is the error: ", error)
                }

            })
            .catch((error) => {
                console.log(error)
            });
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

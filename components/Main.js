import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../redux/actions';

export class Main extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        const { currentUser } = this.props;
        if (currentUser == undefined){
            console.log("undefined") 
            return(
                <View>

                </View>
            );
        }
        
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{currentUser.name} Logged In!</Text>
            </View>
        );
    }
}

const mapStateProps = (store) => ({
    currentUser: store.userState.currentUser
});
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser: fetchUser }, dispatch);

export default connect(mapStateProps, mapDispatchProps)(Main);


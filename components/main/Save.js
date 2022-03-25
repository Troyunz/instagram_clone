import React, { useState } from 'react'
import { Button, Image, TextInput, View } from 'react-native'

import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, serverTimestamp, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default function Save(props) {
  const [caption, setCaption] = useState("")
  const db = getFirestore();
  const auth = getAuth()

  const uploadImage = async () => {

    const uri = props.route.params.image;
    const childPath = `post/${auth.currentUser.uid}/${Math.random().toString(36)}`;
    const response = await fetch(uri);
    const blob = await response.blob();

    const storage = getStorage();
    const storageRef = ref(storage, childPath);
    const task = uploadBytesResumable(storageRef, blob);

    await task.on("state_changed",
          (snapshot) => {
            console.log('inside snapshot')
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          }, 
          (error) => {
            // Handle unsuccessful uploads
            console.log(error)
          }, 
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(task.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              savePostData(downloadURL);
            });
          }
      );

  }

  const savePostData = async (downloadURL) => {
    await setDoc(doc(collection(db, "posts", auth.currentUser.uid, "userPosts")), {
      downloadURL,
      caption,
      creation: serverTimestamp()
    }).then(function () {
      props.navigation.popToTop();
    })
  }

  return (
    <View style={{flex: 1}}>
      <Image source={{uri: props.route.params.image}}/>
      <TextInput 
          placeholder='Write a Caption . . .'
          onChangeText={(caption) => setCaption(caption)}
      />

      <Button title='Save' onPress={() => uploadImage()}/>
    </View>
  )
}

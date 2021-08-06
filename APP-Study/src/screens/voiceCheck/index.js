import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Audio } from 'expo-av';

const VoiceCheck = () => {
  const [recording, setRecording] = React.useState();

  const startRecording = async () => {
    try {
      onsole.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    }
    catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  const stopRecording = async () => {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
  }
  return (
    <View>
      <TouchableOpacity></TouchableOpacity>
    </View>
  )
}

export default VoiceCheck

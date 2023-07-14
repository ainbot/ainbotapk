  import React, { useState } from 'react';
  import { View, Text } from 'react-native';
  import { MaterialCommunityIcons } from '@expo/vector-icons';
  import { WebView } from 'react-native-webview';

  const HomeScreen = () => {
    const [activeTab, setActiveTab] = useState('home');

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {activeTab === 'home' ? (
            <WebView source={{ uri: 'https://www.google.com' }} />
          ) : (
            <Text>Informações do Usuário</Text>
            // Aqui você pode renderizar as informações do usuário
          )}
        </View>
        <View style={{ flexDirection: 'row', backgroundColor: 'white', height: 50 }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: activeTab === 'home' ? 'rgba(128, 128, 128, 0.2)' : 'transparent',
              borderRadius: 20,
              margin: 10,
            }}
          >
            <MaterialCommunityIcons
              name="home"
              size={24}
              color={activeTab === 'home' ? 'black' : 'gray'}
              onPress={() => setActiveTab('home')}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: activeTab === 'user' ? 'rgba(128, 128, 128, 0.2)' : 'transparent',
              borderRadius: 40,
              margin: 10,
            }}
          >
            <MaterialCommunityIcons
              name="account"
              size={24}
              color={activeTab === 'user' ? 'black' : 'gray'}
              onPress={() => setActiveTab('user')}
            />
          </View>
        </View>
      </View>
    );
  };

  export default HomeScreen;

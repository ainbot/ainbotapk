import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, ActivityIndicator, Text, TouchableOpacity, Modal, Alert, Linking } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import HomeScreen from './screens/HomeScreen';

const firebaseConfig = {
  apiKey: "AIzaSyB1woaxIGO60HjwULxxXzsJjxuchf6SVa8",
  authDomain: "usuario-ainbot.firebaseapp.com",
  projectId: "usuario-ainbot",
  storageBucket: "usuario-ainbot.appspot.com",
  messagingSenderId: "925267733152",
  appId: "1:925267733152:web:73d11ce448c5947bd137c5"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const LoadingScreen = () => (
  <View style={styles.container}>
    <Image source={require('./assets/logo.png')} style={styles.image} />
    <View style={styles.footer}>
      <ActivityIndicator size="small" color="#FFFFFF" />
    </View>
  </View>
);

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(false);

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handleSenhaChange = (text) => {
    setSenha(text);
  };

  const handleActivate = () => {
    setIsActivated(!isActivated);
  };

  const handleTermsPress = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleLogin = async () => {
    setIsLoading(true);

    try {
      const response = await firebase.auth().signInWithEmailAndPassword(email, senha);
      if (response.user) {
        Alert.alert('Acesso Autorizado', 'Autenticação bem-sucedida!');
        setAuthenticated(true); // Autenticação bem-sucedida, definir isAuthenticated como true
      } else {
        Alert.alert('Falha no Login', 'Falha na autenticação');
      }
    } catch (error) {
      Alert.alert('Erro no Login', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      // Autenticação bem-sucedida, navegar para a HomeScreen
      navigation.replace('Home');
    }
  }, [isAuthenticated, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Login</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite seu email"
            value={email}
            onChangeText={handleEmailChange}
            placeholderTextColor="white"
            selectionColor="white"
          />
          {email !== '' && (
            <Text style={[styles.inputLabel, { color: 'white' }]}>Email</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            value={senha}
            onChangeText={handleSenhaChange}
            placeholderTextColor="white"
            selectionColor="white"
            secureTextEntry={!passwordVisible}
          />
          {senha !== '' && (
            <Text style={[styles.inputLabel, { color: 'white' }]}>Senha</Text>
          )}
          <View style={styles.eyeIconContainer}>
            <MaterialCommunityIcons
              name={passwordVisible ? 'eye-off' : 'eye'}
              size={20}
              color="white"
              style={styles.eyeIcon}
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          </View>
        </View>
        <View style={styles.activateContainer}>
          <MaterialCommunityIcons
            name={isActivated ? 'checkbox-marked' : 'checkbox-blank-outline'}
            size={20}
            color="white"
            style={styles.activateIcon}
            onPress={handleActivate}
          />
          <Text style={styles.activateText}>Mantenha-me ativo</Text>
        </View>
        <Button
          mode="contained"
          style={styles.button}
          labelStyle={styles.buttonText}
          onPress={handleLogin}
          rippleColor="rgba(0, 0, 0, .32)"
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            'Login'
          )}
        </Button>
        <TouchableOpacity onPress={handleTermsPress}>
          <Text style={styles.termsText}>
            Ao fazer login, você concorda com os <Text style={styles.termsLink}>Termos de Condições.</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Aviator Ainbot somente tem a capacidade de fornecer entradas lógicas, mas não de prever o término da vela em andamento, ou seja, após 2.00x o usuário está por conta própria.
              {'\n\n'}
              O usuário, ao fazer login, está se responsabilizando pelos seus atos, ou seja, dependendo do resultado, os agentes da Ainbot não se responsabilizam pelas perdas e ganhos adquiridos com os sinais gerados neste App.
              {'\n\n'}
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => Linking.openURL('https://api.whatsapp.com/send?phone=258850653117&text=%F0%9F%93%9E%20Ja%20era%20sem%20tempo%2C%20tenho%20interesse%20em%20me%20registar%20no%20Aviator%20Ainbot.%20')}>
                  <Text style={[styles.linkText, { color: 'blue', textDecorationLine: 'underline' }]}>Saiba mais!</Text>
                </TouchableOpacity>
              </View>
            </Text>
            <Button
              mode="contained"
              style={styles.modalButton}
              labelStyle={styles.buttonTexts}
              onPress={handleModalClose}
            >
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginScreen, setShowLoginScreen] = useState(false);

  useEffect(() => {
    const randomDelay = Math.floor(Math.random() * 5) + 4;
    const timeout = setTimeout(() => {
      setIsLoading(false);
      setShowLoginScreen(true);
    }, randomDelay * 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 140,
    height: 140,
    marginTop: 200,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'none',
    alignItems: 'none',
    marginTop: 200,
  },
  loginContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  loginText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'transparent',
    width: 280,
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 20,
    borderWidth: 1.5,
    borderColor: 'white',
    color: 'white',
    outlineWidth: 0,
  },
  inputLabel: {
    position: 'absolute',
    top: -8,
    left: 20,
    color: 'white',
    backgroundColor: 'black',
    paddingHorizontal: 4,
    fontSize: 12,
  },
  eyeIconContainer: {
    position: 'absolute',
    top: 0,
    right: 20,
  },
  eyeIcon: {
    marginTop: 10,
  },
  activateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    color: 'red',
  },
  activateIcon: {
    marginRight: 10,
    color: 'white',
  },
  activateText: {
    color: 'white',
  },
  button: {
    backgroundColor: 'red',
    width: 280,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    width: 280,
    fontSize: 16,
  },
  termsText: {
    width: 280,
    color: 'white',
    marginTop: 10,
    textAlign: 'justify',
    marginLeft: 10,
    marginRight: 0,
  },
  termsLink: {
    color: 'white',
    textDecorationLine: 'underline',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 5,
    maxWidth: '80%',
    maxHeight: '80%',
  },
  modalText: {
    color: 'white',
    marginBottom: 10,
    textAlign: 'justify',
  },
  modalButton: {
    marginTop: 10,
    colorBottom: 'blue',
  },
});

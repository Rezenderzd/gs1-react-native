import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import { AppContext } from '../componentes/provider';

export default function App() {

  const{isDarkMode} = useContext(AppContext);

  return (
    <View style={[styles.container, {backgroundColor: isDarkMode ? '#00020b' : '#F6F5F1'}]}>
      <Image
        source={require('../assets/logo.png')}
        style={{ width: 300, height: 300, borderWidth:5, borderColor: isDarkMode? '#F6F5F1': '#00020b', borderRadius: 20}}
      />
      <Text style={[styles.textoPrincipal, {color: isDarkMode? '#F6F5F1': '#00020b'}]}>Bem Vindo ao Sistema de Estatística de Missões Espaciais</Text>
      <TouchableOpacity onPress={()=> router.push('/informacoes')} style={[styles.btn, {backgroundColor: isDarkMode? '#F6F5F1': '#00020b'}]}>
        <Text style={[styles.textBtn, {color: isDarkMode? '#00020b': '#F6F5F1'}]}>Ir para aba de dados!</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoPrincipal:{
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
  },
  btn:{
    backgroundColor: '#00020b',
    padding: 15,
    borderRadius: 10,
    width:300,
    alignItems: 'center',
  },
  textBtn:{
    color:'#F6F5F1'
  }
});

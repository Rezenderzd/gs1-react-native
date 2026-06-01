import { useContext } from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import { AppContext } from '../componentes/provider';
import Info from '../componentes/infoComponent';

export default function Potencia() {
  const { isDarkMode } = useContext(AppContext);

  return (
    <ScrollView style={[styles.mainContainer, { backgroundColor: isDarkMode ? '#00020b' : '#F6F5F1' }]}>
      <View style={styles.informacoesCentrais}>
        <Text style={[styles.tituloCentral, { color: isDarkMode ? '#F6F5F1' : '#00020b' }]}>Expedition 74</Text>
        <Text style={[styles.status, { color: isDarkMode ? '#ffbe0b' : '#cca000' }]}>Status: Em andamento</Text>
      </View>
      
      <Image
        source={require('../assets/missao.png')}
        style={styles.imagem}
      />
      
      <View style={styles.informacoesGerais}>

        <Info
          titulo={"Data de lançamento"}
          descricao={"17/03/2026"}
        />
        <Info
          titulo={"Alvo"}
          descricao={"Marte"}
        />
        <Info
          titulo={"Ano de chegada"}
          descricao={"2028"}
        />
        <Info
          titulo={"Tipo"}
          descricao={"Humanos no espaço"}
        />
        <Info
          titulo={"Objetivo"}
          descricao={"Averiguar condições de sobrevivência em Marte"}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
  },
  informacoesCentrais: {
    gap: 10,
  },  
  tituloCentral: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 16
  },
  imagem: {
    marginTop: 20,
    width: '100%',
    height: 180,
    borderRadius: 20,
  },
  informacoesGerais: {
    marginTop: 20,
    paddingBottom: 40, 
  },
});
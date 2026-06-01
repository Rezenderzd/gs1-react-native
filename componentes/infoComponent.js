import { View, Text, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { AppContext } from './provider';


export default function Info ({titulo, descricao}){

    const {isDarkMode} = useContext(AppContext)

    return(
        <View style={[styles.infoContainer, { borderColor: isDarkMode ? '#343a40' : '#ced4da' }]}>
            <Text style={[styles.tituloLabel, { color: isDarkMode ? '#F6F5F1' : '#00020b' }]}>{titulo}</Text>
            <Text style={[styles.textoValor, { color: isDarkMode ? '#F6F5F1' : '#00020b' }]}>{descricao}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start', 
        paddingVertical: 15,
        borderTopWidth: 2, 
        gap: 15,
      },
      tituloLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1, 
      },
      textoValor: {
        fontSize: 16,
        textAlign: 'right', 
        flex: 1.5, 
      }
})
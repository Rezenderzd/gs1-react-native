import { useContext } from 'react';
import{Text, View, Image, StyleSheet} from 'react-native';
import { AppContext } from '../componentes/provider';
import ProgressoCircular from '../componentes/circulo';

export default function Informações(){

    const {potenciaTurbinaEsquerda, potenciaTurbinaDireita, isDarkMode} = useContext(AppContext);
    const valorPorcentagemEsquerda = parseInt(potenciaTurbinaEsquerda) || 0;
    const valorPorcentagemDireita = parseInt(potenciaTurbinaDireita) || 0;
    
    return(
        <View style = {{backgroundColor: isDarkMode ? '#00020b' : '#F6F5F1', flex: 1}}>
            <Image
                source={require('../assets/foguete.png')}
                style={{ width: '100%', height: 380}}
            />
            <View style = {styles.viewCirculosGeral}>
                <View style={[styles.viewTurbina, , {borderColor: isDarkMode? '#F6F5F1': '#00020b'}]}>
                    <Text style={[styles.textoTurbina, {color: isDarkMode? '#F6F5F1': '#00020b'}]}>Porcentagem da turbina esquerda</Text>
                    <ProgressoCircular 
                        porcentagem={valorPorcentagemEsquerda} 
                        isDarkMode={isDarkMode}
                        invertido={false}
                    />
                </View>
                <View style={[styles.viewTurbina, {borderColor: isDarkMode? '#F6F5F1': '#00020b'}]}>
                    <Text style={[styles.textoTurbina, {color: isDarkMode? '#F6F5F1': '#00020b'}]}>Porcentagem da turbina direita</Text>
                    <ProgressoCircular 
                    porcentagem={valorPorcentagemDireita} 
                    isDarkMode={isDarkMode} 
                    invertido={true}
                    />
                </View>
            </View>
            <Text style={[styles.textoStatus, {color: isDarkMode? '#00FF88': '#004b23'}]}>● Status: Ativo</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    viewCirculosGeral:{
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    viewTurbina:{
        flexDirection: 'column',
        gap:20,
        width:165,
        borderWidth:4,
        borderColor: '#F6F5F1',
        padding:10,
        alignItems:'center',
        borderRadius:10,
        marginTop:20
    },
    textoTurbina:{
        textAlign: 'center',
    },
    textoStatus:{
        textAlign: 'center',
        fontSize: 18,
        marginInline:'auto',
        fontWeight: 'bold',
        marginTop: 20,
        marginTop:50,
        padding:10,
        width:300,
        borderRadius:20,
    }
})
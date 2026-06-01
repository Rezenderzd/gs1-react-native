import { useContext } from 'react';
import{Text, View, StyleSheet} from 'react-native';
import { AppContext } from '../componentes/provider';

export default function Oxigenio(){
    
    const {isDarkMode, quantidadeO2Atual, quantidadeH2OAtual, quantidadeDeCombustivel, quantidadeDeEnergia} = useContext(AppContext);

    const itens = [quantidadeO2Atual, quantidadeH2OAtual, quantidadeDeCombustivel, quantidadeDeEnergia]
    const nomeItens = ['Oxigênio', 'H2O', 'Combustível', 'Energia']
    

    const verde = isDarkMode? '#00FF88': '#004b23'
    const amarelo =  '#a47e1b'
    const vermelho = '#d00000'
    const verdeRGBA = isDarkMode? 'rgba(0, 255, 136, 0.3)' : 'rgba(0, 75, 35, 0.3)'
    const amareloRGBA = isDarkMode? 'rgba(255, 190, 11, 0.2)': 'rgba(255, 195, 0, 0.5)'
    const vermelhoRGBA = 'rgba(208, 0, 0, 0.3)'

    let status

    const definindoStatus = (quantidaade) =>{
        if(quantidaade>50){
            status = 'Ok'
        }else if(quantidaade>30){
            status = 'Atenção'
        }else{
            status = 'Crítico'
        }
        return status
    }

    
    return(
        <View style={[styles.container, {backgroundColor: isDarkMode? '#00020b': '#F6F5F1',}]}>
            <Text style={{fontSize: 24, fontWeight: 'bold', color: isDarkMode? '#F6F5F1': '#00020b', marginTop:30}}>Informações de Sobrevivência</Text>
            <View  style={styles.containerInfo}>
            {itens.map((item, index) => {
                let status = definindoStatus(item)
                return(
                    <View style={styles.containerDaBorda} key={index}>
                    <View style={[styles.viewInfo, {borderColor: isDarkMode ? '#00020b' : '#F6F5F1' }, {backgroundColor: status === 'Ok'? `${verdeRGBA}`: status === 'Atenção'? `${amareloRGBA}`: `${vermelhoRGBA}`}]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                            <Text style={[styles.titulo, { color: isDarkMode ? '#F6F5F1' : '#00020b' }]}>{nomeItens[index]}</Text>
                            <Text style={[styles.status, { color: status === 'Ok' ? verde : status === 'Atenção' ? amarelo : vermelho }]}>{`Status: ${status}`}</Text>
                            <Text style={[styles.quantidade, { color: isDarkMode ? '#F6F5F1' : '#00020b' }]}>{`${item}%`}</Text>
                        </View>
                        <View style={[styles.barraTrilho, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)' }]}>
                            <View style={[styles.barraPreenchimento, { width: `${item}%`, backgroundColor: '#F6F5F1' }]} />
                        </View>
                    </View>
                </View>
                )
            })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
    },
    containerInfo:{
        marginTop:40,
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'center',
    },
    containerDaBorda: {
        marginTop: 20,
        padding: 4,          
        borderRadius: 14,
        width:400,
    },
    viewInfo:{
        flexDirection:'column',
        padding:10,
        justifyContent:'space-between',
        alignItems:'flex-start',
        borderRadius: 10,
        marginTop:20,
        gap:10,
        backgroundColor:'#fff',
        alignItems:'center',
        minHeight:100
    },
    titulo:{
        fontSize:20
    },
    status:{
        fontSize:16
    },
    quantidade:{
        fontSize: 30,
        fontWeight: 'bold',
    },
    barraTrilho: {
        height: 10,
        width: '100%',        
        borderRadius: 5,
        overflow: 'hidden',   
        alignItems: 'flex-start', 
    },
    barraPreenchimento: {
        height: '100%',
        borderRadius: 5,
    },
})
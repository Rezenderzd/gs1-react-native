import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

export default function ProgressoCircular({ porcentagem, isDarkMode, invertido }) {

  const tamanho = 100; 
  const espessuraBorda = 10;
  const raio = (tamanho - espessuraBorda) / 2;
  const centro = tamanho / 2;
  
  const circunferencia = 2 * Math.PI * raio;

  const porcentagemLimpa = Math.max(0, Math.min(100, porcentagem));

  const strokeDashoffset = circunferencia - (circunferencia * porcentagemLimpa) / 100;

  const corFundoCirculo = isDarkMode ? '#1c1b21' : '#E0E0E0';
  let corProgresso

  if(porcentagemLimpa <=30){
    corProgresso = '#d00000'
  }else if(porcentagemLimpa <=65){
    corProgresso = '#ffbe0b'
  }else{
    corProgresso = isDarkMode? '#00FF88': '#004b23';
  }
  
  const corTexto = isDarkMode ? '#F6F5F1' : '#00020b';

  return (
    <View style={styles.container}>
      <View style={invertido ? styles.svgInvertido : null}>
        <Svg width={tamanho} height={tamanho}>
          <Circle
            cx={centro}
            cy={centro}
            r={raio}
            stroke={corFundoCirculo}
            strokeWidth={espessuraBorda}
            fill="transparent"
          />

          <Circle
            cx={centro}
            cy={centro}
            r={raio}
            stroke={corProgresso}
            strokeWidth={espessuraBorda}
            fill="transparent"
            strokeDasharray={circunferencia}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            origin={`${centro}, ${centro}`}
            rotation="-90"
          />
        </Svg>
      </View>

      <View style={styles.textoContainer}>
        <Text style={[styles.texto, { color: corTexto }]}>
          {porcentagemLimpa}%
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgInvertido: {
    transform: [{ scaleX: -1 }], 
  },
  textoContainer: {
    position: 'absolute', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
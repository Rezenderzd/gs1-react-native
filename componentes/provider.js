import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext()

export const AppProvider =({ children }) => {

    const [potenciaTurbinaEsquerda, setPotenciaTurbinaEsquerda] = useState('100')
    const [potenciaTurbinaDireita, setPotenciaTurbinaDireita] = useState('100')
    const [quantidadeO2Atual, setQuantidadeO2Atual] = useState('100')
    const [quantidadeH2OAtual, setQuantidadeH2OAtual] = useState('100')
    const [quantidadeDeCombustivel, setQuantidadeDeCombustivel] = useState('100')
    const [quantidadeDeEnergia, setQuantidadeDeEnergia] = useState('100')
    const [isDarkMode, setIsDarkMode] = useState(true)

    useEffect(() => {
        const carregarDadosDoApp = async () => {
          try {
            const dadosSalvos = await AsyncStorage.getItem('dados')
            
            if (dadosSalvos !== null) {
              const dadosDoPainel = JSON.parse(dadosSalvos)
              
                if (dadosDoPainel.potenciaTurbinaEsquerda){
                setPotenciaTurbinaEsquerda(dadosDoPainel.potenciaTurbinaEsquerda)
                }
                if (dadosDoPainel.potenciaTurbinaDireita){
                    setPotenciaTurbinaDireita(dadosDoPainel.potenciaTurbinaDireita)
                } 
                if(dadosDoPainel.quantidadeO2Atual) {
                    setQuantidadeO2Atual(dadosDoPainel.quantidadeO2Atual)
                }

                if(dadosDoPainel.quantidadeH2OAtual){
                    setQuantidadeH2OAtual(dadosDoPainel.quantidadeH2OAtual)
                }

                if(dadosDoPainel.quantidadeDeCombustivel){
                    setQuantidadeDeCombustivel(dadosDoPainel.quantidadeDeCombustivel)
                }

                if(dadosDoPainel.quantidadeDeEnergia){
                    setQuantidadeDeEnergia(dadosDoPainel.quantidadeDeEnergia)
                }

                if (dadosDoPainel.isDarkMode !== undefined) {
                    setIsDarkMode(dadosDoPainel.isDarkMode)
                }
            }
          } catch (error) {
            console.error("Erro ao carregar os dados:", error)
          }
        }
      
        carregarDadosDoApp()
      }, [])

    useEffect(() => {
        const salvarTodosOsDados = async () => {
          try {
            const estadoDoApp = {
              potenciaTurbinaEsquerda,
              potenciaTurbinaDireita,
              quantidadeO2Atual,
              isDarkMode,
              quantidadeH2OAtual,
              quantidadeDeCombustivel,
              quantidadeDeEnergia
            }
      
            await AsyncStorage.setItem('dados', JSON.stringify(estadoDoApp))
          } catch (error) {
            console.error("Erro ao salvar os dados:", error)
          }
        }
        salvarTodosOsDados()
      }, [potenciaTurbinaEsquerda, potenciaTurbinaDireita, quantidadeO2Atual, isDarkMode, quantidadeDeCombustivel, quantidadeDeEnergia, quantidadeH2OAtual])

    const toggleSwitchMode = () =>{
        setIsDarkMode(previousState => !previousState)
    }

    return (
        <AppContext.Provider
            value={{setPotenciaTurbinaEsquerda, potenciaTurbinaEsquerda, quantidadeO2Atual, 
                setPotenciaTurbinaDireita, potenciaTurbinaDireita,
                setQuantidadeO2Atual, isDarkMode, setIsDarkMode, toggleSwitchMode, setQuantidadeDeCombustivel,
                quantidadeDeCombustivel, setQuantidadeDeEnergia, quantidadeDeEnergia, setQuantidadeH2OAtual, quantidadeH2OAtual}}
        >
            {children}
        </AppContext.Provider>
    );
}
import { useContext, useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  ScrollView,
  Keyboard,
  Modal,
  FlatList,
} from "react-native";
import { AppContext } from "../componentes/provider";
import ModalPopUp from "../componentes/modal";

export default function Cadastro() {
  const { setPotenciaTurbinaDireita, setPotenciaTurbinaEsquerda, setQuantidadeO2Atual, isDarkMode, setQuantidadeH2OAtual, setQuantidadeDeCombustivel, setQuantidadeDeEnergia} = useContext(AppContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState("Selecione um item");
  const [erros, setErros] = useState({});
  const [valorAlterado, setValorAlterado] = useState("");

  const [itensMudanca] = useState(["Potência Turbina Esquerda", "Potência Turbina Direita", "O2", "H2O", "Combustível", "Energia"]);

  const imagensSorteáveis = {
    1: require('../assets/imagem1.jpg'),
    2: require('../assets/imagem2.jpg'),
    3: require('../assets/imagem3.jpg'),
    4: require('../assets/imagem4.jpg'),
    5: require('../assets/imagem5.jpg'),
    6: require('../assets/imagem6.jpg'),
    7: require('../assets/imagem7.jpg'),
  };

  const [numeroSorteado, setNumeroSorteado] = useState('');

  useFocusEffect(
    useCallback(() => {
      
      const novoNumero = Math.floor(Math.random() * 7) + 1;
      setNumeroSorteado(novoNumero);
    }, []) 
  );

  const validar = () => {
    const e = {};
  
    if (itemSelecionado === "Selecione um item") {
      e.item = "Selecione um item";
      setErros(e);
    }

    if (valorAlterado.trim() === "") {
      e.quantidade = "Preencha a quantidade para atualizar";
    } else {
      const numero = Number(valorAlterado);
      if (isNaN(numero) || numero <= 0 || numero > 100) {
        e.quantidade = "A quantidade deve ser entre 1 e 100";
      }
    }
  
    setErros(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validar()) {
      return;
    }

    const atualizadoresDeEstado = {
      "O2": setQuantidadeO2Atual,
      "Potência Turbina Esquerda": setPotenciaTurbinaEsquerda,
      "Potência Turbina Direita": setPotenciaTurbinaDireita,
      "H2O": setQuantidadeH2OAtual,
      "Combustível": setQuantidadeDeCombustivel,
      "Energia": setQuantidadeDeEnergia,
    };
  
    const funcaoAtualizadora = atualizadoresDeEstado[itemSelecionado];
  
    if (funcaoAtualizadora) {
      funcaoAtualizadora(valorAlterado);
    }
  
    alert(`Atualização realizada com sucesso!`);
    setErros({});
  
    setValorAlterado("");
    setItemSelecionado("Selecione um item");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView keyboardShouldPersistTaps="handled"
          style={{ backgroundColor: isDarkMode ? "#00020b" : "#F6F5F1" , display:1}}
        >
          <View style={styles.mainContainer}>
            <Text style={[styles.mainTitulo, {color: isDarkMode ? "#F6F5F1" : "#00020b"}]}>
              Formulário de Atualização de dados da missão!
            </Text>

            <Image
              source={imagensSorteáveis[numeroSorteado]}
              style={styles.imagem}
            />

            <View style={styles.inputContainer}>
              <Text style={[styles.label, {color: isDarkMode ? "#F6F5F1" : "#00020b"}]}>
                Selecione o dado que deseja atualizar
              </Text>
              <TouchableOpacity
                style={[styles.botaoSeletor, {backgroundColor:"#F6F5F1"}]}
                onPress={() => setModalVisible(true)}
              >
                <Text style={[styles.botaoSeletorTexto, {color: "#00020b"}]}>{itemSelecionado}</Text>
              </TouchableOpacity>
              {erros.item ? (
                <Text style={styles.erroTexto}>{erros.item}</Text>
              ) : null}
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, {color: isDarkMode? '#F6F5F1': "#00020b"}]}>
                {itemSelecionado === "Selecione um item"
                  ? "Selecione um item para atualizar"
                  : `Digite o novo valor de ${itemSelecionado}`}
              </Text>
              <TextInput
                placeholder="Ex: 85"
                style={styles.input}
                value={ valorAlterado}
                onChangeText={setValorAlterado}
              />
              {erros.quantidade ? (
                <Text style={styles.erroTexto}>{erros.quantidade}</Text>
              ) : null}
            </View>

            <TouchableOpacity onPress={handleSubmit} style={[styles.botaoAtualizar,{marginTop: 10, backgroundColor: isDarkMode ? "#F6F5F1" : "#00020b"}]}>
              <Text style={[styles.textoAtualizar, {color: isDarkMode? '#00020b': '#F6F5F1'}]}>Atualizar Valor</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>

      <ModalPopUp
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        itensMudanca={itensMudanca}
        itemSelecionado={itemSelecionado}
        setItemSelecionado={setItemSelecionado}
        isDarkMode={isDarkMode}
        styles={styles}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 20,
  },
  mainTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
    color: "#333",
  },
  imagem: {
    width: '100%',
    height: 250,
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
    color: "#F6F5F1",
  },
  input: {
    height: 48,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  botaoSeletor: {
    height: 48,
    borderColor: "#00020b",
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 12,
    backgroundColor: "#00020b",
  },
  botaoSeletorTexto: {
    color: "#F6F5F1",
    fontWeight: "600",
  },
  botaoAtualizar: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
  },
  textoAtualizar:{
    textAlign:'center',
    fontWeight: "bold",
  },
  erroTexto: {
    color: "#d00000",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalConteudo: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    height: "65%",
  },
  modalHeaderBar: {
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 20,
  },
  modalTitulo: {
    color: "#00020b",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 20,
    textAlign: "center",
  },
  itemMudar: {
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderBottomWidth: 1,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemTexto: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
  itemMudarBadge: {
    backgroundColor: "#00020b",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  itemMudarTexto: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  modalBotaoFechar: {
    marginTop: 15,
    padding: 15,
    alignItems: "center",
  },
  modalBotaoFecharTexto: {
    color: "#666",
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

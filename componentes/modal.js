import { Modal, View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function ModalPopUp ({modalVisible, setModalVisible, itensMudanca, itemSelecionado, setItemSelecionado, isDarkMode, styles}){
    return(
        <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
              >
                <View style={styles.modalContainer}>
                  <View style={[styles.modalConteudo, {backgroundColor: isDarkMode ? "#00020b" : "#F6F5F1"}]}>
                    <View style={styles.modalHeaderBar} />
                    <Text style={[styles.modalTitulo, {color: isDarkMode? '#F6F5F1': "#00020b"}]}>
                      Selecione o Item para Alterar
                    </Text>
        
                    <FlatList
                      data={itensMudanca}
                      keyExtractor={(item) => item}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={[
                            styles.itemMudar,
                            {color: isDarkMode ? "#F6F5F1" : "#00020b"},
                            itemSelecionado === item &&{backgroundColor: isDarkMode ? "#F6F5F1" : "#00020b"},
                            {borderBottomColor: isDarkMode? "#F6F5F1": "#00020b"},
                          ]}
                          onPress={() => {
                            setItemSelecionado(item);
                            setModalVisible(false);
                          }}
                        >
                          <Text style={[styles.itemTexto, 
                            {color: isDarkMode ? "#F6F5F1" : "#00020b"},
                            itemSelecionado === item && {color: isDarkMode ? "#00020b" : "#F6F5F1"},
                            ]}>{item}</Text>
                          <View style={[
                          styles.itemMudarBadge,
                          {backgroundColor: isDarkMode? '#F6F5F1': "#00020b"},  
                          itemSelecionado === item &&{backgroundColor: isDarkMode ? "#00020b" : "#F6F5F1"},
                          ]}>
                            <Text style={[styles.itemMudarTexto, 
                              {color: isDarkMode? '#00020b': "#F6F5F1"},
                              itemSelecionado === item &&{color: isDarkMode ? "#F6F5F1" : "#00020b"}
                              ]}>Selecionar</Text>
                          </View>
                        </TouchableOpacity>
                      )}
                    />
        
                    <TouchableOpacity
                      style={styles.modalBotaoFechar}
                      onPress={() => setModalVisible(false)}
                    >
                      <Text style={[styles.modalBotaoFecharTexto, {color: isDarkMode? '#F6F5F1': "#00020b"}]}>CANCELAR</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
    )
}

const styles = StyleSheet.create({
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
})
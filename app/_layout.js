import { Tabs } from 'expo-router';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AppContext, AppProvider } from '../componentes/provider';
import { useContext } from 'react';

function TabsLayout() {
  const { isDarkMode, toggleSwitchMode } = useContext(AppContext);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDarkMode ? '#F6F5F1' : '#00020b',
        tabBarInactiveTintColor: isDarkMode ? '#888888' : '#888888',
        tabBarStyle:      { backgroundColor: isDarkMode ? '#00020b' : '#F6F5F1' },
        headerStyle:      { backgroundColor: isDarkMode ? '#00020b' : '#F6F5F1' },
        headerTitleStyle: { color: isDarkMode ? '#F6F5F1' : '#00020b' },
        headerRight: () => (
          <TouchableOpacity onPress={toggleSwitchMode} style={{ marginRight: 15 }}>
            <Text style={{ fontSize: 20 }}>{isDarkMode ? '☀️' : '🌙'}</Text>
          </TouchableOpacity>
        ),
      }}     
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ size }) => (
            <Text style={{ fontSize: size || 24 }}>🚀</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="informacoes"
        options={{
          title: 'Informações missão',
          tabBarIcon: ({ size }) => (
            <Text style={{ fontSize: size || 24 }}>📊</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="potencia"
        options={{
          title: 'Potência nave',
          tabBarIcon: ({ size }) => (
            <Text style={{ fontSize: size || 24 }}>⚡</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="infoSobrevivencia"
        options={{
          title: 'Informações da nave',
          tabBarIcon: ({ size }) => (
            <Text style={{ fontSize: size || 24 }}>🛰️</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="atualizar"
        options={{
          title: 'Atualizar Dados',
          tabBarIcon: ({ size }) => (
            <Text style={{ fontSize: size || 24 }}>📋</Text>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  btnDarkMode:{
    position:'absolute',
    top:40,
    right:20,
  },
})

export default function Layout() {
  return (
    <AppProvider>
      <TabsLayout />
    </AppProvider>
  );
}
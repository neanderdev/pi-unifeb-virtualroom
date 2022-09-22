import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Header } from '../../components/Header';
import { Load } from '../../components/Load';
import { Class } from '../../components/Class';

import { ClassResponse } from '../../dtos/ClassesDTO';

import { api } from '../../services/api';

import { Container, ClassList } from './styles';

export function Home() {
  const [classes, setClasses] = useState<ClassResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  async function fetchClasses() {
    try {
      const response = await api.get('class', {
        params: {
          tipo: 'C',
        },
      });

      setClasses(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleClassRoom(uid_class: string) {
    await AsyncStorage.setItem('@uid_class', uid_class);
    navigation.navigate('ClassRoom');
  }

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      fetchClasses();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Header />

      {loading
        ? <Load />
        : <ClassList
          data={classes}
          keyExtractor={item => item.uid_class}
          renderItem={({ item }) => <Class
            data={item}
            onPress={() => handleClassRoom(item.uid_class)}
          />}
        />
      }
    </Container>
  );
}

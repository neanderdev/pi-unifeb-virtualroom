import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';

import { Header } from '../../components/Header';
import { Load } from '../../components/Load';
import { Class } from '../../components/Class';

import { ClassResponse } from '../../dtos/ClassesDTO';

import { api } from '../../services/api';

import { Container, ClassList } from './styles';

export function Home() {
  const [classes, setClasses] = useState<ClassResponse[]>([]);
  const [loading, setLoading] = useState(true);

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
          renderItem={({ item }) => <Class data={item} />}
        />
      }
    </Container>
  );
}

import React from 'react';
import { StatusBar } from 'react-native';

import { Header } from '../../components/Header';
import { Class } from '../../components/Class';

import { Container, ClassList } from './styles';

export function Home() {
  const classData = {
    nameClass: 'SI 4./2022',
    nameMatterClass: 'Sistemas Operacionais',
  };

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Header />

      <ClassList
        data={[1, 2, 3, 4, 5, 6]}
        keyExtractor={item => String(item)}
        renderItem={({ item }) => <Class data={classData} />}
      />
    </Container>
  );
}

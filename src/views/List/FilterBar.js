
import React from 'react';
import { Text } from 'react-native';
import { Card, CardItem, Button } from 'native-base';

export default function FilterBar() {
  return (
    <Card style={{ marginBottom: 30, paddingHorizontal: 40 }}>
      <CardItem cardBody>
        <Button full transparent light style={{ flex: 1 }}>
          <Text style={{ color: '#494949' }}>Yours</Text>
        </Button>
        <Button full transparent light style={{ flex: 1 }}>
          <Text style={{ color: '#2196f3' }}>All</Text>
        </Button>
      </CardItem>
    </Card>
  );
}

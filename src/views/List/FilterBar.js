import React from 'react';
import { Text } from 'react-native';
import { Card, CardItem, Button } from 'native-base';

export default class FilterBar extends React.Component {
  constructor (props) {
    super();
    this.state = {
      onChange: props.onChange || (() => null),
      selectedItem: 1,
      buttonsTexts: ['Yours', 'All'],
    };
  }
  render() {
    const changeActiveButton = (index) => {
      return () => {
        if (index !== this.state.selectedItem) {
          this.setState({ selectedItem: index });
        }
        this.state.onChange(index);
      };
    };
    const items = this.state.buttonsTexts.map((item, index) => (
      <Button key={index} full transparent light style={{ flex: 1 }} onPress={changeActiveButton(index)}>
        <Text style={{ color: index === this.state.selectedItem ? '#2196f3' : '#494949' }}>{item}</Text>
      </Button>
    ));
    return (
      <Card style={{ marginBottom: 30, paddingHorizontal: 40 }}>
        <CardItem cardBody>
          { items }
        </CardItem>
      </Card>
    );
  }
}

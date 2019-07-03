import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Left,
  Right,
  Title
} from 'native-base';
import { Actions } from 'react-native-router-flux';

import { setEditingEvolutionMeasurement, updateUserEvolution } from '../store/actions';
import BodyMeasurementsForm from "../containers/BodyMeasurements/BodyMeasurementsForm";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerBody: {
    flex: 6
  },
  headerIcon: {
    flex: 2
  }
});

class BodyMeasurementsScene extends Component {

  cancel () {
    Actions.pop();
  }

  onSubmit () {
    const { authentication, editingEvolution } = this.props;

    this.props.updateUserEvolution(authentication.user, editingEvolution);

    Actions.pop();
  }

  render () {
    return (
      <Container>
        <Header>
          <Left style={styles.headerIcon}>
            <Button iconLeft transparent onPress={this.cancel.bind(this)}>
              <Icon name="x" type="Feather" />
            </Button>
          </Left>
          <Body style={styles.headerBody}>
            <Title>Medidas Corporais</Title>
          </Body>
          <Right style={styles.headerIcon}>
            <Button iconLeft transparent onPress={this.onSubmit.bind(this)}>
              <Icon name="save" type="Feather" />
            </Button>
          </Right>
        </Header>
        <Content contentContainerStyle={styles.container}>
          <BodyMeasurementsForm
            evolution={this.props.editingEvolution}
            inputAction={this.props.setEditingEvolutionMeasurement}
          />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ authentication, editingEvolution }) => ({
  authentication,
  editingEvolution
});

const mapDispatchToProps = {
  setEditingEvolutionMeasurement,
  updateUserEvolution
};

export default connect(mapStateToProps, mapDispatchToProps)(BodyMeasurementsScene);
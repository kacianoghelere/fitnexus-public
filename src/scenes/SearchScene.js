import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {
  Container,
  Header,
  Item,
  Icon,
  Input,
  Button,
  Text,
  Content,
  List,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Spinner
} from 'native-base';

import {
  executeSearch,
  setSearchTerm,
  showUserProfile,
  toggleFollow
} from '../store/actions';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  followButton: {
    margin: 0
  },
  item: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    padding: 10
  }
});

class SearchScene extends Component {

  renderRow({ avatar, name, quote, uid }) {
    return (
      <ListItem
        avatar
        noBorder
        button
        style={styles.item}
        onPress={() => this.props.showUserProfile(uid)}
      >
        <Left>
          <Thumbnail source={{ uri: avatar }} />
        </Left>
        <Body>
          <Text>{name}</Text>
          <Text note>{quote}</Text>
        </Body>
        <Right />
      </ListItem>
    );
  }

  renderResults() {
    const { searching, results = [] } = this.props.search;

    if (searching) {
      return <Spinner color="black" />;
    }

    return (
      <List
        dataArray={results}
        renderRow={this.renderRow.bind(this)}
        scrollEnabled={false}
      />
    );
  }

  render() {
    const { executeSearch, setSearchTerm } = this.props;

    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input
              placeholder="Ex: José Silva"
              onChangeText={setSearchTerm}
            />
          </Item>
          <Button transparent onPress={executeSearch}>
            <Text>Buscar</Text>
          </Button>
        </Header>
        <Content>
          {this.renderResults()}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ authentication, search }) => ({
  authentication,
  search
});

const mapDispatchToProps = {
  executeSearch,
  setSearchTerm,
  showUserProfile,
  toggleFollow
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScene);
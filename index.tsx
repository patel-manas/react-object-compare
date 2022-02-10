import React, { Component } from 'react';
import { render } from 'react-dom';
import { union } from 'lodash';

import {
  Textarea,
  Button,
  ChakraProvider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Stack,
} from '@chakra-ui/react';

import Hello from './Hello';
import './style.css';

interface AppProps {}
interface AppState {
  name: string;
  obj1: string;
  obj2: string;
  hasError: boolean;
  reset: boolean;
  table: Array<Record<string, any>>;
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React',
      obj1: '',
      obj2: '',
      hasError: false,
      table: [],
      reset: false,
    };
  }

  handleInputChange = (evt) => {
    const id = evt.target.id;
    if (id === 'obj1') {
      this.setState({ obj1: evt.target.value });
    } else {
      this.setState({ obj2: evt.target.value });
    }
  };

  compareHandler = () => {
    const { obj1, obj2 } = this.state;
    let parsedObj1 = {};
    let parsedObj2 = {};
    console.log(obj1);
    console.log(obj2);
    try {
      parsedObj1 = JSON.parse(obj1);
      parsedObj2 = JSON.parse(obj2);
    } catch (ex) {
      this.setState({ hasError: true });
    }
    this.comapare(parsedObj1, parsedObj2);
  };

  comapare = (parsedObj1, parsedObj2) => {
    const keys1 = Object.keys(parsedObj1);
    const keys2 = Object.keys(parsedObj2);
    const table = [];
    const allKeys = union(keys1, keys2);
    allKeys.forEach((key) => {
      let row = {};
      row['key'] = key;
      row['Object1'] = parsedObj1[key];
      row['Object2'] = parsedObj2[key];
      table.push(row);
    });
    this.setState({ table, reset: true });
  };

  resetHandler = () => {
    this.setState({
      name: 'React',
      obj1: '',
      obj2: '',
      hasError: false,
      table: [],
      reset: false,
    });
  };

  render() {
    const { hasError, table, reset } = this.state;
    console.log('>>', table);
    return (
      <div className="wrapper">
        <h3>Object 1</h3>
        <Textarea
          id="obj1"
          placeholder="Here is a sample placeholder"
          rows="10"
          cols="50"
          onChange={this.handleInputChange}
        />
        <h3>Object 1</h3>
        <Textarea
          id="obj2"
          placeholder="Here is a sample placeholder"
          rows="10"
          cols="50"
          onChange={this.handleInputChange}
        />
        <Stack direction="row" spacing={4} align="center">
          <Button id="compare" colorScheme="blue" onClick={this.compareHandler}>
            Compare
          </Button>
          {reset && (
            <Button id="compare" colorScheme="blue" onClick={this.resetHandler}>
              Reset
            </Button>
          )}
        </Stack>
        {hasError && (
          <span style={{ color: 'red', fontWeight: 'bold' }}>Invalid JSON</span>
        )}
        {table.length > 0 && (
          <Table variant="striped" colorScheme="teal" size="sm">
            <Thead>
              <Tr>
                <Th>Key Name</Th>
                <Th>Object 1</Th>
                <Th>Object 2</Th>
              </Tr>
            </Thead>
            <Tbody>
              {table.map((row) => {
                return (
                  <Tr>
                    <Td>{row.key}</Td>
                    <Td>{row.Object1}</Td>
                    <Td>{row.Object2}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        )}
      </div>
    );
  }
}

render(
  <ChakraProvider>
    <App />
  </ChakraProvider>,
  document.getElementById('root')
);

// npm i @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^5

import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import api from "../../services/api";
import './styles.css';

// import { Container } from './styles';

export default class Main extends Component {
  state = {
    newBox: '',
  };

  handleSubmit = async e => {
    e.preventDefault();

    const response = await api.post("boxes", {
      title: this.state.newBox
    });
    this.props.history.push(`/box/${response.data._id}`); // redireciona para a página "box" passando o id do box criado
    //console.log(response.data); // retorna o json com os dados da box criada (o mesmo mostrado no insognia)
  }
  handleInputChange = (e) => {
    this.setState({ newBox: e.target.value });
  }
  render() {
    return (
        <div id="main-container">
            <form onSubmit={this.handleSubmit}>
                <img src={logo} alt=""></img>
                <input 
                  placeholder="Criar um box"
                  value={this.state.newBox}
                  onChange={this.handleInputChange}
                />
                <button type="submit">Criar</button>
            </form>
        </div>
    );
  }
}

import React, { Component } from 'react';
import api from '../../services/api';
import { distanceInWords } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdInsertDriveFile } from 'react-icons/md';
import Dropzone from 'react-dropzone';
import socket from 'socket.io-client';
import logo from '../../assets/logo.svg';
import './styles.css'; // './'  indica a pasta atual do componente
//import { locale } from 'core-js';

export default class Box extends Component {
    state = { box: {} }

    // esse evento é invocado no momento que o componente é montado (renderizado)
    async componentDidMount() {
        this.subscribeToNewFiles();
        const box = this.props.match.params.id; // recupera o id em <Route path="/box/:id" component={Box} />
        const response = await api.get(`boxes/${box}`);
        this.setState({box: response.data});
    }

    subscribeToNewFiles = () => {
        const box = this.props.match.params.id; // recupera o id em <Route path="/box/:id" component={Box} />
        const io = socket('https://ohmnistack-backend.herokuapp.com');
        io.emit('ConnectRoom', box); // emite a informação para o backend que está conectado (connectRomm) na sala box
        io.on("file", data => { // data => dados do arquivo que acabou de receber o upload
            // quando muda o state já atualiza automaticamente a lista
            this.setState({
                box: { ...this.state.box, files: [data, ...this.state.box.files]} // reinclui todos os files, sendo que o file que foi feito upload (data) vem na frente
            })
        })
    }

    handleUpload = files => {
        files.forEach(file => {
            const data = new FormData(); // necessário para fazer upload
            const box = this.props.match.params.id; // retorna o boxID que veio na url
            data.append('file', file); // 'file' => usado na chamada da api método post (insongnia)
            api.post(`boxes/${box}/files`, data); // api criada no projeto backend (node.js)
            //console.log(file);
        });
    }
    render() {
    return (
        <div id="box-container">
            <header>
                <img src={logo} alt="" />
                <h1>{this.state.box.title}</h1>
            </header>
            <Dropzone onDropAccepted={this.handleUpload}>
                {({ getRootProps, getInputProps }) => (
                    <div className="upload" { ...getRootProps() }>
                        <input {...getInputProps()} />
                        
                        <p>Arraste aqui ou clique aqui</p>
                    </div>
                )}
            </Dropzone>
            <ul>
                { this.state.box.files &&
                    this.state.box.files.map(file => (
                        <li key={file._id}>
                            <a className="fileInfo" href={file.url} target="_blank">
                                <MdInsertDriveFile size={24} color="#A5Cfff" />
                                <strong>{file.title}</strong>
                            </a>
                            <span>
                                há {" "}
                                { distanceInWords(file.createdAt, new Date(), {
                                    locale: pt       
                                })}
                            </span>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
  }
}

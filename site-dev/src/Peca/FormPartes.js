import React, { Component, Fragment, ReactDOM } from 'react';

import { Form, Input, Spin, Tag, Row, Col, Icon } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Label from '../components/Label';
import Midia from '../components/Midia';
import Apresentacao from '../components/Apresentacao';
import { FaHandPaper } from "@react-icons/all-files/fa/FaHandPaper";



const { v4: uuidv4 } = require('uuid');

const FormItem = Form.Item;
const firebase = window.firebase;
const firebaseRef = firebase.storage().ref();

const getModelGeneralidade = () => ({
    _id: uuidv4(),
    texto: '',
    midias: [],
})

const props = {
    labelCol: {},
    wrapperCol: {},
}

class FormPartes extends Component {

    state = {
        string: '',
        tokens: [],
        midias: [],
    }

    componentWillReceiveProps(next) {
    }

    render() {

        const { partes, onChangeParte, onRemoveParte, erros } = this.props;
        const { string, tokens } = this.state;
        const { nomePartes, idx, onChange, loading } = this.props;

        const _erros = {
            partes: erros.campos.indexOf('partes'),
        };

        return (
            <Fragment>
                <Form layout="vertical">
                    <Row>
                        <Col>
                            <Label>Copie os nomes das partes anatômicas desta peça e cole-os no campo a seguir ou digite-os um a um</Label>
                            <FormItem
                                validateStatus={_erros.partes != -1 ? 'error' : ''}
                                help={erros.msgs[_erros.partes] || ''}
                            >
                                <TextArea onBlur={this.gerar} autosize id='partesTextArea' placeholder="Cada nome deve estar em uma linha" value={string} onChange={this.onChange} />
                            </FormItem>
                            <FormItem>
                                <Col>
                                    <div style={{ justifyContent: 'center', border: "1px solid #e8e8e8", borderRadius: "5px", paddingTop: "15px", margin: "0px 18px 20px 18px" }}>
                                        <Label style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                            <span style={{ width: '100%', display: "flex", justifyContent: "space-around" }}>
                                                <strong>Conteúdo da Peça em Libras</strong>
                                                <FaHandPaper style={{ width: "34px", height: "36px", paddingBottom: "14px", color: "#1890ff" }} />
                                            </span>
                                        </Label>
                                    </div>
                                </Col>
                                <Row>
                                    {partes.map((p, idx) => {
                                        return (
                                            <Col span={6} key={p._id} style={{ padding: 2, display: 'flex', justifyItems:'space-between' }}>
                                                <div style={{ width:'75%', margin: "0px 0px 20px 5px" }}>
                                                    <Apresentacao name={p.nome}
                                                        defaultValue={p}
                                                        onChange={onChange('generalidades')}
                                                        apagarDados={true}
                                                    />
                                                </div>
                                                <Icon style={{height: '10%', cursor: 'pointer', border: "2px solid #e8e8e8", borderRadius: "5px", }} type="close" onClick={onRemoveParte(p._id)} />
                                            </Col>
                                        )
                                    })}
                                    {tokens.map((item, idx) => (
                                        <Col span={6} key={item} style={{ padding: 5, display: 'flex' }}>
                                            <Tag style={{
                                                height: 22,
                                                width: '100%',
                                                textAlign: 'center',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}>{item}</Tag>
                                        </Col>
                                    ))}
                                    {partes.length == 0 && tokens.length == 0 && 'Esta peça ainda não possui partes associadas'}
                                </Row>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>

                {/* <Label>
                    <div onBlur={this.partesLibras} style={{ flexDirection: 'center', justifyContent: 'space-evenly', height: '50%', marginBottom: '1px' }}>
                        {partes.map((p, idx) => {
                            console.log(p)
                            return (
                                <Col span={5} key={p._id}>
                                    <Label style={{ width: '100%', marginLeft: '40%' }}>
                                        <Apresentacao name={p.nome}
                                            defaultValue={p}
                                            onChange={onChange('generalidades')}
                                        />
                                    </Label>
                                </Col>
                            )
                        })}
                    </div>
                </Label> */}
            </Fragment>
        )
    }

    onChange = e => {
        const string = e.target.value;
        const tokens = document.getElementById('partesTextArea').value.split(/\n/).filter(t => t != "");
        this.setState({ string, tokens })
    }

    gerar = () => {
        const { onChange, partes, idx, item } = this.props;
        const { tokens, midias } = this.state;
        this.setState({ tokens: [], string: '' })
        const novas = tokens.map(nome => ({ _id: uuidv4(), nome }));
        onChange('partes')([...partes, ...novas])
    }

    partesLibras = () => {
        console.log("cheguei")
    }
}


export default Form.create()(FormPartes);
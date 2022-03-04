import React, { Component, Fragment } from 'react';

import { List, Modal, Tooltip, Button, Select, Input, Icon, Upload, Spin, Form } from 'antd'

import Midia from './Midia'

const { v4: uuidv4 } = require('uuid');

const { Item } = List;
const FormItem = Form.Item;

const firebase = window.firebase;
const firebaseRef = firebase.storage().ref();

const getModelGeneralidade = () => ({
    _id: uuidv4(),
    texto: '',
    midias: [],
})

class FormItemApresentacao extends Component {

    ref = null;

    componentDidMount() {
        if (this.props.sinalNovo != '') {
            this.ref.focus()
        }
    }

    render() {
        const { item, idx, onChange, loading } = this.props;
        return (
            <div style={_style.item}>
                <div style={_style.textos}>
                    {this.props.name}
                </div>
                <div style={{ alignSelf: 'center' }}>
                    {item.midias.map((t, idxMidia) => <Fragment key={t._id}>
                        <Midia file={t} idx={idxMidia} midias={item.midias} onChange={onChange('midias', idx)} />
                    </Fragment>)}
                    {loading == item._id ? <Spin /> : null}
                </div>
            </div>
        )
    }
}

class Apresentacao extends Component {

    state = {
        sinalNovo: '',
        loading: false,
        open: false,
        nome: '',
        toDelete: '',
        itens: this.props.defaultValue.length > 0 ? this.props.defaultValue : [getModelGeneralidade()]
    }


    componentWillReceiveProps(next) {
        if (this.props.defaultValue.length == 0 && next.defaultValue.length > 0) {
            this.setState({ itens: next.defaultValue })
        }
    }


    componentWillUpdate(nextProps, nextState) {
        if (JSON.stringify(this.state.itens) != JSON.stringify(nextState.itens)) {
            this.props.onChange(nextState.itens)
        }
    }

    render() {
        const { loading, open, itens, sinalNovo } = this.state;
        const { name, apagarDados } = this.props;
        return (
            <Fragment >
                <List style={{ marginRight: "10px" }}
                    rowKey='_id'
                    size="small"
                    bordered={true}
                    locale={{ emptyText: 'Nenhuma generalidade adicionada' }}
                    dataSource={itens}

                    renderItem={(item, idx) => (
                        console.log(item, idx),
                        <Item key={item._id} actions={[
                            <Upload showUploadList={false} onChange={this.onUpload(idx, item.midias)} beforeUpload={this.beforeUpload(item._id)}>
                                <Tooltip title='Adicionar mídia'>
                                    <Button type='primary' ghost shape='circle' icon='paper-clip' disabled={loading} />
                                </Tooltip>
                            </Upload>,
                            <Tooltip title='Excluir'>
                                <Button type='primary' ghost onClick={this.setItem2Delete(idx)} icon='delete' shape='circle' />
                            </Tooltip>
                        ]}>
                            <FormItemApresentacao name={name} sinalNovo={sinalNovo} onEnter={this.onAdd} loading={loading} item={item} idx={idx} onChange={this.onChange} />
                        </Item>)}
                />
                <Modal
                    title={'Excluir generalidade'}
                    visible={open}
                    okText='Excluir'
                    onOk={this.onDelete}
                    cancelText='Cancelar'
                    onCancel={this.onClose}
                    okButtonProps={{ loading }}
                    cancelButtonProps={{ loading }}
                >
                </Modal>
            </Fragment>
        )
    }

    setItem2Delete = idx => () => this.setState({ open: true, toDelete: idx })

    // chooseDelete(idx) {
    //     const { itens } = this.state;
    //     if (itens.midias.length > 0 && !this.apagarDados) {
    //         this.setItem2Delete(idx);
    //     } else {
    //         this.onDelete();
    //     }
    // }

    onClose = () => this.setState({ open: false, toDelete: '' })

    onDelete = () => {
        const { itens, toDelete } = this.state;
        this.onClose();

        if (itens.length == 1) {
            this.setState({ itens: [getModelGeneralidade()] })
        } else {
            this.setState({
                itens: [
                    ...itens.slice(0, toDelete),
                    ...itens.slice(toDelete + 1),
                ]
            })
        }
    }


    onChange = (field, idx) => value => {
        const { itens } = this.state;

        this.setState({
            itens: [
                ...itens.slice(0, idx),
                { ...itens[idx], [field]: value },
                ...itens.slice(idx + 1),
            ]
        })
    }

    onAdd = () => {
        const { itens } = this.state;

        this.setState({
            sinalNovo: + new Date(),
            itens: [
                ...itens,
                getModelGeneralidade(),
            ]
        })
    }

    beforeUpload = _id => () => {
        console.log('Dispaara func');
        this.setState({ loading: _id })
        return false
    }

    onUpload = (idx, midias) => info => {
        console.log(info);
        const { onOpenSnackbar } = this.props;
        if (info.file.status !== 'uploading') {
            //Adiciona
            if (midias.find(f => f.uid == info.file.uid) == undefined) {
                const { uid, type } = info.file;
                const token = {};

                const name = (+new Date()) + '-' + info.file.name;
                const metadata = { contentType: info.file.type };

                const task = firebaseRef.child(name).put(info.file, metadata);

                task
                    .then(snapshot => snapshot.ref.getDownloadURL())
                    .then(url => {
                        this.setState({ loading: false });
                        this.onChange('midias', idx)([...midias, {
                            _id: uuidv4(),
                            type,
                            name,
                            tags: [],
                            url,
                            original: info.file
                        }])
                    })
                    .catch(err => {
                        onOpenSnackbar(err.message)
                        console.log(err)
                    });

            } else {
                this.onChange('midias', idx)(midias.filter(f => f.uid != info.file.uid))
            }
        }

    }
}


const _style = {
    item: {
        display: 'flex',
        padding: 0,
        margin: 0,
        width: '100%'
    },
    textos: { display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%', marginRight: 5 }
}


Apresentacao.defaultProps = {
    defaultValue: [getModelGeneralidade()]
}

export default Apresentacao;

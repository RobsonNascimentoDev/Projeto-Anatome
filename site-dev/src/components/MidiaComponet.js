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

class MidiaComponent extends Component {

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

export default MidiaComponent;
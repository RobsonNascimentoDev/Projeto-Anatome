import React, { Component, Fragment } from 'react';
import { Form, Button, Input, Select, Checkbox, Row, Col } from 'antd';
import { filter } from '../utils/data';
import Generalidades from '../components/Generalidades';
import Apresentacao from '../components/Apresentacao';
import { FaHandPaper } from "@react-icons/all-files/fa/FaHandPaper";
import NomeMidia from '../components/PecaComponents/NomeMidia';
import RegiaoMidia from '../components/PecaComponents/RegiaoMidia';
import SistemaMidia from '../components/PecaComponents/SistemaMidia';

const Option = Select.Option;

const FormItem = Form.Item;

const props = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
}

const FormPeca = ({ nome, idioma, regiao, sistema, erros, somentePratica, listaSistema, listaRegiao, onOpenSnackbar, onChange, onChangeSomentePratica, generalidades, nomeMidia, regiaoMidia, sistemaMidia }) => {

    const _erros = {
        nome: erros.campos.indexOf('nome'),
        idioma: erros.campos.indexOf('idioma'),
        regiao: erros.campos.indexOf('regiao'),
        sistema: erros.campos.indexOf('sistema'),
    }

    return (
        <Form layout="vertical">
            <Row gutter={16}>
                <Col span={8}>
                    <FormItem
                        validateStatus={_erros.nome != -1 ? 'error' : ''}
                        help={erros.msgs[_erros.nome] || ''}
                        label='Nome da peça'
                    >
                        <Input autoFocus placeholder="Ex: " value={nome} onChange={e => onChange('nome')(e.target.value)} />
                    </FormItem>
                </Col>
                <Col span={6}>
                    <FormItem
                        validateStatus={_erros.regiao != -1 ? 'error' : ''}
                        help={erros.msgs[_erros.regiao] || ''}
                        label="Região"
                    >
                        <Select
                            showSearch
                            value={regiao}
                            onChange={onChange('regiao')}
                            notFoundContent='Nada foi encontrado'
                            optionFilterProp="children"
                            filterOption={filter}
                        >
                            {listaRegiao.map(i => <Option key={i._id} value={i._id}>{i.name}</Option>)}
                        </Select>
                    </FormItem>
                </Col>
                <Col span={10}>
                    <FormItem
                        validateStatus={_erros.sistema != -1 ? 'error' : ''}
                        help={erros.msgs[_erros.sistema] || ''}
                        label="Sistema"
                    >
                        <Select
                            showSearch
                            value={sistema}
                            onChange={onChange('sistema')}
                            notFoundContent='Nada foi encontrado'
                            optionFilterProp="children"
                            filterOption={filter}
                        >
                            {listaSistema.map(i => <Option key={i._id} value={i._id}>{i.name}</Option>)}
                        </Select>
                    </FormItem>
                </Col>
                <Col span={24}>
                    <div style={{ border: "1px solid #e8e8e8", borderRadius: "5px", paddingTop: "15px", marginBottom: "20px" }}>
                        <FormItem style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                            <span style={{ display: "flex", justifyContent: "space-evenly" }}>
                                <strong>Conteúdo da Peça em Libras</strong>
                                <FaHandPaper style={{ width: "34px", height: "36px", paddingBottom: "14px", color: "#1890ff" }} />
                            </span>
                            <div style={{ display: 'flex', justifyContent: 'space-evenly', height: '50%', marginBottom: '1px' }}>
                                <NomeMidia defaultValue={nomeMidia} name={"Nome da Peça"} onOpenSnackBar={onOpenSnackbar} onChange={onChange('nomeMidia')} />
                                <RegiaoMidia defaultValue={regiaoMidia} name={"Nome da Região"} onOpenSnackBar={onOpenSnackbar} onChange={onChange('regiaoMidia')} />
                                <SistemaMidia defaultValue={sistemaMidia} name={"Nome do Sistema"} onOpenSnackBar={onOpenSnackbar} onChange={onChange('sistemaMidia')} />
                            </div>
                        </FormItem>
                    </div>
                </Col>
                <Col span={24}>
                    <FormItem label="Informe as generalidades do conteúdo da peça">
                        <Generalidades defaultValue={generalidades} onOpenSnackBar={onOpenSnackbar} onChange={onChange('generalidades')} />
                    </FormItem>
                </Col>
                <Col span={24}>
                    <FormItem>
                        <Checkbox checked={somentePratica} onChange={e => onChangeSomentePratica(e.target.checked)}>Somente conteúdo prático</Checkbox>
                    </FormItem>
                </Col>
            </Row>
        </Form >
    )
}


export default FormPeca;
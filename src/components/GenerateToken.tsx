import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert'
import {Formik, FormikProps} from 'formik';
import {object, string} from 'yup';
import {generateToken, getClientDetails} from "../api/token";
import {useHistory} from "react-router-dom";
import {IClient, IItem} from "../model/Client";
import {IError} from "../model/Error";

interface IGenerateToken {
    name: string;
    mobile?: string;
    email?: string;
    building?: string;
    flat?: string;
    itemType: string;
}

const initialValues: IGenerateToken = {
    name: '',
    mobile: '',
    email: '',
    building: '',
    flat: '',
    itemType: ''
};

const formSchema = object({
    name: string().required('Name is a required field'),
    itemType: string().required('Purpose is a required field')
});

export function GenerateToken(props) {

    const history = useHistory();
    const [client, setClient] = useState<IClient>();
    const [item, setItem] = useState<IItem>();
    const [error, setError] = useState<IError>();
    const [success, setSuccess] = useState<string>();

    useEffect(() => {
        fetchClient("fetchClient")
    }, []);

    const fetchClient = (actions: any) => {
        console.log('fetchClient', actions);
        getClientDetails(props.match.params.clientName).then((client) => {
            setClient(client);
            setItem(client.items[0]);
            initialValues.itemType = client.items[0].name;
        });
    };

    const submitForm = async (values: IGenerateToken, actions: any) => {
        console.log('generateToken', values, actions);

        try {
            const response = await generateToken(props.match.params.clientName, values);
            history.push({pathname: `/${props.match.params.clientName}/list-tokens`})
        } catch (errorResponse) {
            console.log("Submit Form", errorResponse);
            setError(errorResponse);
        }
    };

    const renderForms = (formikProps: FormikProps<IGenerateToken>) => {
        const {touched, errors, handleSubmit, handleChange, values} = formikProps;
        return (
            <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="token">

                    <Form.Label>Item Type</Form.Label>
                    <Form.Control
                        onChange={(props) => {
                            const selectedItem = client.items.find(item => item.name === props.target.value);
                            setItem(selectedItem);
                            setError(null);
                            handleChange(props)
                        }}
                        name="itemType"
                        isInvalid={touched['itemType'] && !!errors['itemType']}
                        type="dropdown"
                        placeholder="Item type"
                        as="select"
                    >
                        {client && client.items.map((item) => {
                            return (
                                <option value={item.name}>{item.name}</option>
                            )
                        })}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">{errors['itemType']}</Form.Control.Feedback>

                    {item && item.uiFields.map((uiField) => {
                        return (
                            <div>
                                <Form.Label>{uiField.label}</Form.Label>
                                <Form.Control
                                    onChange={handleChange}
                                    name={uiField.name}
                                    isInvalid={touched[uiField.name] && !!errors[uiField.name]}
                                    type="text"
                                    placeholder={uiField.label}
                                />
                                <Form.Control.Feedback
                                    type="invalid">{errors[uiField.name]}</Form.Control.Feedback>
                            </div>
                        )
                    })}

                </Form.Group>
                <Button type="submit">Generate Token</Button>
            </Form>
        )
            ;
    };

    return (
        <Container className="mt-4">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    {error && (
                        <Alert variant='danger' dismissible={true} onClose={() => setError(null)}>
                            {error.message}
                        </Alert>)
                    }
                    <Formik validationSchema={formSchema} onSubmit={submitForm} initialValues={initialValues}>
                        {formik => renderForms(formik)}
                    </Formik>
                </Col>
            </Row>
        </Container>
    );

}
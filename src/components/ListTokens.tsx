import React, {useEffect, useState} from 'react';
import {Button, Container, Row, Col} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit';
import {getAllTokens} from "../api/token";
import {IToken} from "../model/Token";


export function ListTokens(props) {

    const [tokens, updateTokens] = useState<IToken[]>([]);
    const {SearchBar} = Search;
    //const { ExportCSVButton } = CSVExport;

    const ExportCSV = (props) => {
        const handleClick = () => {
            props.onExport();
        };
        return (
            <Button variant="primary" onClick={handleClick}>Export To CSV</Button>
        );
    };

    const RefreshTokens = () => {
        return (
            <Button variant="primary" onClick={fetchTokens}>Refresh</Button>
        );
    };

    const fetchTokens = (actions: any) => {
        console.log('fetchTokens', actions);
        getAllTokens(props.match.params.clientName).then((response) => updateTokens(response));
    };

    useEffect(() => {
        fetchTokens("fetchTokens");
    }, []);

    const columns = [{
        dataField: 'itemName',
        text: 'Item Type',
        sort: true
    }, {
        dataField: 'number',
        text: 'Token Number',
        sort: true
    }, {
        dataField: 'sellStart',
        text: 'Sell Start',
        type: 'date',
        formatter: (cell) => {
            let dateObj = cell;
            if (typeof cell !== 'object') {
                dateObj = new Date(cell);
            }
            return dateObj.toLocaleString();
        },
        sort: true
    }, {
        dataField: 'sellEnd',
        text: 'Sell End',
        type: 'date',
        formatter: (cell) => {
            let dateObj = cell;
            if (typeof cell !== 'object') {
                dateObj = new Date(cell);
            }
            return dateObj.toLocaleString();
        },
        sort: true
    }, {
        dataField: 'slotStart',
        text: 'Slot Start',
        type: 'date',
        formatter: (cell) => {
            let dateObj = cell;
            if (typeof cell !== 'object') {
                dateObj = new Date(cell);
            }
            return dateObj.toLocaleString();
        },
        sort: true
    }, {
        dataField: 'slotEnd',
        text: 'Slot End',
        type: 'date',
        formatter: (cell) => {
            let dateObj = cell;
            if (typeof cell !== 'object') {
                dateObj = new Date(cell);
            }
            return dateObj.toLocaleString();
        },
        sort: true
    }, {
        dataField: 'fields.name',
        text: 'Name',
        sort: true
    }];

    return (
        <Container className="mt-4">
            <Row className="justify-content-md-center">
                <Col>
                    <ToolkitProvider keyField="itemName+number" data={tokens} columns={columns} search exportCSV>
                        {
                            props => (
                                <div>
                                    <SearchBar {...props.searchProps} />
                                    <div className="float-lg-right">
                                        <RefreshTokens/>{' '}
                                        <ExportCSV {...props.csvProps} />
                                    </div>
                                    <hr/>
                                    <BootstrapTable {...props.baseProps}/>
                                </div>
                            )
                        }
                    </ToolkitProvider>
                </Col>
            </Row>
        </Container>
    );
}
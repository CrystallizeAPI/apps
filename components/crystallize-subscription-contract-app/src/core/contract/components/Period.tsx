import React from 'react';
import { Badge, Col, Container, Row, Table } from 'react-bootstrap';
import { FaInfinity } from 'react-icons/fa';

export const Period: React.FC<{ period: any }> = ({ period }) => {
    return (
        <Container>
            <Row>
                <Col md={3}>
                    <p>
                        <strong>Price</strong>: {period.price} {period.currency.toUpperCase()}
                        {period.period && period.unit && (
                            <>
                                <br />
                                <strong>Period</strong>: {period.period} {period.unit}
                                <br />
                            </>
                        )}
                    </p>
                </Col>
                <Col>
                    <Table striped bordered hover size="sm">
                        <tbody>
                            {period.meteredVariables.map((meteredVariable: any) => {
                                return (
                                    <React.Fragment key={meteredVariable.id}>
                                        <tr>
                                            <th colSpan={3}>
                                                <Badge className="float-end" bg="info">
                                                    {meteredVariable.tierType}
                                                </Badge>
                                                {meteredVariable.name}{' '}
                                                {meteredVariable.unit && <>(Unit:{meteredVariable.unit})</>}
                                            </th>
                                        </tr>
                                        <tr>
                                            <th>From</th>
                                            <th>To</th>
                                            <th>Price</th>
                                        </tr>
                                        {meteredVariable.tiers.map((tier: any, tierIndex: number) => {
                                            const to = meteredVariable.tiers[tierIndex + 1]?.threshold || (
                                                <FaInfinity />
                                            );

                                            return (
                                                <tr key={`tier${tierIndex}`}>
                                                    <td>{tier.threshold}</td>
                                                    <td>{to}</td>
                                                    <td>
                                                        <Badge bg="dark" className={'float-end'}>
                                                            per unit
                                                        </Badge>
                                                        {tier.price} {tier.currency?.toUpperCase()}{' '}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </React.Fragment>
                                );
                            })}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

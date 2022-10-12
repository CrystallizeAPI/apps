import { Link } from '@remix-run/react';
import Accordion from 'react-bootstrap/Accordion';
import { FaEdit } from 'react-icons/fa';
import Badge from 'react-bootstrap/Badge';
import { Col, Container, Row } from 'react-bootstrap';
import { GiSpikesInit } from 'react-icons/gi';
import { TbFidgetSpinner } from 'react-icons/tb';
import { Period } from '~/core/contract/components/Period';
import { Contract } from '../types';

export const ContractList: React.FC<{ contracts: Contract[] }> = ({ contracts }) => {
    return (
        <Accordion flush>
            {contracts.map((contract: any, index: number) => {
                const { initial, recurring, subscriptionPlan, status } = contract;
                const willRenew = status.renewAt;
                return (
                    <Accordion.Item eventKey={`${index}`} key={`${index}-${contract.id}`}>
                        <Accordion.Header>
                            <div className="ps-4 d-flex">
                                <h2 className="h5">
                                    <Badge
                                        bg={willRenew ? 'success' : 'danger'}
                                        className="me-3 mt-1"
                                        style={{ width: 16, height: 16, borderRadius: '50%' }}
                                    >
                                        {' '}
                                    </Badge>
                                    <div>
                                        {contract.customerIdentifier}
                                        <br /> <small className="fs-6 fw-normal">#{contract.id}</small>
                                        <br />
                                        {subscriptionPlan.name}
                                    </div>
                                </h2>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <Container>
                                <Row>
                                    <Col>
                                        <Link to={'/edit/' + contract.id} className="btn btn-danger float-end">
                                            <FaEdit /> Edit
                                        </Link>
                                        <p>
                                            <strong>Contract Id</strong>: #{contract.id}, <strong>Renew At</strong>:{' '}
                                            {status.renewAt}, <strong>Active Until</strong>: {status.activeUntil}
                                        </p>
                                    </Col>
                                </Row>
                                <Row>
                                    {typeof initial?.price !== 'undefined' && (
                                        <Col>
                                            <h3>
                                                <GiSpikesInit /> Initial Period
                                            </h3>
                                            <Period period={initial} />
                                        </Col>
                                    )}
                                    {typeof recurring.price !== 'undefined' && (
                                        <Col>
                                            <h3>
                                                <TbFidgetSpinner /> Recuring Period
                                            </h3>
                                            <Period period={recurring} />
                                        </Col>
                                    )}
                                </Row>
                            </Container>
                        </Accordion.Body>
                    </Accordion.Item>
                );
            })}
        </Accordion>
    );
};

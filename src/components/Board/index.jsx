
import { Button, Container, Stack, Row, Col, Card } from "react-bootstrap";
import SearchBox from "../SearchBox";
import './Board.css'
import Alerts from '../Alerts'

function Board() {
    return (
        <div >
            
            <Container fluid >
                <Row className="ms-2 me-2 justify-content-center align-items-center" >
                        <Card draggable="false" className="mt-5 mb-3" style={{ backgroundImage: 'url(your-image-url)',height:'350px', backgroundSize: 'cover' }}>
                            <Card.Body draggable="false">
                                <Card.Title  className=" paint z-0"></Card.Title>
                                <Card.Text style={{userSelect:'none'}} className="pt-3 mt-5 text-center fs-1 fw-bold title z-3" >分享和发现二次元绘画艺术作品</Card.Text>
                                <Card.Text style={{userSelect:'none'}}  className=" text-center z-3">-- 图库，高质量插画壁纸的聚集地 --</Card.Text>
                                
                                <div className="d-flex p-5 align-items-center justify-content-center z-3">
                                    <SearchBox/>
                                </div>
                            </Card.Body>
                        </Card>
                </Row>
            </Container>
        </div>
    );
}

export default Board;
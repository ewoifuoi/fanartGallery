
import { Button, Container, Stack, Row, Col, Card } from "react-bootstrap";
import SearchBox from "../SearchBox";

function Board() {
    return (
        <div >
            <Container fluid >
                <Row className="ms-2 me-2 justify-content-center align-items-center" >
                        <Card className="mt-5 mb-3" style={{ backgroundImage: 'url(your-image-url)',height:'350px', backgroundSize: 'cover' }}>
                            <Card.Body>
                                <Card.Title className="mt-5 text-center fs-2 fw-bold">分享和发现二次元绘画艺术作品</Card.Title>
                                <Card.Text  className=" text-center">-- 图库，高质量插画壁纸的聚集地 --</Card.Text>
                                <div className="d-flex p-4 align-items-center justify-content-center">
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
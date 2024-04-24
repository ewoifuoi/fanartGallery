
import { Button, Container, Stack, Row, Col, Card } from "react-bootstrap";

function Board() {
    return (
        <div >
            <Container fluid >
                <Row className="ms-2 me-2 justify-content-center align-items-center">
                        <Card className="m-3" style={{ backgroundImage: 'url(your-image-url)', backgroundSize: 'cover' }}>
                        <Card.Body>
                        <Card.Title className="mt-5 text-center fs-2 fw-bold">分享和发现二次元绘画艺术作品</Card.Title>
                        <Card.Text  className=" text-center">-- 图库，高质量插画壁纸的聚集地 --</Card.Text>
                        <div className="text-center">
                            <Button className="mt-3 mb-5" style={{width: '200px', height: '45px'}} variant="primary">注册</Button>
                        </div>
                        </Card.Body>
                        </Card>
                </Row>
            </Container>
        </div>
    );
}

export default Board;
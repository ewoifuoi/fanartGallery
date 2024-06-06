import React, { useState, useEffect, createRef, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Form, Button, Modal } from 'react-bootstrap';
import './UploadModal.css'

import Alerts from '../Alerts';
import axios from 'axios';
import sha from 'sha256';
import EmailAnimation from '../../animations/Email/index.jsx';
import { useDispatch } from 'react-redux';

const UploadModal = (props) => {

    const [errorCode, setErrorCode] = useState(0);

    const alertRef = useRef(null);
    const fileInputRef = useRef(null);  // 用于引用隐藏的文件输入元素

    const [modalState, setModalState] = useState(0);

    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
    const [fileSize, setFileSize] = useState('');
    const [fileFormat, setFileFormat] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [imageFile, setImageFile] = useState(null);

    // 关闭登录模态框 逻辑
    const handleModalBodyClick = (e) => {
        // 检查是否点击了模态框内容以外的区域，并且不是 login__registre 元素
        if (((!e.target.closest('.upload-container1') && !e.target.closest('.upload-container2')))) {
            setImageSrc(null);
            setModalState(0);
            props.onHide();
        }
    };

    const [imageSrc, setImageSrc] = useState(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();  // 触发文件输入的点击事件
    };

    const handleFileChange = (event) => {
        
        let file = event.target.files[0];
        
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result);

                const img = new Image();
                img.src = reader.result;
                img.onload = () => {
                    setImageDimensions({ width: img.width, height: img.height });
                };

                setFileSize(formatFileSize(file.size));
                // 获取文件格式
                const fileFormat = file.name.split('.').pop().toLowerCase();
                setFileFormat(fileFormat);
            };
            reader.readAsDataURL(file);
        }
        
    };

    useEffect(()=>{
        if(imageSrc != null) setModalState(1);
        else setModalState(0);
    },[imageSrc])

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const Upload = async () => {

        const file = imageFile;
        if (!file) {
            alertRef.current.showAlert({ type: 'danger', msg: "请先选择文件" });
            return;
        }

        let formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('height', imageDimensions.height);
        formData.append('width', imageDimensions.width);
        formData.append('filetype', fileFormat);
        formData.append('filesize', fileSize);
        

        try {
            const response = await axios.post('http://124.221.8.18:8080/user/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization':`${localStorage.getItem('token')}`
                }
            });
            if(response.status == 200) {
                alertRef.current.showAlert({ type: 'success', msg: "上传成功" });
            }
        } catch (error) {
            alertRef.current.showAlert({ type: 'danger', msg: `${error.response.data}` });
        }
    };

    return (
        <div>
            <Modal
                {...props}
                dialogClassName="modal-90w"
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={props.onHide}
                
            >
                {/* 提示消息列表 */}
                <Alerts ref={alertRef}/>

                <Modal.Body onClick={handleModalBodyClick} draggable="false" >

                    {modalState==0 && <div className='upload-container1' style={{height:'580px', width:'560px', backgroundColor:'#F4F4F4'}}>
                        <div className='p-4' style={{fontSize:'30px', fontWeight:'bold', color:'#333'}}>上传图片</div>
                        <div className='d-flex justify-content-center  ms-5' style={{width:'90%', height:'80%'}}>
                            <div className='d-flex justify-content-center align-items-center' style={{width:'380px', height:'420px'}}>
                                {imageSrc==null && <div className='rounded d-flex justify-content-center align-items-center' style={{border:'3.5px dashed #BBB', height:'95%', width:'95%'}}>
                                    <div>
                                        <div style={{fontSize:'18px', fontWeight:'bold', color:'#BBB'}}>请将文件拖到此处</div>
                                        <div style={{height:'20px'}}></div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            style={{ display: 'none' }}
                                        />
                                        <div className='d-flex justify-content-center align-items-center'>
                                            <div onClick={()=>{
                                                handleButtonClick();
                                            }} className='custom-button' >选择文件</div>
                                        </div>
                                    </div> 
                                </div>}
                                <div>
                                    <img src={imageSrc} alt="" />
                                </div>
                            </div>
                            <div style={{width:'30px'}}></div>
                            
                        </div>
                    </div>}

                    {modalState==1 && <div className='upload-container2' style={{height:'580px', width:'900px', backgroundColor:'#F4F4F4'}}>
                        <div className='p-4' style={{fontSize:'30px', fontWeight:'bold', color:'#333'}}>上传图片</div>
                        <div className='d-flex justify-content-center  ms-5' style={{width:'90%', height:'80%'}}>
                            <div className='d-flex justify-content-center align-items-center' style={{width:'380px', height:'420px'}}>
                                
                                <div>
                                    <img src={imageSrc} alt="" />
                                </div>
                            </div>
                            <div style={{width:'30px'}}></div>
                            <div className='' style={{width:'380px', height:'120px'}}>
                                <div style={{fontSize:'20px', fontWeight:'bold', color:'#333'}}>图片信息</div>
                                <div className='d-flex'>
                                    <div style={{width:'10px'}}></div>
                                    <div style={{width:'100%', height:'80px'}}>
                                        <div style={{height:'10px'}}></div>
                                        <div className='info-text'>{`尺寸: ${imageDimensions.width} x ${imageDimensions.height}`}</div>
                                        <div className='info-text'>{`大小: ${fileSize}`}</div>
                                        <div className='info-text'>{`格式: ${fileFormat}`}</div>
                                    </div>
                                </div>
                                
                                <div>
                                    <div id='loginEmail' className={`title__box border border-4  
                                        ${errorCode==-1 ? 'border-primary-subtle' : errorCode==1 ? 'border-danger-subtle':'border-white'} `}
                                        onFocus={()=>{setErrorCode(-1)}}
                                        onBlur={()=>{setErrorCode(0)}}
                                        >
                                        
                                        <input maxLength={25} type="text" placeholder="标题" className="login__input " onChange={(e)=>{setTitle(e.target.value)}}/>
                                    </div>
                                    <div id='loginEmail' className={`description__box border border-4  
                                        ${errorCode==-2 ? 'border-primary-subtle' : errorCode==1 ? 'border-danger-subtle':'border-white'} `}
                                        onFocus={()=>{setErrorCode(-2)}}
                                        onBlur={()=>{setErrorCode(0)}}
                                        >
                                        
                                        <input style={{height:'100px'}} maxLength={25} type="text" placeholder="描述" className="login__input " onChange={(e)=>{setDescription(e.target.value)}} />
                                    </div>
                                </div>


                                <div style={{height:'30px'}}></div>
                                <div className='d-flex'>
                                    <div className='custom-button' style={{marginRight:'auto'}} onClick={()=>{Upload()}}>上传</div>
                                </div>
                                
                            </div>
                        </div>
                    </div>}

                </Modal.Body>

            </Modal>
           
            
        </div>
    )
}

export default UploadModal;
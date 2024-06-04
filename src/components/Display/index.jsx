import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Alerts from "../Alerts";
import axios from "axios";
import './Display.css'
import Pagination from "../Pagination";
import Image from "../Image";



const Display = (props) => {

    const alertRef = useRef(null);
    
    const [list,setList] = useState([])
    const [currentPage, setCurrentPage] = useState(1);

    const changePage = (page) => {
        setCurrentPage(page);
    }

    useEffect(()=>{
        if (!props.data || props.data.length === 0) return;

        let temp = props.data.slice((currentPage-1) * 20, currentPage * 20)
        const maxWidth = 1200; // 每行最大宽度
        const height = 200; // 固定高度
        let newList = [];
        let row = [];
        let rowWidth = 0;
        temp.forEach((item,index)=>{
            let width = (height / item.height) * item.width;

            if(rowWidth + width > maxWidth) {
                const k = maxWidth / rowWidth;
                row = row.map(image => {
                    return (
                        
                        <div
                            key={image.key}
                            
                            style={{
                                margin: '3px',
                                borderRadius:'10px',
                                height: `${height * k}px`,
                                width: `${image.width * k}px`,
                                backgroundSize: 'cover'
                            }}
                        >
                            <Image 
                            height={`${height * k}px`} 
                            width={`${image.width * k}px`} 
                            src={`${image.url}`} 
                            defaultHeight={`${height * k}px`} 
                            realWidth={`${image.width * k}px`}/>
                        </div>
                    );
                });
                newList = newList.concat(row);
                row = [];
                rowWidth = 0;
            }
            row.push({ key: index, width, url: item.url });
            rowWidth += width;
        })

         //处理最后一行
        if (row.length > 0) {
            const k = maxWidth / rowWidth;
            row = row.map(image => {
                return (
                    
                    <div
                        key={image.key}
                        
                        style={{
                            margin: '3px',
                            borderRadius:'10px',
                            height: `${height * k}px`,
                            width: `${image.width * k}px`,
                            backgroundSize: 'cover'
                        }}
                    >

                        <Image 
                            height={`${height * k}px`} 
                            width={`${image.width * k}px`} 
                            src={`${image.url}`} 
                            defaultHeight={`${height * k}px`} 
                            realWidth={`${image.width * k}px`}/>

                    </div>
                );
            });
            newList = newList.concat(row);
        }
        setList(newList);
    },
    [props.data,currentPage])

    return (
        <div>
            <Alerts ref={alertRef}/>
            <div className="d-flex flex-wrap">
                {list}
            </div>
            <div style={{height:'10px'}}></div>

            {/* 底部编页码 */}
            <div className="d-flex justify-content-center" style={{width:'100%'}}>
                <Pagination totalPages={Math.ceil(props.data.length/20)} currentPage={currentPage} onPageChange={changePage}/>
            </div>
            <div style={{height:'200px'}}></div>
        </div>
    )
}
export default Display;
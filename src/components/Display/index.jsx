import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Alerts from "../Alerts";
import axios from "axios";
import './Display.css'
import Pagination from "../Pagination";



const Display = (props) => {

    const alertRef = useRef(null);
    
    const [list,setList] = useState([])

    useEffect(()=>{
        if (!props.data || props.data.length === 0) return;

        let temp = props.data.slice(0, 20)
        const maxWidth = 1200; // 每行最大宽度
        const height = 200; // 固定高度
        let newList = [];
        let row = [];
        let rowWidth = 0;
        temp.forEach((item,index)=>{
            let width = (height / item.height) * item.width;
            // console.log(width)
            if(rowWidth + width > maxWidth) {
                const k = maxWidth / rowWidth;
                row = row.map(image => {
                    return (
                        <div
                            key={image.key}
                            className="p-1"
                            style={{
                                margin: '5px',
                                borderRadius:'10px',
                                height: `${height * k}px`,
                                width: `${image.width * k}px`,
                                backgroundImage: `url(${image.url})`,
                                backgroundSize: 'cover'
                            }}
                        ></div>
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
                        className="p-1"
                        style={{
                            margin: '10px',
                            borderRadius:'10px',
                            height: `${height * k}px`,
                            width: `${image.width * k}px`,
                            backgroundImage: `url(${image.url})`,
                            backgroundSize: 'cover'
                        }}
                    ></div>
                );
            });
            newList = newList.concat(row);
        }
        setList(newList);
    },
    [props.data])

    return (
        <div>
            <Alerts ref={alertRef}/>
            <div className="d-flex flex-wrap">
                {list}
            </div>
            <div style={{height:'10px'}}></div>

            {/* 底部编页码 */}
            <div className="d-flex justify-content-center" style={{width:'100%'}}>
                <Pagination totalPages={Math.ceil(props.data.length/20)} currentPage={1}/>
            </div>

        </div>
    )
}
export default Display;
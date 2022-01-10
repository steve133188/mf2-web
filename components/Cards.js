import Button from '@mui/material/Button'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {useEffect, useState} from "react";
import dynamic from "next/dynamic";
import { DisconnectSVG, RefreshSVG } from '../public/intergration/intergSVG';
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function Card_channel(props) {
    const [showMe, setShowMe] = useState(false);
    function toggle(){
        setShowMe(!showMe);
    }
    const handelDisconnect = (e)=>{
        // props.state
        props.disconnect(e)
    }
    return (
        <div className="card_channel_layout">
            <div className="card_channel"  >
                <div className="connect_group" >
                    <img src={props.src} width="40px" height="40px" alt=""/>
                    <label className="tickSVG" id={props.channelID} onClick={props.onclick}  >
                        <Button  onClick={toggle} variant={props.state?"outlined":""} style={{
                            borderRadius: "10px",
                            paddingLeft: "1rem",
                            color:props.state? "white":"black",
                            background: props.state? "#2198FA":"#E6E9EA",
                        }}
                                disabled={props.disabled}

                        >
                            <CheckCircleIcon sx={{fontSize: 15.4, marginRight: 1,display:props.state?"block":"none"}}/>{props.state?"Connected":"Connect"}
                        </Button>
                            <label className="tickBroad" onClick={toggle} style={{
                                display:  props.state&& showMe ? "block":"none"
                            }}>
                                <Button id="refreshToken" variant="outlined" style={{
                                    borderRadius: "10px",
                                    marginRight: "1rem",
                                    // color: "white",
                                    background:"transparent",
                                }}>
                                <RefreshSVG sx={{fontSize: 15.4}} /><span style={{ marginLeft: "10px",marginRight:"23px"}}>Refresh</span>
                                </Button>
                                <Button id="disconnect" variant="outlined" style={{
                                    borderRadius: "10px",
                                    paddingLeft: "1rem",
                                    // color: "white",
                                    background:"transparent",
                                }}>
                                    <RemoveCircleIcon sx={{fontSize: 15.4, marginRight: 1}} style={{fill:"#fc736a"}}/><div id={props.channelID}  onClick={toggle}>disconnect</div>
                                </Button>
                            </label>
                    </label>

                    <label className="tickSVG" onClick={toggle} style={{
                        display: "none"
                    }}>
                        <Button id="connectedBtn" variant="outlined" style={{
                            borderRadius: "10px",
                            // paddingLeft: "1rem",
                            color: "#444444",
                            background: "#F5F6F8",
                            border: "none",
                            height:"30px",
                        }}
                        >
                            Connect
                        </Button>
                    </label>
                </div>
                <div className="information_group">
                    <span>{props.name}</span>
                    <p>{props.state ? "Connected " : "Connect "} to {props.name} </p>
                </div>
            </div>
        </div>
    )
}

export function LineChartCard({children,...props}) {
    const {data} = props;
    const [chartState, setChartState] = useState({
        series1: [{
            data: data
        }],
        options1: {
            chart: {
                type: 'line',
                width: 100,
                height: 35,
                sparkline: {
                    enabled: true
                }
            },
            stroke: {
                curve: 'smooth',
                width: ['2']
            },
            colors: ['#2385FC'],
            tooltip: {
                fixed: {
                    enabled: false
                },
                x: {
                    show: false
                },
                y: {
                    title: {
                        formatter: function (seriesName) {
                            return ''
                        }
                    }
                },
                marker: {
                    show: false
                }
            }
        },

    })

    useEffect(() => {
        setChartState({...chartState,
            series1: [{
                data: data,
            }]
        })
    }, [])

    return (
        <div className="lineChartCard">
            <div className={"lineChartCardTitle"}>{props.title}</div>
            <div className={"contentGroup"}>
                <div className={"dataGroup"}>
                    <div className={"number"}>{data[data.length -1]}</div>
                    {/* <div className={"changingPercentagePos"}>{(data[data.length -1] -data[data.length -2]) / data[data.length -1]* 100 + "%"}</div> */}
                    <div style={{minHeight:"20px",width:"10px"}}></div>
                </div>
                <Chart options={chartState.options1} series={chartState.series1} type="line" height={35} width={100} hidden={props.chart?!props.chart:true} />
                <img key={"id"} width="32px" height="32px" src={`/channel_SVG/${props.channel}.svg`}  hidden={props.img?!props.img:true}  alt=""/>
            </div>
        </div>
    )
}

export function ChangingPercentageCard({children,...props}) {
    const {title, data1, data2} = props;
    let classnamee=  "changingPercentagePos"
    // let changing = ((data2 - data1) / data2 * 100).toFixed(2) + "%"
    let changing = data1 + "%"

    if(changing.charAt(0)=='-') {
        classnamee = "changingPercentageNeg";
    }

    return (
        <div className={"changingPercentageCard"}>
            <div className={"changingPercentageCardTitle"}>
                {title}
            </div>
            <div className={"dataGroup"}>
                <div className={"number"}>{data2}</div>
                <div className={classnamee}>
                    {changing}
                </div>
            </div>
        </div>
    )
}

export function BigChangingPercentageCard({children,...props}) {
    const {title, leftTitle, leftTotal, leftPercentage, rightTitle, rightTotal, rightPercentage} = props;
    let leftClass = "";
    let rightClass = ""

    if(leftPercentage.charAt(0)=='+') {
        leftClass = "changingPercentagePos";
    } else if (leftPercentage.charAt(0)=='-') {
        leftClass = "changingPercentageNeg";
    }
    else {
        leftClass = "changingPercentage";
    }

    if(rightPercentage.charAt(0)=='+') {
        rightClass = "changingPercentagePos";
    } else if (rightPercentage.charAt(0)=='-') {
        rightClass = "changingPercentageNeg";
    }
    else {
        rightClass = "changingPercentage";
    }

    return (
        <div className={"bigChangingPercentageCard"}>
            <p>{title}</p>
            <div className="dataGroup">
                <div className="left">
                    <p>{leftTitle}</p>
                    <div className={"dataSet"}><span className={"totalData"}>{leftTotal}</span><span className={leftClass}>{leftPercentage}</span></div>
                </div>
                <div className={"straightLine"}></div>
                <div className="right">
                    <p>{rightTitle}</p>
                    <div className={"dataSet"}><span className={"totalData"}>{rightTotal}</span><span className={rightClass}>{rightPercentage}</span></div>
                </div>
            </div>
        </div>
    )
}

export function AverageDailyCard({children,...props}) {
    const {data} = props;
    let total = data / 60+ " Mins"
    return (
        <div className="lineChartCard">
            <div className={"lineChartCardTitle"}>Average Daily Online Time</div>
            <div className={"dataGroup"}>
                <div className={"onlineTime"}>{total}</div>

            </div>
        </div>
    )
}

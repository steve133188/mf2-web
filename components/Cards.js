import Button from '@mui/material/Button'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {useEffect, useState} from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function Card_channel(props) {
    const [showMe, setShowMe] = useState(false);
    function toggle(){
        setShowMe(!showMe);
    }
    return (
        <div className="card_channel_layout">
            <div className="card_channel">
                <div className="connect_group">
                    <img
                        src={props.src} width="40px" height="40px" alt=""/>
                    <label className="tickSVG" onClick={toggle} style={{
                        display:  "block"
                    }}>
                        <Button id="connectedBtn" variant="outlined" style={{
                            borderRadius: "10px",
                            paddingLeft: "1rem",
                            color: "white",
                            background: "#2198FA"
                        }}
                                disabled={props.disabled}

                        >
                            <CheckCircleIcon sx={{fontSize: 15.4, marginRight: 1}}/>Connected
                        </Button>
                    </label>
                    <label className="tickSVG" onClick={toggle} style={{
                        display: "none"
                    }}>
                        <Button id="connectedBtn" variant="outlined" style={{
                            borderRadius: "10px",
                            paddingLeft: "1rem",
                            color: "#444444",
                            background: "#F5F6F8",
                            border: "none"
                        }}
                        >
                            Connect
                        </Button>
                    </label>
                </div>
                <div className="information_group">
                    <span>{props.name}</span>
                    <p>{showMe ? "Connected " : "Connect "} to {props.name} </p>
                </div>
            </div>
        </div>
    )
}

export function LineChartCard({children,...props}) {
    const {lineColor} = props;
    const [chartState, setChartState] = useState({
        series1: [{
            data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
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
    return (
        <div className="lineChartCard">
            <div className={"lineChartCardTitle"}>Total no.of Agent</div>
            <div className={"contentGroup"}>
                <div className={"dataGroup"}>
                    <div className={"number"}>50</div>
                    <div className={"changingPercentagePos"}>+ 25%</div>
                </div>
                <Chart options={chartState.options1} series={chartState.series1} type="line" height={35} width={100} />
            </div>
        </div>
    )
}

export function ChangingPercentageCard({children,...props}) {
    const {title, total, changing} = props;
    let classnamee= "";

    if(changing.charAt(0)=='+') {
        classnamee = "changingPercentagePos";
    } else if (changing.charAt(0)=='-') {
        classnamee = "changingPercentageNeg";
    }
    else {
        return null;
    }
    return (
        <div className={"changingPercentageCard"}>
            <div className={"changingPercentageCardTitle"}>
                {title}
            </div>
            <div className={"dataGroup"}>
                <div className={"number"}>{total}</div>
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

export function AverageDailyCard() {
    return (
        <div className="lineChartCard">
            <div className={"lineChartCardTitle"}>Average Daily Online Time</div>
            <div className={"dataGroup"}>
                <div className={"onlineTime"}>09:20:11</div>

            </div>
        </div>
    )
}

import {useEffect, useState} from "react";
import dynamic from "next/dynamic";
// import ReactApexChart from "react-apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function LineChart({children,...props}) {
    const {xname, title, data, yaxis, x_cate, total, percentage} = props;
    const [loading, setLoading] = useState(true)
    const [state, setState] = useState({
        series: [{
            name: "Contacts",
            data: data,
            yaxis: "contacts"
        }],
        options: {
            chart: {
                id: 'fb',
                type: 'area',
                height: "350",
                zoom: {
                    enabled: false
                }
            },
            colors: ['#5B73E8'],
            stroke: {
                curve: 'straight'
            },


            markers: {
                size: 0
            },
            xaxis: {
                categories: x_cate,
                title: {
                    text: xname
                },
                label: {
                    style: {
                        color: "#5B73E8",
                        fontSize: "12"
                    }
                }
            },
            yaxis: {
                title: {
                    text: yaxis
                },
                label: {
                    style: {
                        fontSize: "10",
                        color: "#5B73E8"
                    }
                }
            },
        },
    })

    useEffect(() => {
        if (data != []) {
            setState({...state,
                series: [{
                    name: "Contacts",
                    data: data,
                    yaxis: "contacts"
                }],

            })
        }
    }, [
        props.data
    ])

    return (
        <div>
            <div id="wrapper">
                <div id="chart-line">
                    <div><p style={{color: "#495057", fontSize: "16px", fontWeight: "600"}}>{title}</p>
                        <div style={{marginLeft: "25px", fontSize: "12px", color: "#74788D"}}>Total <div style={{color: "#6279EC", fontSize: "20px", fontWeight: "bold"}}>{total}<span style={{marginLeft: "6px", fontSize: "8px", fontWeight: "600", color: "#34C38F"}}>{percentage}</span></div></div>
                    </div>
                    <Chart options={state.options} series={state.series} type="line" />
                </div>
            </div>
        </div>
    )
}

export function MultipleLineChart({children,...props}) {
    const {title, data1, data2, data3, min1, min2, min3, yaxis} = props;
    const [state, setState] = useState({
        series: [{
            name: "Total Contacts",
            data: data1,
        },
            {
                name: "Mary Foster",
                data: data2,
            },
            {
                name: "Harry Stewart",
                data: data3,
            }
        ],
        options: {
            // subtitle: {
            //     text: 'Longest',
            //     align: 'left',
            // },
            colors: ['#5B73E8', '#68C093', '#F1B44C'],
            chart: {
                id: 'fb',
                // group: 'social',
                type: 'line',
                height: "350",
                zoom: {
                    enabled: false
                }
            },
            stroke: {
                curve: 'straight'
            },
            title: {
                text: '.',
                align: 'left'
            },
            markers: {
                size: 0,
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                title: {
                    text: 'Month'
                }
            },
            yaxis: {
                title: {
                    text: {yaxis}
                },
            },
            dataLabels: {
                enabled: false
            },

            legend: {
                position: 'top',
                horizontalAlign: 'right',
                floating: true,
                offsetY: -10,
                offsetX: -5
            }
        },

    })


    return (
        <div>
            <div id="wrapper">
                <div id="chart-line">
                    <div><p style={{color: "#495057", fontSize: "16px", fontWeight: "600"}}>{title}</p>
                        <div style={{marginLeft: "25px", fontSize: "12px", color: "#74788D"}}>Longest <div style={{color: "#6279EC", fontSize: "20px", fontWeight: "bold"}}>{min1} mins<span style={{color: "#34C38F", fontSize: "20px", fontWeight: "bold", marginLeft: "20px"}}>{min2} mins</span><span style={{color: "#F1B44C", fontSize: "20px", fontWeight: "bold", marginLeft: "20px"}}>{min3} mins</span></div></div>
                    </div>
                    <Chart options={state.options} series={state.series} type="line"/>
                </div>
            </div>
        </div>
    )
}

export function MultipleBarChart({children,...props}) {
    const {title, active, delivered, unhandled,agents, min1, min2, min3, yaxis,show,h} = props;
    const [state, setState] = useState({
        // options: {
            chart: {
                type: 'bar',
                height: {h},
                stacked: true,
                toolbar: {
                    show: true
                },
                zoom: {
                    enabled: true
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    }
                }
            }],
            plotOptions: {
                bar: {
                    horizontal: false,
                    borderRadius: 10,
                    columnWidth: '100%',
                },
            },
            xaxis: {
                type: 'string',
                categories: agents,
            },
            legend: {
                position: 'right',
                offsetY: 100
            },
            fill: {
                opacity: 1,
                colors: ["#2198FA","#6279EC", '#34C38F']
            },
            series: [{
                name: 'Unhandled Contacts',
                data: unhandled
            }, {
                name: 'Delivered Contacts',
                data: delivered
            }, {
                name: 'Active Contacts',
                data: active
            }]
        // },


        })

        useEffect(()=>{
            console.log("props",active)
            console.log("props",props)
            setState({...state,
                series: [{
                    name: 'Unhandled Contacts',
                    data: unhandled
                }, {
                    name: 'Delivered Contacts',
                    data: delivered
                }, {
                    name: 'Active Contacts',
                    data: active
                }],
                options: {
                    xaxis: {
                        type: 'string',
                        categories: agents,
                    },
                }
            })
        },[
            show
        ])




            return (
            <div id="chart">
                <ReactApexChart options={state.options} series={state.series} type="bar" height={h} />
                </div>
                )
}

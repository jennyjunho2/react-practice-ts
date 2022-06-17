import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

interface ChartProps {
    coinId: string
}

function Chart({ coinId }: ChartProps) {
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId))
    const isDark = useRecoilValue(isDarkAtom);
    return (
        <div>
            {isLoading ? "Loading chart..." :
                (<ApexCharts
                    type="line"
                    series={
                        [
                            {
                                name: "Price",
                                data: data?.map(price => price.close) ?? [],
                            }
                        ]
                    }
                    options={{
                        theme: {
                            mode: isDark ? "dark" : "light",
                        },
                        chart: {
                            height: 500,
                            width: 500,
                            toolbar: {
                                show: false,
                            },
                            background: "transparent",
                        },
                        stroke: {
                            curve: "smooth",
                            width: 4,
                        },
                        yaxis: {
                            show: false,
                        },
                        xaxis: {
                            axisBorder: {
                                show: false,
                            },
                            labels: {
                                show: false,
                            },
                            axisTicks: {
                                show: false,
                            },
                            type: "datetime",
                            categories: data?.map((price) => price.time_close)
                        },
                        fill: {
                            type: "gradient",
                            gradient: { gradientToColors: ["#0be881"], stops: [0, 100] }
                        },
                        colors: ["#0fbcf9"],
                        tooltip: {
                            y: {
                                formatter: (value) => `$${value.toFixed(2)}`
                            }
                        }
                    }

                    }>
                </ApexCharts>)}
        </div>
    );
}

export default Chart;
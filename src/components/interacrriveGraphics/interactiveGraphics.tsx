import React, { useState, useRef, useEffect } from 'react';
import { Chart, ChartData, ChartOptions, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Plugin } from 'chart.js';
import { Line } from 'react-chartjs-2';
import './interactiveGraphics.css';

// Регистрируем необходимые компоненты
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const InteractiveChart: React.FC = () => {
    const [date, setDate] = useState<string>('Янв 2025');
    const [mousePosition, setMousePosition] = useState<{ x: number | null; y: number | null }>({ x: null, y: null });
    const chartRef = useRef<Chart<'line', number[], string> | null>(null);

    // Данные для 18 месяцев
    const months = [
        'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
        'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек',
        'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'
    ];

    const data: ChartData<'line', number[], string> = {
        labels: months, // 18 месяцев
        datasets: [{
            label: 'Прогресс обучения',
            data: [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51], // Пример данных
            backgroundColor: 'rgba(75, 192, 192, 0)', // Прозрачный фон
            borderColor: 'rgba(75, 192, 192, 0)', // Прозрачная линия
            borderWidth: 0, // Убираем линию
            fill: false, // Отключаем заливку
        }]
    };

    // Кастомный плагин для отрисовки вертикальных линий, красной линии и горизонтальной полоски
    const gridLinesPlugin: Plugin<'line'> = {
        id: 'gridLines',
        afterDraw: (chart) => {
            const { ctx } = chart;
            const xAxis = chart.scales.x;
            const yAxis = chart.scales.y;

            // Вертикальные линии на значениях 0, 3, 6, 9, 12, 15, 18
            const verticalValues = [0, 3, 6, 9, 12, 15, 18];
            verticalValues.forEach((value) => {
                const x = xAxis.getPixelForValue(value);
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(x, yAxis.top);
                ctx.lineTo(x, yAxis.bottom);
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)'; // Цвет вертикальных линий
                ctx.stroke();
                ctx.restore();
            });

            // Горизонтальная полоска снизу
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(xAxis.left, yAxis.bottom);
            ctx.lineTo(xAxis.right, yAxis.bottom);
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)'; // Цвет горизонтальной полоски
            ctx.stroke();
            ctx.restore();

            // Красная вертикальная линия, которая следует за мышкой
            const { x } = mousePosition;
            if (x !== null && x >= xAxis.left && x <= xAxis.right) {
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(x, yAxis.top);
                ctx.lineTo(x, yAxis.bottom);
                ctx.lineWidth = 4;
                ctx.strokeStyle = 'red'; // Цвет красной линии
                ctx.stroke();
                ctx.restore();
            }
        }
    };

    const options: ChartOptions<'line'> = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        scales: {
            x: {
                display: true,
                position: 'top', // Перемещаем ось X наверх
                grid: {
                    display: false, // Убираем сетку для оси X
                },
                ticks: {
                    callback: (_value, index) => {
                        // Отображаем только 0, 3, 6, 9, 12, 15, 18
                        const displayValues = [0, 3, 6, 9, 12, 15, 18];
                        return displayValues.includes(index) ? index : '';
                    },
                    color: 'black', // Цвет текста
                    font: {
                        size: 14, // Размер шрифта
                    },
                },
            },
            y: {
                display: false, // Скрываем ось Y (прогресс)
            },
        },
        plugins: {
            tooltip: {
                enabled: false, // Отключаем tooltip
            },
            legend: {
                display: false, // Скрываем легенду
            },
        },
        onHover: (_event: any, chartElement: any) => {
            if (chartElement.length > 0) {
                const index = chartElement[0].index;
                const month = data.labels![index];
                const year = 2025 + Math.floor(index / 12); // Вычисляем год
                setDate(`${month} ${year}`);
            }
        },
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (chartRef.current) {
            const chart = chartRef.current;
            const canvas = event.nativeEvent.target as HTMLCanvasElement;
            const rect = canvas.getBoundingClientRect();
            const x = event.nativeEvent.clientX - rect.left;
            const y = event.nativeEvent.clientY - rect.top;

            setMousePosition({ x, y });

            const points = chart.getElementsAtEventForMode(event.nativeEvent, 'nearest', { intersect: true }, true);
            if (points.length > 0) {
                const index = points[0].index;
                const month = data.labels![index];
                const year = 2025 + Math.floor(index / 12); // Вычисляем год
                setDate(`${month} ${year}`);
            }
        }
    };

    // Очистка графика при размонтировании компонента
    useEffect(() => {
        const chart = chartRef.current;
        return () => {
            if (chart) {
                chart.destroy();
            }
        };
    }, []);

    return (
        <div className='graph-main-div'>
            <div className='graph-hide-date'>
                {date}
            </div>
            <Line
                ref={chartRef}
                data={data}
                options={options}
                plugins={[gridLinesPlugin]}
                onMouseMove={handleMouseMove}
            />
        </div>
    );
};

export default InteractiveChart;
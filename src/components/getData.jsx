import React, { useState } from "react";
import { subMonths, format, startOfMonth } from 'date-fns';

function GetData() {
    const [loading, setLoading] = useState(false);

    async function handleClick() {
        setLoading(true);
        try {
            const props = date();
            const fetchedData = await fetchData(props);
            const { newData, currentData } = JSON.parse(fetchedData);

            if (!newData || newData.length === 0) {
                console.error("Error: Data is null or newData array is empty");
                return;
            }

            const table = formatData(newData);

            if (currentData && currentData.length > 0) {
                const filteredCurrentData = filterData(currentData, table[0][1]);
                await writeData([...filteredCurrentData, ...table]);
            } else {
                await writeData(table);
            }
        } catch (error) {
            console.error("Error:", error);
        }
        setLoading(false);
    }

    function formatData(data) {

        return data.map(item => {
            const dueDate = item.card.due_date;
            const completedAt = item.card.completed_at;

            return [
                item.id,
                item.for_date ? format(item.for_date, 'yyyy-MM-dd') : '',
                dueDate ? format(dueDate, 'yyyy-MM-dd') : '',
                completedAt ? format(completedAt, 'yyyy-MM-dd') : '',
                item.card.board.spaces[0].title,
                item.role.name,
                item.card.title,
                item.comment,
                item.card.completed_on_time ? 1.2 : 1,
                item.time_spent
            ]
        });
    }

    function filterData(data, fromDate) {
        return JSON.parse(data)
            .filter(item => new Date(item[1]) <= new Date(fromDate) && format(item[1], 'yyyy-MM-dd') !== fromDate)
            .map(item => [
                item[0],
                format(item[1], 'yyyy-MM-dd'),
                item[2] ? format(item[2], 'yyyy-MM-dd') : '',
                Item[3] ? format(item[3], 'yyyy-MM-dd') : '',
                item[4],
                item[5],
                item[6],
                item[7],
                item[8],
                item[9],
            ]);
    }


    async function fetchData(obj) {
        return new Promise((resolve, reject) => {
            google.script.run
                .withSuccessHandler((res) => {
                    resolve(res);
                })
                .withFailureHandler((err) => {
                    reject(err);
                })
                .fetchData(obj);
        });
    }

    async function writeData(data) {
        return new Promise((resolve, reject) => {
            google.script.run
                .withSuccessHandler((res) => {
                    resolve(res);
                })
                .withFailureHandler((err) => {
                    reject(err);
                })
                .writeToSheet(data);
        });
    }

    function date() {
        const currentDate = new Date();
        const from = subMonths(currentDate, 2);
        const to = format(currentDate, 'yyyy-MM-dd');
        const fromFormatted = format(startOfMonth(from), 'yyyy-MM-dd');

        return {
            from: fromFormatted,
            to: to,
            developer: localStorage.getItem('user_id')
        };
    }

    return (
        <div className="update">
            <button onClick={handleClick} disabled={loading}>Обновить данные</button>
            {loading && <div className="loader"></div>}
        </div>

    )
}

export default GetData;
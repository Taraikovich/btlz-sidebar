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
        return data.map(item => [
            item.id,
            item.for_date,
            item.card.board.spaces[0].title,
            item.role.name,
            item.card.title,
            item.comment,
            item.time_spent
        ]);
    }

    function filterData(data, fromDate) {
        return JSON.parse(data)
            .filter(item => new Date(item[1]) <= new Date(fromDate) && format(item[1], 'yyyy-MM-dd') !== fromDate)
            .map(item => [
                item[0],
                format(item[1], 'yyyy-MM-dd'),
                item[2],
                item[3],
                item[4],
                item[5],
                item[6]
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

    async function getData() {
        return new Promise((resolve, reject) => {
            google.script.run
                .withSuccessHandler((res) => {
                    resolve(res);
                })
                .withFailureHandler((err) => {
                    reject(err);
                })
                .getTableData();
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
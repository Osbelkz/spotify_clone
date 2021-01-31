import React from 'react';
import classes from "./Table.module.scss";

export interface ITableModel {
    title: (index: number) => JSX.Element
    render: (dataItem: any, modelIndex: number, dataIndex: number, saved: boolean) => JSX.Element
}

interface ITableProps {
    model: ITableModel[]
    data: any
    disabled?: boolean
    contains: boolean[]
}

const Table: React.FC<ITableProps> = React.memo(({model, data, contains, disabled = false}) => {

    // console.log(contains)

    return (
        <table className={`${classes.table} ${disabled ? classes.table__loading : ""}`}>
            <thead>
            <tr className={classes.header}>
                {model.map((m: ITableModel, index: number) => m.title(index))}
            </tr>
            </thead>
            <tbody>
            {data.map((dataItem: any, dataIndex: number) => (
                <tr className={classes.data} key={dataIndex}>
                    {model.map((m, modelIndex) => m.render(dataItem, modelIndex, dataIndex, contains[dataIndex]))}
                </tr>
            ))}
            </tbody>
        </table>
    );
})

export default Table;

import React from 'react';
import classes from "./Table.module.scss";

export interface ITableModel {
    title: (index: number) => JSX.Element;
    render: (dataItem: any, modelIndex: number, dataIndex: number) => JSX.Element;
}

interface ITableProps {
    model: ITableModel[];
    data: any;
    disabled?: boolean
}

const Table: React.FC<ITableProps> = React.memo(({model, data, disabled = false}) => {

    return (
        <table className={`${classes.table} ${disabled ? classes.table__loading : ""}`}>
            <thead>
            <tr className={classes.header}>
                {model.map((m: ITableModel, index: number) => m.title(index))}
            </tr>
            </thead>
            <tbody>
            {data.map((dataItem: any, dataIndex: number) => (
                <tr className={classes.data} key={dataItem._id}>
                    {model.map((m, modelIndex) => m.render(dataItem, modelIndex, dataIndex))}
                </tr>
            ))}
            </tbody>
        </table>
    );
})

export default Table;

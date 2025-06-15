"use client";
import React from "react";

export default function AdminTable({ columns, data }) {
    return (
        <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full text-sm text-left text-gray-700">
                <thead className="bg-gray-100 uppercase text-xs">
                    <tr>
                        <th className="px-4 py-3">
                            <input type="checkbox" />
                        </th>
                        {columns.map((col, index) => (
                            <th key={index} className="px-4 py-3">{col.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-4 py-3">
                                <input type="checkbox" />
                            </td>
                            {columns.map((col, colIndex) => (
                                <td key={colIndex} className="px-4 py-3">
                                    {col.render ? col.render(row) : row[col.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

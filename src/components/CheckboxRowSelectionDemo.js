import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputSwitch } from 'primereact/inputswitch';
import { InputNumber } from 'primereact/inputnumber';
import { ProductService } from '../service/ProductService';

import 'primereact/resources/themes/saga-blue/theme.css'; // PrimeReact theme
import 'primereact/resources/primereact.min.css'; // PrimeReact core styles
import 'primeicons/primeicons.css'; // PrimeIcons

export default function CheckboxRowSelectionDemo() {
    const [artworks, setArtworks] = useState([]);
    const [selectedArtworks, setSelectedArtworks] = useState(null);
    const [rowClick, setRowClick] = useState(true);
    const [rows, setRows] = useState(5); // Default number of rows

    useEffect(() => {
        ProductService.getArtworks().then((data) => setArtworks(data));
    }, []);

    // Custom header for the "Title" column with an InputNumber beside it
    const titleHeader = (
        <div className="flex align-items-center gap-2">
            <span>Title</span>
            <InputNumber value={rows} onChange={(e) => setRows(e.value)} showButtons min={1} max={artworks.length} placeholder="Rows" />
        </div>
    );

    return (
        <div className="card">
            <div className="flex justify-content-center align-items-center mb-4 gap-2">
                <InputSwitch inputId="input-rowclick" checked={rowClick} onChange={(e) => setRowClick(e.value)} />
                <label htmlFor="input-rowclick">Row Click</label>
            </div>
            <DataTable value={artworks} paginator rows={rows} selectionMode={rowClick ? null : 'checkbox'} selection={selectedArtworks} onSelectionChange={(e) => setSelectedArtworks(e.value)} dataKey="id" tableStyle={{ minWidth: '50rem' }}>
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                <Column field="title" header={titleHeader}></Column> {/* Use custom header */}
                <Column field="artist_display" header="Artist"></Column>
                <Column field="date_display" header="Date"></Column>
            </DataTable>
        </div>
    );
}

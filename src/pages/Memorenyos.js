import React from 'react'
import {getData} from '../fuctions/CRUD';

export const Memorenyos = () => (
    <div>
        <div>
        <h1>Memoreños</h1>
        var memorenyos = getData('memorenyos');
        </div>
    </div>
);
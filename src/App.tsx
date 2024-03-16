import React from 'react';
import './App.css';
import {BilliardTable} from "./components/BilliardTable/BilliardTable";

const App: React.FC = () => {
    return (
        <div className={'app'}>
            <BilliardTable/>
        </div>
    )
};

export default App;

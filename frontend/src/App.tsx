import React, {FC, useEffect, useState} from 'react';
import './App.css';

interface ILotSpaceInfo {
    lotName: string;
    lots: number[];
}

interface ILotInformation {
    lotInfo: ILotSpaceInfo
}

const LotInformation: FC<ILotInformation> = (props) => {
    const {lotName, lots} = props.lotInfo;
    return (
        <div className={"outlined"}>
            <h2  id={"lotHeading"}>{lotName}</h2>
            <div className={"centered"}>
            {lots.map((lot, index) => lot === 1 ? <OccupiedLot number={index} key={index}/> : <EmptyLot number={index} key={index}/>)}
            </div>
        </div>
    )
};

const EmptyLot: FC<{number: number}> = (props) => (<span className={"lot empty"}>{props.number}</span>);
const OccupiedLot: FC<{number: number}> = (props) => (<span className={"lot occupied"}>{props.number}</span>);

const App: React.FC = () => {
    const [lotSpaceInfo, setLotSpaceInfo] = useState<ILotSpaceInfo[]>();

    useEffect(()=>{
        new WebSocket(`ws://${window.location.hostname}:8081/ws`)
            .onmessage = ((msg)=>{
            setLotSpaceInfo(JSON.parse(msg.data))
        });
    }, []);

    return (
        <div className="app">
            {lotSpaceInfo?.map((lot, index)=> (
                <LotInformation lotInfo={lot} key={index}/>
            ))}

        </div>
    );
};

export default App;

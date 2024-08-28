import {useState} from 'react';
import {createPlayerClient, PlayerClient} from '@reveldigital/client-sdk';
// import {EventType} from "@reveldigital/client-sdk/dist/enums/event-types";


export default function Harness() {
    const title = 'react-test-client-sdk';
    let [ TZName, setTZName] = useState('');
    let [ state, setState] = useState('Not ready');
    let [ localTime, setLocalTime] = useState('');
    let [ deviceTime, setDeviceTime] = useState('');
    let [ TZId, setTZId] = useState('');
    let [ TZOffset, setTZOffset] = useState('');
    let [ langCode, setLangCode] = useState('');
    let [ deviceKey, setDeviceKey] = useState('');
    let [ revelRoot, setRevelRoot] = useState('')
    let [ remoteDeviceKey, setRemoteDeviceKey] = useState('')
    let [ commandMap, setCommandMap] = useState('')

    const sdk = createPlayerClient({
        useLegacyEventHandling: true
    });

    // sdk.on(EventType.START,  ()=> {
    //     this.state = 'started'
    //     console.log('Player started');
    //     this.sdk.getDevice().then(function (device) {
    //         console.log('Device: ' + device);
    //     })
    // });
    //
    // sdk.on(EventType.COMMAND, function (data) {
    //     console.log('Command received: ' + data);
    // });




    update()


    function update() {

        sdk.getDeviceTime().then((res) => {
            setLocalTime((new Date()).toString());
            setDeviceTime((new Date(res)).toString());
        });

        sdk.getDeviceTimeZoneName().then((res) => {
            setTZName(res);
        });

        sdk.getDeviceTimeZoneID().then((res) => {
            setTZId(res);
        })

        sdk.getDeviceTimeZoneOffset().then((res) => {
            setTZOffset(res);
        });

        sdk.getLanguageCode().then((res) => {
            setLangCode(res);
        });

        sdk.getDeviceKey().then((res) => {
            setDeviceKey(res);
        });

        sdk.getRevelRoot().then((res) => {
            setRevelRoot(res);
        });

        sdk.getCommandMap().then((res) => {
            setCommandMap(res);
        });
    }

    function sendCommand() {
        sdk.sendCommand("test", "it");
    }

    function sendRemoteCommand() {
        sdk.sendRemoteCommand([remoteDeviceKey], "test", "it");
    }

    function trackEvent() {
        sdk.track("test", { "a": "b" });
    }

    function callback() {
        sdk.callback('test');
    }


    return (
        <div className="harness">
            <h2>{title}</h2>
            <h2>State: {state}</h2>
            <h2>Local Time: {localTime}</h2>
            <h2>Device Time: {deviceTime}</h2>
            <h2>Device TZ Name: {TZName}</h2>
            <h2>Device TZ ID: {TZId}</h2>
            <h2>Device TZ Offset: {TZOffset}</h2>
            <h2>Device Language Code: {langCode}</h2>
            <h2>Device Key: {deviceKey}</h2>
            <h2>Revel Root: {revelRoot}</h2>
            <button onClick={() => sendCommand()}>Send Command</button>
            <button onClick={() => trackEvent()}>Track Event</button>
            <button onClick={() => callback()}>Callback</button>
        </div>
    );
}



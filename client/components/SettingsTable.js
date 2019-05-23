import React  from 'react'
//import Settings from '../../imports/api/settings/server'
import {useSubscription,useTracker} from "react-meteor-hooks"

const SettingsTable = props => {
    const loading = useSubscription('settings')
    console.log('loading:',loading)
    //const settings = useTracker(() => Settings.find().fetch())
    //console.log("settings from db",settings)
    //return (meta.length>0?(JSON.parse(meta[0].value)):'not available');
    return (<h1>SettingTable coming soon!</h1>)
}

export default SettingsTable;
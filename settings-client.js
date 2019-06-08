import React, {Fragment} from 'react'
import ReactTable from "react-table";
import "react-table/react-table.css";
import {Settings} from './imports/api/settings/settings'
import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';
checkNpmVersions({
    'react': '16.8.6',
    'react-dom': '16.8.6'
}, 'react');

import {useSubscription,useTracker} from "react-meteor-hooks"

const SettingsTable = props => {

     const loading = useSubscription('settings')
     const settings = useTracker(() => Settings.find().fetch())
     // const settings = []
    const listItems = settings.map((configItem) =>
        <li>{configItem.key}: {configItem.value}</li>
    );
    //return (meta.length>0?(JSON.parse(meta[0].value)):'not available');
    return (
        <Fragment>
            <h1>SettingTable coming soon!</h1>

            <ReactTable
                data={settings}
                columns={[
                    {
                        Header: "ConfigKey",
                        accessor: "key",
                      //  Cell: this.renderEditable
                    },
                    {
                        Header: "ConfigValue",
                        accessor: "value",
                     //   Cell: this.renderEditable
                    }
                ]}
                defaultPageSize={10}
                className="-striped -highlight"
            />

            <ListItems settings={settings}/>


        </Fragment>
    )
}

export default SettingsTable

function ListItems(props){
    const listItems = props.settings.map((configItem) =>
        <li key={configItem.key}>{configItem.key}: {configItem.value}</li>
    );
    return listItems;
}
